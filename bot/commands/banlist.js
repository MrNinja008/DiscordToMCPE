module.exports = {
    name: "banliste",
    execute: async function (m, args, config) {
        if (!m.member.hasPermission("ADMINISTRATOR")) return m.reply("Bu komudu kullanabilmek için `Yönetici` olman gerekiyor.");
        if (!config.server.rcon.enabled) return m.reply("Rcon devre dışı bırakıldığından bu komudu kullanamazsınız.");
        let rcon = require("../index").getClient().currentrcon;
        if (!rcon) return m.reply("Rcon bulunamadı.");
        let result = await Promise.all([rcon.send("banlist " + (args[0] || "players"))]);
        let bannedplayers = result[0].split("\r\n")[1] || "Kimse";
        await m.reply("Sunucudan uzaklaştırılmış oyuncular: " + bannedplayers);
    }
}