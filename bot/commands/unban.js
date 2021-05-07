module.exports = {
    name: "unban",
    execute: async function (m, args, config) {
        if (!m.member.hasPermission("ADMINISTRATOR")) return m.reply("Bu komudu kullanabilmek için `Yönetici` olman gerekiyor.");
        if (!config.server.rcon.enabled) return m.reply("Rcon devre dışı bırakıldığından bu komudu kullanamazsınız.");
        try {
            if (!args[0]) return m.reply("Banlanacak kişiyi girmediniz.");
            let { Rcon } = require("rcon-client");
            let rcon = new Rcon({
                host: config.server.ip,
                port: config.server.port,
                password: config.server.rcon.password
            });
            try {
                rcon.connect().then(async qq => {
                    let result = await Promise.all([rcon.send("banlist"), rcon.send("unban " + (args[1] ? "\"" + args.join(" ") + "\"" : args[0]))]);
                    let bannedplayers = (result[0].split("\r\n")[1] || "").split(", ");
                    if (!bannedplayers.includes(args.join(" "))) {
                        m.reply("Bu oyuncu zaten uzaklaştırılmamış.");
                        return rcon.end();
                    }
                    await m.reply("Oyuncunun yasağı kaldırıldı.");
                    rcon.end();
                })
            } catch (e) {
                m.reply("Lütfen config'i kontrol edin! Hatalı rcon şifresi veya sunucuda rcon aktif değil.");
            }
        } catch (e) {
            m.reply("Bu komudu kullanılabilir hale getirmek için lütfen `rcon-client` modülünü yükleyin.");
        }
    }
}