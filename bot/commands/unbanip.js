module.exports = {
    name: "ipban",
    execute: async function (m, args, config) {
        if (!m.member.hasPermission("ADMINISTRATOR")) return m.reply("Bu komudu kullanabilmek için `Yönetici` olman gerekiyor.");
        if (!config.server.rcon.enabled) return m.reply("Rcon devre dışı bırakıldığından bu komudu kullanamazsınız.");
        let rcon = require("../index").getClient().currentrcon;
        if (!rcon) return m.reply("Rcon bulunamadı.");
        if (!args[0]) return m.reply("Banlanacak IP/oyuncuyu girmediniz.");
        let result = await Promise.all([rcon.send("banlist ips"), rcon.send("unban-ip " + (args[1] ? "\"" + args.filter(i => args.indexOf(i) != args.length - 1).join(" ") + "\"" : args[0]) + " " + (args[args.length - 1 == 0 ? 9999 : args.length - 1] || ""))]);
        let bannedplayers = (result[0].split("\r\n")[1] || "").split(", ");
        if (!bannedplayers.includes(args.filter(i => args.indexOf(i) != args.length - 1).join(" "))) {
            m.reply("Bu IP zaten uzaklaştırılmamış.");
            return;
        }
        await m.reply("IP'nin yasağı kaldırıldı.");
    }
}