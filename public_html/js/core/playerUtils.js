window.PlayerUtils = {};

//new game init
PlayerUtils.newGameInitialize = function(nameGunPlayer, nameLaserPlayer) {
    localStorage[GUN_PLAYER_NAME] = nameGunPlayer;
    localStorage[LASER_PLAYER_NAME] = nameLaserPlayer;
    localStorage[ACTIVE_PLAYER] = GUN_PLAYER;
    localStorage[GUN_PLAYER_EXPS] = 0;
    localStorage[GUN_PLAYER_LEVEL] = 1;
    localStorage[GUN_PLAYER_AVAILABLE_POINTS] = 0;
    localStorage[GUN_PLAYER_USED_POINTS] = 0;
    localStorage[LASER_PLAYER_EXPS] = 0;
    localStorage[LASER_PLAYER_LEVEL] = 1;
    localStorage[LASER_PLAYER_AVAILABLE_POINTS] = 0;
    localStorage[LASER_PLAYER_USED_POINTS] = 0;
};

//method returns actualLevel of actual player
PlayerUtils.getActualLevel = function() {
    if(localStorage[ACTIVE_PLAYER] === GUN_PLAYER) {
        return localStorage[GUN_PLAYER_LEVEL];            
    } else {
        return localStorage[LASER_PLAYER_LEVEL];
    }
};

//method returns actualLevel by player type
PlayerUtils.getActualLevelByPlayerType = function(type) {
    if(type === GUN_PLAYER) {
        return localStorage[GUN_PLAYER_LEVEL];            
    } else {
        return localStorage[LASER_PLAYER_LEVEL];
    }
};