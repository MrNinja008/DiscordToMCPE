module.exports = function(playerName, message){
    let config = require("../../config");
    let client = require("../../index").getClient();

    if(config.logger.playerchat.enabled) {
        let guild = client.guilds.cache.get(config.logger.playerchat.channel.guildID);
        if(guild) {
            let channel = guild.channels.cache.get(config.logger.playerchat.channel.channelID);
            if(channel) {
                channel.send(config.logger.playerchat.message.replace(/{player}/g, playerName).replace(/{message}/g, message));
            } else console.log(client.chalk.red("config.logger.playerchat.channel.channelID'deki kanal sunucuda bulunamadı."));
        } else console.log(client.chalk.red("config.logger.playerchat.channel.guildID'deki sunucu bulunamadı."));
    }
}