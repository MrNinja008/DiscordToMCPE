module.exports = function(playerName){
    let config = require("../../config");
    let client = require("../../index").getClient();

    if(config.logger.playerjoin.enabled) {
        let guild = client.guilds.cache.get(config.logger.playerjoin.channel.guildID);
        if(guild) {
            let channel = guild.channels.cache.get(config.logger.playerjoin.channel.channelID);
            if(channel) {
				channel.send(config.logger.playerjoin.message.replace(/{player}/g, playerName));
            } else console.log(client.chalk.red("config.logger.playerjoin.channel.channelID'deki kanal sunucuda bulunamadı."));
        } else console.log(client.chalk.red("config.logger.playerjoin.channel.guildID'deki sunucu bulunamadı."));
    }
    let rcon = require("../../index").getClient().currentrcon;
    if (!rcon) return;
    rcon.send("exrcon getplayers");
}