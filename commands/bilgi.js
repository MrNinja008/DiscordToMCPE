const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bilgi",
    execute: async function(m, args, config){
        try {
            let mcpeping = require("mcpeping");
            mcpeping(config.server.ip, config.server.port, function(e,r){
                if(e && e.error) {
                    if(e.description == "DNS lookup failed.") {
                        return m.reply("Sunucu bulunamadı.");
                    } else if(e.description == "Ping session timed out.") {
                        return m.reply("Sunucu aktif değil.");
                    } else {
                        console.log(e);
                        return m.reply("Bir hata oluştu.");
                    }
                }
                if(!r.connected) return m.reply("Sunucuya bağlanılamadı.");
                switch(r.advertise.split(";")[8]) {
                    case "Survival":
                        r.oyunModu = "Hayatta kalma";
                        break;
                    case "Creative":
                        r.oyunModu = "Yaratıcı";
                        break;
                    case "Adventure":
                        r.oyunModu = "Macera";
                        break;
                    case "Spectator":
                        r.oyunModu = "İzleyici";
                        break;
                    default:
                        r.oyunModu = r.advertise.split(";")[8]
                }
                m.channel.send(new MessageEmbed()
                .addField("Sunucu açıklaması:", r.advertise.split(";")[1], true)
                .addField("Sunucu sürümü:", r.advertise.split(";")[3]+" (Protokol: "+r.advertise.split(";")[2]+")", true)
                .addField("Sunucu aktifliği:", r.currentPlayers+"/"+r.maxPlayers, true)
                .addField("Sunucu yazılımı:", r.advertise.split(";")[7], true)
                .addField("Sunucu oyun modu:", r.oyunModu, true)
                .setColor("#36393F")
                .setFooter(m.author.tag+" tarafından istendi", m.author.avatarURL())
                .setTimestamp()
                )
            })
        } catch(e) {
            if(m.member.hasPermission("ADMINISTRATOR")){
                m.reply("Bu komudu kullanılabilir hale getirmek için lütfen `mcpeping` modülünü yükleyin.");
            } else m.reply("Lütfen bu hatayı bir `Yönetici`ye bildirin ve bu komudu yazmalarını söyleyin.");
        }
    }
}