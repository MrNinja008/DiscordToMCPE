module.exports = (type, player, action, other) => {
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
        case "death":
            require("./PlayerDeathEvent")(player, action, other[0]);
            break;
        default:
            console.log("Geçersiz event bulundu: "+type);
    }
}