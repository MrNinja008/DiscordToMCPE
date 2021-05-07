module.exports = {
    name: "rütbeler",
    execute: async function (m, args, config) {
        if (!m.member.hasPermission("ADMINISTRATOR")) return m.reply("Bu komudu kullanabilmek için `Yönetici` olman gerekiyor.");
        if (!config.server.rcon.enabled) return m.reply("Rcon devre dışı bırakıldığından bu komudu kullanamazsınız.");
        let rcon = require("../index").getClient().currentrcon;
        if (!rcon) return m.reply("Rcon bulunamadı.");
        let result = await Promise.all([rcon.send("groups")]);
        await m.reply(result[0]);
    }
}