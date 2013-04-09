/***************
 * GAME SCENES *
 ***************
 */
//scenes
var SCENE_GAME = 'game';
var SCENE_MENU = 'menu';
var SCENE_LOADING = 'loading';
var SCENE_LEVEL_UP = 'playerLevelUp';

//debug scenes
var SCENE_P2P_TEST = 'p2p-test';
var SCENE_LASER_TEST = 'laser-test';
var SCENE_HOMING_TEST = 'homing-test';
var SCENE_SPLASH_TEST = 'splash-test';
var SCENE_P2P_TOWER_TEST = 'tower-p2p-test';
var SCENE_ENEMY_TEST = 'enemy-test';

//events
var SCENE_MOUSE_CLICK_EVENT = "sceneMouseClickEvent";

/***********
 * ENEMIES *
 ***********
 */
var ENEMY_ABS = 'enemyAbstract';

//# types
var ENEMY_TYPE = {
    no: [0, 0, 0, 0, 0],
    normal: [1, 0, 0, 0, 0],
    fire: [0, 1, 0, 0, 0],
    electric: [0, 0, 1, 0, 0],
    poison: [0, 0, 0, 1, 0],
    ice: [0, 0, 0, 0, 1]
};

//# sizes
var ENEMY_SIZE = {
    tiny: 0 + 1 / 3,
    small: 0 + 2 / 3,
    normal: 1,
    large: 1 + 1 / 3,
    huge: 1 + 2 / 3,
    boss: 4
};

//# health
var ENEMY_HEALTH = {
    weak: 50,
    normal: 100,
    strong: 500,
    boss: 2000
};

//# sizes
var ENEMY_SHIELD = {
    no: 0,
    weak: 20,
    normal: 50,
    strong: 100,
    boss: 500
};

//# speed
var ENEMY_SPEED = {
    snail: 1 / 3,
    slow: 2 / 3,
    normal: 1,
    fast: 2,
    lighbolt: 3
};


/*********
 * SIZES *
 *********
 */
//screen size
var SCREEN_WIDTH = 960;
var SCREEN_HEIGHT = 640;

//size
var W = 32;
var H = 32;

/**********
 * SHOOTS *
 **********
 */
var SHOT_ABS = 'shotAbstract';
var SHOT_P2P = 'P2P';
var SHOT_LASER = 'Laser';
var SHOT_SPLASH = 'Splash';
var SHOT_HOMING = 'Homing';

var REZISTANCE = 1.00;
var BENEFIT_SHIELD = 2;
var DAMAGE_PROP = [
    'basic', 'fire', 'electric', 'poison', 'ice', // basic damage types
    'period', 'repeat', 'value', // poison and fire can repeat itself
    'slow', 'chance', 'duration' // how much to slow down 0.0 - 1.0, chance 0.0 - 1.0
];

//utils
var FRAME_RATE = 25;
var RAD = Math.PI * 2;
var PI = Math.PI;

/**********
 * TOWERS *
 **********
 */
var TOWER_ABS = 'AbstractTower';
var TOWER_P2P = 'P2PTower';
var TOWER_LASER = 'LaserTower';
var TOWER_HOMING = 'HomingTower';
var TOWER_SPLASH = 'SplashTower';
var DEFAULT_PRICE = 100;
var MAX_LEVEL = 3;

var TOWER_MACHINEGUN = 'MachineGunTower';
var MG_DAMAGE = [1, 0, 0, 0, 0];
var MG_OUTPUT_DAMAGE = 10;
var MG_RATE = 5;
var MG_RANGE = 25;
var MG_SPREADING = 0;
var MG_TTL = 25;
var MG_PRICE = 100;

var TOWER_CANNON = 'CannonTower';
var C_DAMAGE = [1, 0, 0, 0, 0];
var C_OUTPUT_DAMAGE = 50;
var C_RATE = 1;
var C_RANGE = 75;
var C_SPREADING = 0;
var C_TTL = 75;
var C_PRICE = 200;

var TOWER_FLAMETHROWER = 'FlamethrowerTower';
var FT_DAMAGE = [0, 1, 0, 0, 0];
var FT_OUTPUT_DAMAGE = 20;
var FT_RATE = 8;
var FT_RANGE = 10;
var FT_SPREADING = 15;
var FT_TTL = 10;
var FT_PRICE = 200;

var TOWER_BEAM_LASER = 'BeamLaserTower';
var L_DAMAGE = [0, 0, 1, 0, 0];
var L_OUTPUT_DAMAGE = 20;
var L_RATE = 10;
var L_RANGE = 80;
var L_TTL = 80;
var L_PRICE = 200;

var TOWER_CHAIN_LASER = 'ChainLaserTower';
var CHL_DAMAGE = [0, 0, 1, 0, 0];
var CHL_OUTPUT_DAMAGE = 10;
var CHL_RATE = 10;
var CHL_RANGE = 40;
var CHL_TTL = 40;
var CHL_PRICE = 300;

var TOWER_HOMING_MISSILE = 'HomingMissileTower';
var HM_DAMAGE = [1, 0, 0, 0, 0];
var HM_OUTPUT_DAMAGE = 50;
var HM_RATE = 2;
var HM_RANGE = 100;
var HM_TTL = 100;
var HM_PRICE = 500;
var HM_CURVING = 30;


var TOWER_ELECTRIC_AURA = 'ElectricAuraTower';
var EA_DAMAGE = [0, 0, 1, 0, 0];
var EA_OUTPUT_DAMAGE = 10;
var EA_RATE = 10;
var EA_RANGE = 40;
var EA_TTL = 40;
var EA_PRICE = 300;
var EA_GROWTH = 10;
var EA_RADIUS = 40;

/**********
 * AIMING *
 **********
 */

var AIMING_MOST_HEALTH = 'MostHealthAim';
var AIMING_LEAST_HEALTH = 'LeastHealthAim';
var AIMING_CLOSEST = 'ClosestAim';
var AIMING_FURTHEST = 'FurthestAim';

/********************
 * PLAYER CONSTANTS *
 ********************
 */
//players
var PLAYER_ABS = 'AbstractPlayer';
var PLAYER_DEBUG = 'DebugPlayer';
var PLAYER_SOLDIER = 'SoldierPlayer';
var PLAYER_LASER = 'LaserPlayer';

//player size
var PLAYER_HEIGHT = 24;
var PLAYER_WIDTH = 24;

//player events
var PLAYER_DIRECTION = "PlayerDirection";
var PLAYER_START_MOVE = "PlayerStartMove";
var PLAYER_STOP_MOVE = "PlayerStopMove";

//player directions
var NO_DIRECTION = 0;
var UP_DIRECTION = 1;
var DOWN_DIRECTION = 2;
var RIGHT_DIRECTION = 3;
var LEFT_DIRECTION = 4;

//walking
var WALK_UP = "walkUp";
var WALK_DOWN = "walkDown";
var WALK_LEFT = "walkLeft";
var WALK_RIGHT = "walkRight";

//sounds
var PLAYER_STEP_SOUND = "step";

//others
var LAST_STEPS_COUNT = 3;
var LEVEL_UP_TEXT = "Your level was increased!";
var AVAILABLE_POINTS_TEXT = "Your free points: ";

/************************
 * GAME PANEL CONSTANTS *
 ************************
 */
//panel components
var GAME_PANEL_COMPONENT = "gamePanelComp";
var GAME_PANEL_CONTENT = "gamePanelContent";

//panel properties
var PANEL_WIDTH = 150;
var PANEL_BG_COLOR = "#888888";


/********************************
 * LOCAL STORAGE DATA CONSTANTS *
 ********************************
 */
//player parts
var PLAYER_DAMAGE = "_Damage";
var PLAYER_RANGE = "_Range";