var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size 
    width: 32 * 20,
    height: 32 * 20,
    /////////////////////////////////////////
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
     scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    //// Add all scenes below in the array
    scene: [preloadScene,intro1,intro2,intro3,intro4,winscene,level01, level02, level03, level04, level05, gameover] 
};

var game = new Phaser.Game(config);
window.shirt=12
window.heart=3
window.dress=12
window.cm=5

