module.exports = function (playerName, message) {
    let config = require("../../config");
    if (config.talepsistem && ([config.talepsistem.commandopen, config.talepsistem.commandchat, config.talepsistem.commandclose].includes(message.split(" ")[0]))) {
        try {
            let { Rcon } = require("rcon-client");
            let rcon = new Rcon({ host: config.server.ip, port: config.server.port, password: config.server.rcon.password });
            try {
                rcon.connect().then(async qq => {
                    let cmd = message.split(" ")[0];
                    let params = message.split(" ").slice(1).join(" ");
                    switch (cmd) {
                        case config.talepsistem.commandopen:
                            if (require("../../index").getClient().db.get("talep_" + playerName)) {
                                await rcon.send("taleprcon " + playerName + " \"Zaten bir talebin var.\"")
                            } else {
                                await rcon.send("taleprcon " + playerName + " \"Talebin açılıyor...\"")
                                if (require("../../index").getClient().guilds.cache.get(config.guild) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(config.channel)) {
                                    let guild = require("../../index").getClient().guilds.cache.get(config.guild);
                                    let category = guild.channels.cache.get(config.talepsistem.category);
                                    let channel = await guild.channels.create("talep-" + playerName, { type: "text", parent: category});
                                    require("../../index").getClient().db.set("talep_" + playerName, { "createdTimestamp": Date.now(), "channelID": channel.id, "playerName": playerName });
                                    await rcon.send("taleprcon " + playerName + " \"Talebiniz açıldı. Mesaj atmak için /talepgonder <mesaj> komudunu kullan!\"")
                                } else {
                                    await rcon.send("taleprcon " + playerName + " \"Talebiniz talep bölgesi bulunamadığından iptal edildi.\"")
                                }
                            }
                            break;
                        case config.talepsistem.commandchat:
                            if (!require("../../index").getClient().db.get("talep_" + playerName)) {
                                await rcon.send("taleprcon " + playerName + " \"Bir talebin yok.\"")
                            } else {
                                if (require("../../index").getClient().guilds.cache.get(config.guild) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(config.channel) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID)) {
                                    let guild = require("../../index").getClient().guilds.cache.get(config.guild);
                                    let channel = guild.channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID);
                                    channel.send(playerName + " > " + params);
                                    await rcon.send("taleprcon " + playerName + " \"Mesajın atıldı.\"")
                                } else {
                                    require("../../index").getClient().db.delete("talep_" + playerName);
                                    await rcon.send("taleprcon " + playerName + " \"Talebiniz talep bölgesi bulunamadığından iptal edildi.\"")
                                }
                            }
                            break;
                        case config.talepsistem.commandclose:
                            if (!require("../../index").getClient().db.get("talep_" + playerName)) {
                                await rcon.send("taleprcon " + playerName + " \"Bir talebin yok.\"")
                            } else {
                                if (require("../../index").getClient().guilds.cache.get(config.guild) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(config.channel) && require("../../index").getClient().guilds.cache.get(config.guild).channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID)) {
                                    let guild = require("../../index").getClient().guilds.cache.get(config.guild);
                                    let channel = guild.channels.cache.get(require("../../index").getClient().db.get("talep_" + playerName).channelID);
                                    channel.send("Bu talep kanalı kapatıldı.\n10 saniye sonra kanal imha edilecek.");
                                    setTimeout(function () { channel.delete("Talep kapatıldı.") }, 10000);
                                }
                                require("../../index").getClient().db.delete("talep_" + playerName);
                                await rcon.send("taleprcon " + playerName + " \"Talebiniz silindi.\"")
                            }
                            break;
                    }
                    rcon.end();
                })
            } catch (e) {
                console.log("Lütfen config'i kontrol edin! Hatalı rcon şifresi veya sunucuda rcon aktif değil.");
            }
        } catch (e) {
            console.log("Talep sistemini aktif hale getirebilmek için lütfen `rcon-client` modülünü yükleyin.");
        }
    }
}