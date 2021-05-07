module.exports = function(playerName){
    let config = require("../../config");
    if(require("../../index").getClient().db.get("talep_"+playerName) && config.talepsistem.quitclose) {
        if (require("../../index").getClient().guilds.cache.get(config.guild) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(config.channel) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID)) {
            let guild = require("../../index").getClient().guilds.cache.get(config.guild);
            let channel = guild.channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID);
            channel.send("Bu talep kanalı kapatıldı.\n10 saniye sonra kanal imha edilecek.");
            setTimeout(function () { channel.delete("Talep kapatıldı.") }, 10000);
        }
        
        require("../../index").getClient().db.delete("talep_"+playerName);
    }
    let rcon = require("../../index").getClient().currentrcon;
    if (!rcon) return;
    rcon.send("exrcon getplayers");
}