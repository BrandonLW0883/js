
class level02 extends Phaser.Scene {
    constructor() {
        super({ key: 'level02' });
    }

    preload() {
        // Load JSON and other assets here
        this.load.tilemapTiledJSON("level2", "assets/level2.tmj");
        this.load.image("clotheimg", "assets/clothes768x768.png");
        this.load.image("buildingimg", "assets/Buildings32x32.png");
        this.load.image("forestimg", "assets/forest_tiles.png");
        this.load.image("interiorimg", "assets/interior718x1214.png");
        this.load.spritesheet('MC', 'assets/maincharacter.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('KE', 'assets/karenenemy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image("shirt", "assets/shirt.png");
        this.load.audio('hsk', 'assets/hsk.wav'); 
        this.load.audio('collect', 'assets/collect.mp3'); 
    }

    create() {
        console.log("animationScene");
        

        // Create the map from the JSON file
        let map = this.make.tilemap({ key: "level2" });

        // Load the game tiles
        let clothesTiles = map.addTilesetImage("clothes768x768", "clotheimg");
        let forestTiles = map.addTilesetImage("forest_tiles", "forestimg");
        let interiorTiles = map.addTilesetImage("interior718x1214", "interiorimg");
        let buildingTiles = map.addTilesetImage("Buildings32x32", "buildingimg");
         // Play a sound effect
        let hitSound = this.sound.add('hsk');
        hitSound.play();

        let hitSound2 = this.sound.add('collect');
        hitSound2.play();

        let tilesArray = [
            clothesTiles,
            forestTiles,
            interiorTiles,
            buildingTiles,
        ];

    // Step 6  Load in layers by layers

    this.floorLayer = map.createLayer("floor", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wall", tilesArray, 0, 0);
    this.viewLayer = map.createLayer("View", tilesArray, 0, 0);
    this.kitchenLayer = map.createLayer("kitchen", tilesArray, 0, 0);
    this.peopleLayer = map.createLayer("cashierpeople", tilesArray, 0, 0);
    this.lampLayer = map.createLayer("lamp", tilesArray, 0, 0);
    this.maperLayer = map.createLayer("floormaper", tilesArray, 0, 0);
    this.tableLayer = map.createLayer("table", tilesArray, 0, 0);
    this.benchLayer = map.createLayer("bench", tilesArray, 0, 0);
    this.doorLayer = map.createLayer("door", tilesArray, 0, 0);
    this.mapLayer = map.createLayer("floormap", tilesArray, 0, 0);
    this.outfitLayer = map.createLayer("Outfit", tilesArray, 0, 0);
    this.stickLayer = map.createLayer("stick", tilesArray, 0, 0);
   this.statueLayer = map.createLayer("statue", tilesArray, 0, 0);
   


    this.cursors = this.input.keyboard.createCursorKeys();


 


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
    var shirt= map.findObject("ObjectLayer", (obj) => obj.name === "shirt");
    this.shirt = this.physics.add.sprite(shirt.x, shirt.y, 'shirt');
    

    var shirt= map.findObject("ObjectLayer", (obj) => obj.name === "shirt2");
    this.shirt2 = this.physics.add.sprite(shirt.x, shirt.y, 'shirt');

    var shirt= map.findObject("ObjectLayer", (obj) => obj.name === "shirt3");
    this.shirt3 = this.physics.add.sprite(shirt.x, shirt.y, 'shirt');
    
    var start = map.findObject("ObjectLayer", (obj) => obj.name === "start");
    
    this.player=this.physics.add.sprite(start.x, start.y, 'MC');
    window.player=this.player
 
    this.player.body.setSize(this.player.width * 0.1, this.player.height * 0.3)
    
    // Set up collisions between player and enemy1
    
 

   
 
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
 
  this.stickLayer.setCollisionByExclusion(-1, true);
  this.physics.add.collider(this.player, this.stickLayer);
 this.lampLayer.setCollisionByExclusion(-1, true);
 this.physics.add.collider(this.player, this.lampLayer);
 this.wallLayer.setCollisionByExclusion(-1, true);
 this.physics.add.collider(this.player, this.wallLayer);
 this.benchLayer.setCollisionByExclusion(-1, true);
 this.physics.add.collider(this.player, this.benchLayer);
 this.outfitLayer.setCollisionByExclusion(-1, true);
 this.physics.add.collider(this.player, this.outfitLayer);


 this.physics.add.overlap(this.player, this.shirt, this.hitshirt, null, this);
 this.physics.add.overlap(this.player, this.shirt2, this.hitshirt, null, this);
 this.physics.add.overlap(this.player, this.shirt3, this.hitshirt, null, this);
  // Create the 'KE' enemy sprite
  let x = 240;
  let y = 233;
  this.enemy1 = this.physics.add.sprite(68, 241, 'KE');
  
  this.enemy2 = this.physics.add.sprite( 580, y, 'KE');

  this.enemy3 = this.physics.add.sprite(100, 105, 'KE');
  

  // When object overlap with player, call the this.collectFire function
this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this);
this.physics.add.overlap(this.player, this.enemy2, this.hitEnemy, null, this);
this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy, null, this);

  

  // Start the 'KE' enemy animation
  this.enemy1.anims.play('KE-left');
  this.enemy1.anims.play('KE-right');
  this.enemy2.anims.play('KE-up');
  this.enemy2.anims.play('KE-down');
  this.enemy3.anims.play('KE-left');
  this.enemy3.anims.play('KE-right');

  // Add a tween to move the 'KE' enemy back and forth
  this.tweens.add({
      targets: this.enemy1,
      x: 422, // End X position
      flipX: true,
      duration: 4000, // Duration in milliseconds
      ease: 'Linear', // Linear easing
      yoyo: true, // Move back and forth
      repeat: -1 // Repeat indefinitely
  });
  

  this.tweens.add({
    targets: this.enemy2,
    y: 458,
    duration: 4000,
    ease: 'Linear',
    yoyo: true,
    repeat: -1,
   onYoyo: () => {
        console.log('yoyo');
        this.enemy2.play("KE-up");
    },
    onRepeat: () =>  {
        console.log('onrepeat');
        this.enemy2.play("KE-down");
    }
    
});

this.tweens.add({
    targets: this.enemy3,
    x: 580, // End X position
    flipX: true,
    duration: 4000, // Duration in milliseconds
    ease: 'Linear', // Linear easing
    yoyo: true, // Move back and forth
    repeat: -1 // Repeat indefinitely
});


  
  } /////////////////// end of create //////////////////////////////
 
  // var level2Down = this.input.keyboard.addKey(50);
    

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
        this.player.x > 615 &&
        this.player.y > 118 &&
        this.player.y < 176 &&
        window.shirt > 2
    ) {
        console.log("Door3");
        this.level3();
      }
      
   
    } // end of update //

    // this function is called when player touch the heart

    
    hitshirt(player, item) {
        console.log("Hit shirt!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        window.shirt++
        item.disableBody(true, true); // remove shirt
        return false;
      }
      
      
    hitEnemy(player, enemy) {
        console.log("Hit enemy!!!");
        this.sound.play('hsk');
        this.cameras.main.shake(400);
        window.heart--

        enemy.disableBody(true, true); // remove fire
        if(window.enemy<1)
        { console.log("jump to game over")
        this.scene.start("gameover")
        }
   
        // Add any other effects or actions you want when the player hits an enemy
        return false;
  }
   
    level3(player, tile) {
      console.log("level03 function");
      this.scene.start("level03",);
    }
   
  }