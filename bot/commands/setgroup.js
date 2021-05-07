module.exports = {
    name: "rütbeayarla",
    execute: async function (m, args, config) {
        if (!m.member.hasPermission("ADMINISTRATOR")) return m.reply("Bu komudu kullanabilmek için `Yönetici` olman gerekiyor.");
        if (!config.server.rcon.enabled) return m.reply("Rcon devre dışı bırakıldığından bu komudu kullanamazsınız.");
        let rcon = require("../index").getClient().currentrcon;
        if (!rcon) return m.reply("Rcon bulunamadı.");
        if (!args[0]) return m.reply("Rütbesi ayarlanacak kişiyi girmediniz.");
        if (!args[1]) return m.reply("Rütbenin adını girmediniz.");
        let result = await Promise.all([rcon.send("setgroup \"" + args[0] + "\" " + args[1])]);
        m.reply(result[0]);
    }
}