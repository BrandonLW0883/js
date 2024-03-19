class level03 extends Phaser.Scene {
    constructor() {
        super({ key: 'level03' });
    }

    preload() {
        // Step 1, load JSON
        this.load.tilemapTiledJSON("level3", "assets/level3.tmj");

        // Step 2: Preload any images here
        this.load.image("clotheimg", "path_to_clotheimg.png");
        this.load.image("interiorimg", "path_to_interiorimg.png");
        this.load.image("buildingimg", "path_to_buildingimg.png");
        this.load.spritesheet('KE', 'assets/karenenemy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image("shirt", "assets/shirt.png");
        this.load.image("dress", "assets/dress.png");
    }

    create() {
        console.log("animationScene");

        // Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "level3" });

        // Step 4 Load the game tiles
        let clothesTiles = map.addTilesetImage("clothes768x768", "clotheimg");
        let interiorTiles = map.addTilesetImage("interior718x1214", "interiorimg");
        let buildingTiles = map.addTilesetImage("Buildings32x32", "buildingimg");

        // Step 5 create an array of tiles
        let tilesArray = [clothesTiles, interiorTiles, buildingTiles];

        // Step 6 Load in layers by layers
        this.idLayer = map.createLayer("id", tilesArray, 0, 0);
        this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
        this.viewLayer = map.createLayer("view", tilesArray, 0, 0);
        this.girlLayer = map.createLayer("girl", tilesArray, 0, 0);
        this.doorLayer = map.createLayer("doorandwindow", tilesArray, 0, 0);
        this.thingLayer = map.createLayer("thing", tilesArray, 0, 0);
        this.tableLayer = map.createLayer("table", tilesArray, 0, 0);
        this.clothesLayer = map.createLayer("clothes", tilesArray, 0, 0);
        this.basketLayer = map.createLayer("basket", tilesArray, 0, 0);
        this.bearLayer = map.createLayer("bear", tilesArray, 0, 0);



    //this.cursors = this.input.keyboard.createCursorKeys();

   // var key3Down = this.input.keyboard.addKey(51);
 
 
    // key3Down.on('down', function(){
      //  console.log("Key 1 pressed");
       //     this.scene.start("level2");
     //   }, this );  
    
    var shirt= map.findObject("Object Layer 1", (obj) => obj.name === "shirt");
    this.shirt = this.physics.add.sprite(shirt.x, shirt.y, 'shirt');

    var shirt= map.findObject("Object Layer 1", (obj) => obj.name === "shirt2");
    this.shirt2 = this.physics.add.sprite(shirt.x, shirt.y, 'shirt');

    var shirt= map.findObject("Object Layer 1", (obj) => obj.name === "shirt3");
    this.shirt3 = this.physics.add.sprite(shirt.x, shirt.y, 'shirt');
 
    var dress= map.findObject("Object Layer 1", (obj) => obj.name === "dress");
    this.dress = this.physics.add.sprite(dress.x, dress.y, 'dress');

    var dress= map.findObject("Object Layer 1", (obj) => obj.name === "dress2");
     this.dress2 = this.physics.add.sprite(dress.x, dress.y, 'dress');
 
    var dress= map.findObject("Object Layer 1", (obj) => obj.name === "dress3");
     this.dress3 = this.physics.add.sprite(dress.x, dress.y, 'dress');

   
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
      key:'KE-up',
      frames:this.anims.generateFrameNumbers('KE',
      { start:105, end:112 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'KE-left',
      frames:this.anims.generateFrameNumbers('KE',
      { start:118, end:125 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'KE-down',
      frames:this.anims.generateFrameNumbers('KE',
      { start:131, end:138 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
      key:'KE-right',
      frames:this.anims.generateFrameNumbers('KE',
      { start:144, end:151 }),
      frameRate:5,
      repeat:-1
  });



           
    
    //this.player = this.physics.add.sprite(146, 176, 'MC');
    //window.player = this.player
   
 // Find the "start" object
 let start = map.findObject("Object Layer 1", (obj) => obj.name === "start");
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
  this.thingLayer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.thingLayer);
  this.tableLayer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.tableLayer);
  this.clothesLayer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.clothesLayer);

  this.physics.add.overlap(this.player, this.dress2, this.hitdress2, null, this);
 this.physics.add.overlap(this.player, this.dress3, this.hitdress3, null, this);
 this.physics.add.overlap(this.player, this.dress,  this.hitdress, null, this);
 this.physics.add.overlap(this.player, this.shirt2, this.hitshirt2, null, this);
 this.physics.add.overlap(this.player, this.shirt3, this.hitshirt3, null, this);
 this.physics.add.overlap(this.player, this.shirt, this.hitshirt, null, this);

 
 
   // Create the 'KE' enemy sprite
   let x = 240;
   let y = 153;
   this.enemy1 = this.physics.add.sprite(x, 432, 'KE');
   
   this.enemy2 = this.physics.add.sprite( 237, y, 'KE');

   this.enemy3 = this.physics.add.sprite( 1004, y, 'KE');
 
   this.enemy4 = this.physics.add.sprite( 471, y, 'KE');

   this.enemy5 = this.physics.add.sprite( 718, y, 'KE');
   
  // When object overlap with player, call the this.collectFire function
  this.physics.add.overlap(this.player, this.enemy5, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy4, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy2, this.hitEnemy, null, this);
  this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy, null, this);
   
 
   // Start the 'KE' enemy animation
   this.enemy1.anims.play('KE-left');
   this.enemy1.anims.play('KE-right');
   this.enemy2.anims.play('KE-left');
   this.enemy2.anims.play('KE-right');
   this.enemy3.anims.play('KE-up');
   this.enemy3.anims.play('KE-down');
   this.enemy4.anims.play('KE-up');
   this.enemy4.anims.play('KE-down');
   
   
 
   // Add a tween to move the 'KE' enemy back and forth
   this.tweens.add({
       targets: this.enemy1,
       x: 490, // End X position
       flipX: true,
       duration: 2000, // Duration in milliseconds
       ease: 'Linear', // Linear easing
       yoyo: true, // Move back and forth
       repeat: -1 // Repeat indefinitely
   });
   
 
   this.tweens.add({
     targets: this.enemy2,
     x: 730,
     flipX: true,
     duration: 2000,
     ease: 'Linear',
     yoyo: true,
     repeat: -1,
   
 });

 this.tweens.add({
  targets: this.enemy3,
  y: 710,
  duration: 2000,
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
  y: 700,
  duration: 2000,
  ease: 'Linear',
  yoyo: true,
  repeat: -1,
  onYoyo: () => {
      console.log('yoyo');
      this.enemy4.anims.play("KE-up");
  },
  onRepeat: () => {
      console.log('onrepeat');
      this.enemy4.anims.play("KE-down");
  }
});

this.tweens.add({
  targets: this.enemy5,
  y: 438,
  duration: 2000,
  ease: 'Linear',
  yoyo: true,
  repeat: -1,
  onYoyo: () => {
      console.log('yoyo');
      this.enemy5.anims.play("KE-up");
  },
  onRepeat: () => {
      console.log('onrepeat');
      this.enemy5.anims.play("KE-down");
  }
});

  
  } /////////////////// end of create //////////////////////////////
 
  // var level2Down = this.input.keyboard.addKey(50);
    
    

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
          this.player.x > 973 &&
          this.player.y > 456 &&
          this.player.y < 691
        )
         {
          console.log("Door4");
          this.level4();
        }
       
   
      } // end of update //

      hitdress(player, item) {
        console.log("Hit dress!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        item.disableBody(true, true); // remove shirt
        return false;
      }
      hitdress2(player, item) {
        console.log("Hit dress2!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        item.disableBody(true, true); // remove shirt
        return false;
      }
      hitdress3(player, item) {
        console.log("Hit dress3!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        item.disableBody(true, true); // remove shirt
        return false;
      }
      hitshirt(player, item) {
        console.log("Hit shirt!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        item.disableBody(true, true); // remove shirt
        return false;
      }
      hitshirt2(player, item) {
        console.log("Hit shirt2!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        item.disableBody(true, true); // remove shirt
        return false;
      }
      hitshirt3(player, item) {
        console.log("Hit shirt3!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        item.disableBody(true, true); // remove shirt
        return false;
      }
   
      hitEnemy(player, enemy) {
        console.log("Hit enemy!!!");
        this.sound.play('hsk');
        this.cameras.main.shake(400);
        enemy.disableBody(true, true); // remove fire
   
        // Add any other effects or actions you want when the player hits an enemy
        return false;
  }
      level4(player, tile) {
        console.log("level04 function");
        this.scene.start("level04",);
      }
   
    }