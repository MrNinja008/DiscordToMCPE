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
    if(killerName && cause == 1) {
        // playerName, killerName tarafından öldürüldü.
    } else if(cause == -1) {
        // playerName sebepsizce öldü.
    } else {
        // cause bir sayı ve üstte listesi var.
        // cause sebebinden öldü.
    }
}