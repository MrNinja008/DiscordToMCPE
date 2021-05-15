module.exports = function(playerName, killerName, cause){
    /*
    CAUSE MAP:

    NOTHING = -1;
    CONTACT = 0;
	ENTITY_ATTACK = 1;
	PROJECTILE = 2;
	SUFFOCATION = 3;
	FALL = 4;
	FIRE = 5;
	FIRE_TICK = 6;
	LAVA = 7;
	DROWNING = 8;
	BLOCK_EXPLOSION = 9;
	ENTITY_EXPLOSION = 10;
	VOID = 11;
	SUICIDE = 12;
	MAGIC = 13;
	CUSTOM = 14;
	STARVATION = 15;
    */
    let client = require("../../index").getClient();
	let config = require("../../config");

    if(config.logger.playerdeath.enabled) {
        let guild = client.guilds.cache.get(config.logger.playerdeath.channel.guildID);
        if(guild) {
            let channel = guild.channels.cache.get(config.logger.playerdeath.channel.channelID);
            if(channel) {
				if(killerName && cause == 1) {
					channel.send(config.logger.playerdeath.messages.byPlayer.replace(/{player}/g, playerName).replace(/{killer}/g, killerName));
				} else if(cause == -1) {
					channel.send(config.logger.playerdeath.messages.nothing.replace(/{player}/g, playerName));
				} else {
					channel.send(config.logger.playerdeath.messages.forReason[cause].replace(/{player}/g, playerName));
				}
            } else console.log(client.chalk.red("config.logger.playerdeath.channel.channelID'deki kanal sunucuda bulunamadı."));
        } else console.log(client.chalk.red("config.logger.playerdeath.channel.guildID'deki sunucu bulunamadı."));
    }
    if(killerName && cause == 1) {
        // playerName, killerName tarafından öldürüldü.
    } else if(cause == -1) {
        // playerName sebepsizce öldü.
    } else {
        // cause bir sayı ve üstte listesi var.
        // cause sebebinden öldü.
    }
}