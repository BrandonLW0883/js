
class testMap extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'testMap' });
    }

    preload() {

         //Step 1, load JSON
        this.load.tilemapTiledJSON("world1", "assets/my final map01.tmj");
 

        // Step 2 : Preload any images here
        this.load.image("buildinging","assets/Buildings32x32.png");
        this.load.image("streeting", "assets/Street32x32.png");
        this.load.image("foresting", "assets/forest_tiles.png");
        this.load.image("towning", "assets/town 2240x2400.png");

    } // end of preload //

    create (){

    console.log("animationScene")

    //Step 3 - Create the map from main
     let map = this.make.tilemap({ key: "world1" });


    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload

    let buildingTiles = map.addTilesetImage("Buildings32x32", "buildinging");
    let streetTiles = map.addTilesetImage("Street32x32", "streeting");
    let forestTiles = map.addTilesetImage("forest_tiles", "foresting");
    let townTiles =map.addTilesetImage("town 2240x2400","towning");



    //Step 5  create an array of tiles
      let tilesArray = [
       buildingTiles,
     streetTiles,
     forestTiles,
     townTiles,
    ];
 

    // Step 6  Load in layers by layers
    this.forestLayer = map.createLayer("trees",tilesArray,0,0);

   this.streetLayer = map.createLayer("GroundLayer",tilesArray,0,0);
   this.townLayer = map.createLayer("lamps",tilesArray,0,0);

   this.buildingLayer = map.createLayer("building",tilesArray,0,0);






    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
      this.cameras.main.startFollow(this.player);

    } // end of create //

    update () {

        // if (this.cursors.left.isDown)
        // {
        //     this.player.setVelocityX(-160);
        //     this.player.anims.play('gen-left', true);
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     this.player.setVelocityX(160);
        //     this.player.anims.play('gen-right', true);
        // } else if (this.cursors.up.isDown)
        // {
        //     this.player.setVelocityY(-160);
        //     this.player.anims.play('gen-up', true);
        // } else if (this.cursors.down.isDown)
        // {
        //     this.player.setVelocityY(160);
        //     this.player.anims.play('gen-down', true);
        // } else {
        //     this.player.setVelocity(0);
        //     this.player.anims.stop();
        // }

    } // end of update // 
}