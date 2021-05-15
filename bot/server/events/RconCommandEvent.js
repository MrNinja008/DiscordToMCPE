module.exports = function(message){
    let config = require("../../config");
    let client = require("../../index").getClient();

    if(config.logger.rconcommand.enabled) {
        let guild = client.guilds.cache.get(config.logger.rconcommand.channel.guildID);
        if(guild) {
            let channel = guild.channels.cache.get(config.logger.rconcommand.channel.channelID);
            if(channel) {
				channel.send(config.logger.rconcommand.message.replace(/{command}/g, message));
            } else console.log(client.chalk.red("config.logger.rconcommand.channel.channelID'deki kanal sunucuda bulunamadı."));
        } else console.log(client.chalk.red("config.logger.rconcommand.channel.guildID'deki sunucu bulunamadı."));
    }
}