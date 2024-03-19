class level01 extends Phaser.Scene {
  constructor ()
  {
      super({ key: 'level01' });
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

// Step 4 Load the game tiles
let desertTiles = map.addTilesetImage("desert32x32", "desertimg");
let streetTiles = map.addTilesetImage("Street32x32", "streetimg");
let forestTiles = map.addTilesetImage("forest_tiles", "forestimg")
let townTiles = map.addTilesetImage("town2240x2400", "townimg");

this.anims.create({
  key:'spin',
  frames:this.anims.generateFrameNumbers('heart',
  { start:0, end:-5 }),
  frameRate:20,
  repeat:-1
});

  //Step 5  create an array of tiles
  
let tilesArray = [desertTiles, streetTiles, forestTiles, townTiles];


// Step 6 Load in layers by layers
this.groundLayer = map.createLayer("Ground", tilesArray, 0, 0);
this.riverLayer = map.createLayer("river", tilesArray,0,0);
this.buildingLayer = map.createLayer("building", tilesArray, 0, 0);
this.shopLayer = map.createLayer("shop", tilesArray, 0, 0);
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


// Find the starting position object

// this.add.sprite(100, 300, 'heart') . play('spin').setScale(1)

var start = map.findObject("objectlayer", (obj) => obj.name === "start");
this.player=this.physics.add.sprite(start.x, start.y, 'MC');

var heart = map.findObject("objectlayer", (obj) => obj.name === "heart");
this.heart=this.physics.add.sprite(heart.x, heart.y, 'heart').setScale (0.5)

window.player=this.player

this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.6)

// When object overlap with player, call the this.collectFire function
this.physics.add.overlap(this.player, this.heart, this.hitheart, null, this);

 
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
 this.shopLayer.setCollisionByExclusion(-1, true);
 this.physics.add.collider(this.player, this.shopLayer);


 // Add background music
 this.backgroundMusic = this.sound.add('pixel.mp3', { loop: true });
 this.backgroundMusic.play();
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
      this.player.y > 115 &&
      this.player.y < 156
      ) {
        console.log("Door2");
        this.level2();
      }
   
    } // end of update //

    // this function is called when player touch the heart
   hitheart(player, item) {
    console.log("Hit heart!!!");
    this.cameras.main.shake(200);
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
  }
 