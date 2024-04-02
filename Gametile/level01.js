class level01 extends Phaser.Scene {
  constructor ()
  {
      super({ key: 'level01' });
      this.musicPlaying = false; // Variable to track music state
    
  }

  preload() {
// Step 1, load JSON
this.load.tilemapTiledJSON("level1", "assets/level1.tmj");

// Step 2 : Preload any images here
this.load.image("desertimg", "assets/desert32x32.png");
this.load.image("streetimg", "assets/Street32x32.png");
this.load.image("forestimg", "assets/forest_tiles.png");
this.load.image("townimg", "assets/town2240x2400.png");
 this.load.audio('pixel.mp3', ['assets/pixel.mp3', 'assets/pixel.png']);

this.load.spritesheet('MC', 'assets/maincharacter.png', { frameWidth: 64, frameHeight: 64 });
this.load.spritesheet('heart', 'assets/heart.png', { frameWidth: 64, frameHeight: 64 });


}

create() {
console.log("animationScene")
// Step 3 - Create the map from main
let map = this.make.tilemap({ key: "level1" });
window.backgroundMusic = this.sound.add('pixel.mp3', { loop: true });
window.backgroundMusic.play();
// Step 4 Load the game tiles
let desertTiles = map.addTilesetImage("desert32x32", "desertimg");
let streetTiles = map.addTilesetImage("Street32x32", "streetimg");
let forestTiles = map.addTilesetImage("forest_tiles", "forestimg")
let townTiles = map.addTilesetImage("town2240x2400", "townimg");



  //Step 5  create an array of tiles
  
let tilesArray = [desertTiles, streetTiles, forestTiles, townTiles];


// Step 6 Load in layers by layers
this.groundLayer = map.createLayer("Ground", tilesArray, 0, 0);
this.riverLayer = map.createLayer("river", tilesArray,0,0);
this.buildingLayer = map.createLayer("building", tilesArray, 0, 0);
this.treesLayer = map.createLayer("trees", tilesArray, 0, 0);
this.lampsLayer = map.createLayer("lamps", tilesArray, 0, 0);

// make the camera follow the player
this.player = this.physics.add.sprite(146, 176, 'MC');
this.cameras.main.startFollow(this.player);

this.anims.create({
    key: 'MC-up',
    frames: this.anims.generateFrameNumbers('MC', { start: 105, end: 112 }),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'MC-left',
    frames: this.anims.generateFrameNumbers('MC', { start: 118, end: 125 }),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'MC-down',
    frames: this.anims.generateFrameNumbers('MC', { start: 131, end: 138 }),
    frameRate: 5,
    repeat: -1
});
this.anims.create({
    key: 'MC-right',
    frames: this.anims.generateFrameNumbers('MC', { start: 144, end: 151 }),
    frameRate: 5,
    repeat: -1
});

this.anims.create({
  key: 'heartAim',
  frames: this.anims.generateFrameNumbers('heart', { start: 0, end: 1 }),
  frameRate: 5,
  repeat: -1
});

this.anims.create({
  key:'spin',
  frames:this.anims.generateFrameNumbers('heart',
  { start:0, end:5 }),
  frameRate:10,
  repeat:-1
});


// Find the starting position object

// this.add.sprite(100, 300, 'heart') . play('spin').setScale(1)


this.player.setCollideWorldBounds(true);  // don't go out of the this.map

var start = map.findObject("objectlayer", (obj) => obj.name === "start");
this.player=this.physics.add.sprite(start.x, start.y, 'MC');

let heart1 = map.findObject("objectlayer", (obj) => obj.name === "heart");
// Define your items with objectLayer
this.heart1 = this.physics.add
.sprite(heart1.x, heart1.y, "heart")
.play("spin");


this.heart = this.add.sprite(230,50, "heart"). play('spin').setScale(0.8).setScrollFactor(0).setVisible(true);
this.heart2 = this.add.sprite(300,50, "heart").play('spin').setScale(0.8).setScrollFactor(0).setVisible(true);
this.heart3 = this.add.sprite(370,50, "heart").play('spin').setScale(0.8).setScrollFactor(0).setVisible(true);

window.player=this.player

this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.6)


this.physics.add.overlap(this.player, this.heart1, this.hitheart, null, this);
 
// this.physics.add.overlap(this.player, this.heart2, this.hitheart2, null, this);

// Add time event / movement here
 
    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);
 
    // Add custom properties in Tiled called "mouintain" as bool
 
    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);
 
      // create() {
    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    //this.cursors=this.input.keyboard
    // camera follow player
    this.cameras.main.startFollow(this.player);

// Enable collisions
this.riverLayer.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.riverLayer);
this.lampsLayer.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.lampsLayer);
this.buildingLayer.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.buildingLayer);
 this.treesLayer.setCollisionByExclusion(-1, true);
 this.physics.add.collider(this.player, this.treesLayer);


}

 // end of create //

  update() {
      
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
        this.player.anims.play('MC-left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
        this.player.anims.play('MC-right', true);
    } else if (this.cursors.up.isDown)
    {
        this.player.setVelocityY(-160);
        this.player.anims.play('MC-up', true);
    } else if (this.cursors.down.isDown)
    {
        this.player.setVelocityY(160);
        this.player.anims.play('MC-down', true);
    } else {
        this.player.setVelocity(0);
        this.player.anims.stop();
    }

    if (
      this.player.x > 372 &&
      this.player.y > 147 &&
      this.player.y < 158
      ) {
        console.log("Door2");
        this.level2();
      }
      if (
        this.player.x > 576 &&
        this.player.y > 243 &&
        this.player.y < 255
        ) {
          console.log("Door3");
          this.level3();
        }
        if (
          this.player.x > 791 &&
          this.player.y > 819 &&
          this.player.y < 822
          ) {
            console.log("Door4");
            this.level4();
          }
          if (
            this.player.x > 1336 &&
            this.player.y > 467.2 &&
            this.player.y < 478
            ) {
              console.log("Door5");
              this.level5();
            }
     
   
    } // end of update //

    // this function is called when player touch the heart
   
   // this function is called when player touch the fire
  hitheart(player, item) {
    console.log("Hit heart!!!");
    this.cameras.main.shake(20);
    item.disableBody(true, true); // remove heart
    return false;
  }
 
  // hitheart2(player, item) {
  //   console.log("Hit heart2!!!");
  //   this.cameras.main.shake(200);
  //   item.disableBody(true, true); // remove heart
  //   return false;
  

  
    level2(player, tile) {
      console.log("level02 function");

      this.scene.start("level02",);
    }
    level3(player, tile) {
      console.log("level03 function");
      // this.backgroundMusic.stop();
      this.scene.start("level03",);
    }
    level4(player, tile) {
      console.log("level04 function");
      // this.backgroundMusic.stop();
      this.scene.start("level04",);
    }
    level5(player, tile) {
      console.log("level05 function");
      // this.backgroundMusic.stop();
      this.scene.start("level05",);
    }
  }
 