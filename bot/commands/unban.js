module.exports = {
    name: "unban",
    execute: async function (m, args, config) {
        if (!m.member.hasPermission("ADMINISTRATOR")) return m.reply("Bu komudu kullanabilmek için `Yönetici` olman gerekiyor.");
        if (!config.server.rcon.enabled) return m.reply("Rcon devre dışı bırakıldığından bu komudu kullanamazsınız.");
        let rcon = require("../index").getClient().currentrcon;
        if (!rcon) return m.reply("Rcon bulunamadı.");
        if (!args[0]) return m.reply("Banlanacak kişiyi girmediniz.");
        let result = await Promise.all([rcon.send("banlist"), rcon.send("unban " + (args[1] ? "\"" + args.join(" ") + "\"" : args[0]))]);
        let bannedplayers = (result[0].split("\r\n")[1] || "").split(", ");
        if (!bannedplayers.includes(args.join(" "))) {
            m.reply("Bu oyuncu zaten uzaklaştırılmamış.");
            return;
        }
        m.reply("Oyuncunun yasağı kaldırıldı.");
    }
}