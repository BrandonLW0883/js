class level05 extends Phaser.Scene {
  constructor() {
      super({ key: 'level05' });
      this.musicPlaying = false; // Variable to track music state
  }

  preload() {
      // Step 1, load JSON
      this.load.tilemapTiledJSON("level5", "assets/level5.tmj");

      // Step 2: Preload any images here
      this.load.image("stuffimg", "assets/stuff512x512.png");
      this.load.image("japanimg", "assets/japan474x474.png");
      this.load.image("interiorimg", "assets/interior718x1214.png");
      this.load.image("clotheimg", "assets/clothes768x768.png");
      this.load.spritesheet('KE2', 'assets/karenenemy2.png', { frameWidth: 64, frameHeight: 64 });
      this.load.audio('japanese.mp3', ['assets/japanese.mp3', 'assets/japanese.png']);
  }   
      
  create() {
      console.log("animationScene");

      // Step 3 - Create the map from main
      let map = this.make.tilemap({ key: "level5" });

      // Step 4 Load the game tiles
      let clothesTiles = map.addTilesetImage("clothes768x768", "clotheimg");
      let interiorTiles = map.addTilesetImage("interior718x1214", "interiorimg");
      let stuffTiles = map.addTilesetImage("stuff512x512", "stuffimg");
      let japanTiles = map.addTilesetImage("japan474x474", "japanimg");
      
      
      // Step 5 create an array of tiles
      let tilesArray = [stuffTiles, japanTiles, clothesTiles, interiorTiles];

      this.floorLayer = map.createLayer("floor", tilesArray, 0, 0);
      this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
      this.carpetLayer = map.createLayer("carpet", tilesArray, 0, 0);
      this.cupboardLayer = map.createLayer("cupboard", tilesArray, 0, 0);
      this.diningLayer = map.createLayer("dining", tilesArray, 0, 0);
      this.stairLayer = map.createLayer("stair", tilesArray, 0, 0);
      this.thingLayer = map.createLayer("thing", tilesArray, 0, 0);
      this.tableLayer = map.createLayer("table", tilesArray, 0, 0);
      this.cottonLayer = map.createLayer("cotton", tilesArray, 0, 0);
      this.clothesLayer = map.createLayer("clothes", tilesArray, 0, 0);



      // Add background music
 this.backgroundMusic = this.sound.add('japanese.mp3', { loop: true });
 this.backgroundMusic.play();


  //this.cursors = this.input.keyboard.createCursorKeys();

 // var key3Down = this.input.keyboard.addKey(51);


  // key3Down.on('down', function(){
    //  console.log("Key 1 pressed");
     //     this.scene.start("level2");
   //   }, this );  


 // make the camera follow the player
 this.player = this.physics.add.sprite(146, 176, 'MC');
 window.player = this.player;
 

 this.cameras.main.startFollow(this.player);

    this.anims.create({
      key:'MC-up',
      frames:this.anims.generateFrameNumbers('MC',
      { start:105, end:112 }),
      frameRate:5,
      repeat:-1
  });
 
  this.anims.create({
      key:'MC-left',
      frames:this.anims.generateFrameNumbers('MC',
      { start:118, end:125 }),
      frameRate:5,
      repeat:-1
  });
 
  this.anims.create({
      key:'MC-down',
      frames:this.anims.generateFrameNumbers('MC',
      { start:131, end:138 }),
      frameRate:5,
      repeat:-1
  });
 
  this.anims.create({
      key:'MC-right',
      frames:this.anims.generateFrameNumbers('MC',
      { start:144, end:151 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
    key:'KE2-up',
    frames:this.anims.generateFrameNumbers('KE2',
    { start:105, end:112 }),
    frameRate:5,
    repeat:-1
});

this.anims.create({
    key:'KE2-left',
    frames:this.anims.generateFrameNumbers('KE2',
    { start:118, end:125 }),
    frameRate:5,
    repeat:-1
});

this.anims.create({
    key:'KE2-down',
    frames:this.anims.generateFrameNumbers('KE2',
    { start:131, end:138 }),
    frameRate:5,
    repeat:-1
});

this.anims.create({
    key:'KE2-right',
    frames:this.anims.generateFrameNumbers('KE2',
    { start:144, end:151 }),
    frameRate:5,
    repeat:-1
});

if (this.musicPlaying) {
  this.backgroundMusic = this.sound.add('japanese.mp3', { loop: true });
  this.backgroundMusic.play();
  this.musicPlaying = true;
}

// Find the "start" object
let start = map.findObject("ObjectLayer", (obj) => obj.name === "start");
console.log(start); // Check if start is null or not

// If start is not null, create the player sprite at its position
if (start) {
    this.player = this.physics.add.sprite(start.x, start.y, 'MC');
    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.1, this.player.height * 0.3);
}
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

 // replace with layers loaded above
 this.wallLayer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.wallLayer);
  this.cupboardLayer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.cupboardLayer);
  this.clothesLayer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.clothesLayer);

   // Create the 'KE' enemy sprite
   let x = 240;
   let y = 153;
   this.enemy1 = this.physics.add.sprite(101, 503, 'KE2');
   
   this.enemy2 = this.physics.add.sprite( 39, 309, 'KE2');

   this.enemy3 = this.physics.add.sprite( 663, 416, 'KE2');
 
   this.enemy4 = this.physics.add.sprite( 666, 743, 'KE2');

   this.enemy5 = this.physics.add.sprite( 874, 205, 'KE2');

   this.enemy6 = this.physics.add.sprite( 1202, 210, 'KE2');
   
   
  // When object overlap with player, call the this.collectFire function

  this.physics.add.overlap(this.player, this.enemy6, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy5, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy4, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy2, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy, null, this);
   
 
   // Start the 'KE' enemy animation
   this.enemy1.anims.play('KE2-left');
   this.enemy1.anims.play('KE2-right');
   this.enemy2.anims.play('KE2-left');
   this.enemy2.anims.play('KE2-right');
   this.enemy3.anims.play('KE2-up');
   this.enemy3.anims.play('KE2-down');
   this.enemy4.anims.play('KE2-left');
   this.enemy4.anims.play('KE2-right');
   this.enemy5.anims.play('KE2-left');
   this.enemy5.anims.play('KE2-right');
   this.enemy6.anims.play('KE2-left');
   this.enemy6.anims.play('KE2-right');
   
   
 
   // Add a tween to move the 'KE' enemy back and forth
   this.tweens.add({
       targets: this.enemy1,
       x: 858, // End X position
       flipX: true,
       duration: 1500, // Duration in milliseconds
       ease: 'Linear', // Linear easing
       yoyo: true, // Move back and forth
       repeat: -1 // Repeat indefinitely
   });
   
 
   this.tweens.add({
     targets: this.enemy2,
     x: 512,
     flipX: true,
     duration: 1500,
     ease: 'Linear',
     yoyo: true,
     repeat: -1,
   
 });

 this.tweens.add({
  targets: this.enemy3,
  y: 749,
  duration: 1500,
  ease: 'Linear',
  yoyo: true,
  repeat: -1,
  onYoyo: () => {
      console.log('yoyo');
      this.enemy3.anims.play("KE-up");
  },
  onRepeat: () => {
      console.log('onrepeat');
      this.enemy3.anims.play("KE-down");
  }
});

this.tweens.add({
  targets: this.enemy4,
  x: 1250,
  flipX: true,
  duration: 1500,
  ease: 'Linear',
  yoyo: true,
  repeat: -1,
 
});

this.tweens.add({
  targets: this.enemy5,
  x: 1213,
  flipX: true,
  duration: 1500,
  ease: 'Linear',
  yoyo: true,
  repeat: -1,

});

this.tweens.add({
  targets: this.enemy6,
  y: 733,
  duration: 1500,
  ease: 'Linear',
  yoyo: true,
  repeat: -1,
  onYoyo: () => {
      console.log('yoyo');
      this.enemy3.anims.play("KE-up");
  },
  onRepeat: () => {
      console.log('onrepeat');
      this.enemy3.anims.play("KE-down");
  }
});



  } // end of create //
  

  update() {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play("MC-left", true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play("MC-right", true);
      } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
        this.player.anims.play("MC-up", true);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
        this.player.anims.play("MC-down", true);
      } else {
        this.player.setVelocity(0);
        this.player.anims.stop();
      }
 
      if (
        this.player.x > 345 &&
        this.player.y > 170 && 
        this.player.y < 256    
    ) {
      console.log("Door1");
      this.level1();
    }
}

hitEnemy(player, enemy) {
  console.log("Hit enemy!!!");
  this.sound.play('hsk');
  this.cameras.main.shake(400);
  enemy.disableBody(true, true); // remove fire

  // Add any other effects or actions you want when the player hits an enemy
  return false;
}
level1() {
  console.log("level01 function");
  this.backgroundMusic.stop();
  this.scene.start("level01");
}
}