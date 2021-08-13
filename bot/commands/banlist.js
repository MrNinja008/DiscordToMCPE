module.exports = {
    name: "ban list",
    execute: async function (m, args, config) {
        if (!m.member.hasPermission("ADMINISTRATOR")) return m.reply("You must be an 'Administrator' to use this command.");
        if (!config.server.rcon.enabled) return m.reply("Rcon You cannot use this command because it is disabled.");
        let rcon = require("../index").getClient().currentrcon;
        if (!rcon) return m.reply("Rcon bulunamadı.");
        let result = await Promise.all([rcon.send("banlist " + (args[0] || "players"))]);
        let bannedplayers = result[0].split("\r\n")[1] || "Noone";
        await m.reply("Suspended players: " + bannedplayers);
    }
}
