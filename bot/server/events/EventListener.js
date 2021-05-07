module.exports = (type, player, action) => {
    switch(type) {
        case "join":
            require("./PlayerJoinEvent")(player);
            break;
        case "quit":
            require("./PlayerQuitEvent")(player);
            break;
        case "chat":
            require("./PlayerChatEvent")(player, action);
            break;
        case "command":
            require("./PlayerCommandEvent")(player, action);
            break;
        case "consolecommand":
            require("./ConsoleCommandEvent")(action);
            break;
        case "rconcommand":
            require("./RconCommandEvent")(action);
            break;
        case "getplayers":
            if(player)require("../../index").getClient().db.set("players", player.split(","));
            break;
        default:
            console.log("Geçersiz event bulundu: "+type);
    }
}