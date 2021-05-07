module.exports = {
    name: "talepkapat",
    execute: async function(m, args, config){
        let client = require("../index").getClient();
        let db = client.db;
        let talepler = await db.fetchAll();
        let a = false;
        if(talepler[0] && talepler[0].ID) {
            talepler.filter(i=> i.ID.startsWith("talep_")).forEach(i=> {
                if(i.data.channelID == m.channel.id) {
                    if (client.guilds.cache.get(config.guild) && client.guilds.cache.get(config.guild).channels.cache.get(config.channel) && require("../index").getClient().guilds.cache.get(config.guild).channels.cache.get(i.data.channelID)) {
                        let guild = client.guilds.cache.get(config.guild);
                        let channel = guild.channels.cache.get(i.data.channelID);
                        channel.send("Bu talep kanalı kapatıldı.\n10 saniye sonra kanal imha edilecek.");
                        setTimeout(function () { channel.delete("Talep kapatıldı.") }, 10000);
                    }
                    require("../../index").getClient().sendMessage(i.data.playerName, "§e> Talebiniz yetkili tarafından kapatıldı.")
                    client.db.delete(i.ID);
                    a = true;
                }
            })
        } else if(db.pin){
            Object.keys(talepler).forEach(i=> {
                if(!i.startsWith("talep_")) {
                    delete talepler[i];
                } else if(talepler[i].channelID == m.channel.id) {
                    if (client.guilds.cache.get(config.guild) && client.guilds.cache.get(config.guild).channels.cache.get(config.channel) && require("../index").getClient().guilds.cache.get(config.guild).channels.cache.get(talepler[i].channelID)) {
                        let guild = client.guilds.cache.get(config.guild);
                        let channel = guild.channels.cache.get(talepler[i].channelID);
                        channel.send("Bu talep kanalı kapatıldı.\n10 saniye sonra kanal imha edilecek.");
                        setTimeout(function () { channel.delete("Talep kapatıldı.") }, 10000);
                    }
                    require("../../index").getClient().sendMessage(talepler[i].playerName, "§e> Talebiniz yetkili tarafından kapatıldı.")
                    client.db.delete(i);
                    a = true;
                }
            });
        }
        if(!a)m.reply("Talep kanalında değilsin.");
    }
}