module.exports = function(message){
    let config = require("../../config");
    let client = require("../../index").getClient();

    if(config.logger.consoleCommand.enabled) {
        let guild = client.guilds.cache.get(config.logger.consoleCommand.channel.guildID);
        if(guild) {
            let channel = guild.channels.cache.get(config.logger.consoleCommand.channel.channelID);
            if(channel) {
				channel.send(config.logger.consoleCommand.message.replace(/{command}/g, message));
            } else console.log(client.chalk.red("config.logger.consoleCommand.channel.channelID'deki kanal sunucuda bulunamadı."));
        } else console.log(client.chalk.red("config.logger.consoleCommand.channel.guildID'deki sunucu bulunamadı."));
    }
}