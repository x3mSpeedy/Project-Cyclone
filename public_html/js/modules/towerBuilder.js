//define as global object
window.towerBuilder = {
    create: function(type) { 
        var build = Crafty.e ("2D, Canvas, Mouse, {0}".format(TOWER_BUILDER));
        build.setTowerType(type);
        build.setLevelPath('levels/level-01.xml'); //!!!! ONLY DEBUG !!!! - then do pointer to actual LEVEL!!!!
    }
}

//tower builder component
Crafty.c (TOWER_BUILDER, {
    towerType: false,
    transBG: false,
    towerImg: false,
    levelPath: false,
    
    init: function () {
        activeSceneCursor('default');
        $.playerFreeze = true;
        this.w = SCREEN_WIDTH - PANEL_WIDTH;
        this.h = SCREEN_HEIGHT;
        this.transBG = Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH-PANEL_WIDTH, h: SCREEN_HEIGHT, alpha: 0.5, z: 1}).image ("images/sq.jpg", "repeat");
        this.towerImg = Crafty.e ("2D, Canvas, Image").attr ({w: W, h: H, alpha: 0.8, z: 2}).image ("images/cat.gif", "no-repeat");
        this.bind('MouseMove', this.positionControl);
    },
    
    positionControl: function() {
        var xPos = Math.floor(mousePos.x / W);
        var yPos = Math.floor(mousePos.y / H);
        if($.levelBoard[yPos].charAt(xPos) === '1') {
            this.towerImg.x = xPos*W;
            this.towerImg.y = yPos*H;
        }
    },
            
    setTowerType: function(type) {
        this.towerType = type;
    },
            
    setLevelPath: function(level) {
        this.levelPath = level;
        this.loadActLevel();
    },
    
    loadActLevel: function() {
        $.get (this.levelPath, function(data) {
            $.levelBoard = parseBoard(($.xml2json(data)).board);
        });
    },
});