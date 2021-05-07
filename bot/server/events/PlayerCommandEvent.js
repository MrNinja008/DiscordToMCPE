module.exports = async function (playerName, message) {
    let config = require("../../config");
    if (config.talepsistem && ([config.talepsistem.commandopen, config.talepsistem.commandchat, config.talepsistem.commandclose].includes(message.split(" ")[0]))) {
        let rcon = require("../../index").getClient().currentrcon;
        if (!rcon) return;
        let cmd = message.split(" ")[0];
        let params = message.split(" ").slice(1).join(" ");
        switch (cmd) {
            case config.talepsistem.commandopen:
                if (require("../../index").getClient().db.get("talep_" + playerName)) {
                    require("../../index").getClient().sendMessage(playerName, "§cZaten bir talebin var.");
                } else {
                    require("../../index").getClient().sendMessage(playerName, "§aTalebin açılıyor...");
                    if (require("../../index").getClient().guilds.cache.get(config.guild) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(config.channel)) {
                        let guild = require("../../index").getClient().guilds.cache.get(config.guild);
                        let category = guild.channels.cache.get(config.talepsistem.category);
                        let channel = await guild.channels.create("talep-" + playerName, { type: "text", parent: category });
                        channel.send(playerName+" adlı oyuncu oyundan talep açtı @everyone");
                        require("../../index").getClient().db.set("talep_" + playerName, { "createdTimestamp": Date.now(), "channelID": channel.id, "playerName": playerName });
                        require("../../index").getClient().sendMessage(playerName, "§aTalebiniz açıldı. Mesaj atmak için /talepgonder <mesaj> komudunu kullan!");
                    } else {
                        require("../../index").getClient().sendMessage(playerName, "§cTalebiniz talep bölgesi bulunamadığından iptal edildi.");
                    }
                }
                break;
            case config.talepsistem.commandchat:
                if (!require("../../index").getClient().db.get("talep_" + playerName)) {
                    require("../../index").getClient().sendMessage(playerName, "§cBir talebin yok.");
                } else {
                    if (require("../../index").getClient().guilds.cache.get(config.guild) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(config.channel) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID)) {
                        let guild = require("../../index").getClient().guilds.cache.get(config.guild);
                        let channel = guild.channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID);
                        channel.send(playerName + " > " + params);
                        require("../../index").getClient().sendMessage(playerName, "§e§lTALEP§r §7"+playerName+"§a > §7" + params);
                    } else {
                        require("../../index").getClient().db.delete("talep_" + playerName);
                        require("../../index").getClient().sendMessage(playerName, "§cTalebiniz talep bölgesi bulunamadığından iptal edildi.");
                    }
                }
                break;
            case config.talepsistem.commandclose:
                if (!require("../../index").getClient().db.get("talep_" + playerName)) {
                    require("../../index").getClient().sendMessage(playerName, "§cBir talebin yok.");
                } else {
                    if (require("../../index").getClient().guilds.cache.get(config.guild) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(config.channel) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID)) {
                        let guild = require("../../index").getClient().guilds.cache.get(config.guild);
                        let channel = guild.channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID);
                        channel.send("Bu talep kanalı kapatıldı.\n10 saniye sonra kanal imha edilecek.");
                        setTimeout(function () { channel.delete("Talep kapatıldı.") }, 10000);
                    }
                    require("../../index").getClient().db.delete("talep_" + playerName);
                    require("../../index").getClient().sendMessage(playerName, "§aTalebiniz silindi.");
                }
                break;
        }
    }
}