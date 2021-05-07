const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "yardım",
    execute: async function(m, args, config){
        m.reply("Komutlar: "+require("../index").getClient().cmds.map(i=> "`"+i.name+"`").join(", "));
    }
}