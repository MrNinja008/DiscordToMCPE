module.exports = function(playerName){
    let config = require("../../config");
    let rcon = require("../../index").getClient().currentrcon;
    if (!rcon) return;
    rcon.send("exrcon getplayers");
}