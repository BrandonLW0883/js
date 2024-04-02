class level03 extends Phaser.Scene {
    constructor() {
        super({ key: 'level03' });
        this.timerText = null; // Text object to display the timer
    this.totalTime = 120; // Total time in seconds (2 minutes)
    this.currentTime = this.totalTime; // Current time in seconds
        this.musicPlaying = false; // Variable to track music state
    }

    preload() {
        // Step 1, load JSON
        this.load.tilemapTiledJSON("level3", "assets/level3.tmj");

        // Step 2: Preload any images here
        this.load.image("clotheimg", "assets/clothes768x768.png");
        this.load.image("interiorimg", "assets/interior718x1214.png");
        this.load.image("buildingimg", "assets/Buildings32x32.png");
        this.load.spritesheet('KE', 'assets/karenenemy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image("shirt", "assets/shirt.png");
        this.load.image("dress", "assets/dress.png");
        this.load.audio('hsk', 'assets/hsk.wav'); 
        this.load.audio('collect', 'assets/collect.mp3'); 
        this.load.audio('room2.mp3', ['assets/room2.mp3', 'assets/room2.mp3']);
    }

    create() {
        console.log("animationScene");
       
        // Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "level3" });

        window.backgroundMusic.stop();      

    window.backgroundMusic3 = this.sound.add('room2.mp3', { loop: true });
    window.backgroundMusic3.play();

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

        this.cursors = this.input.keyboard.createCursorKeys();
        this.timerText = this.add
          .text(70, 40, "Time: 02:00", { fontSize: "20px", fill: "#fff" })
          .setScrollFactor(0)
          .setVisible(true);
        

    //this.cursors = this.input.keyboard.createCursorKeys();

   // var key3Down = this.input.keyboard.addKey(51);
 
   this.hearts = [];

   this.hearts.push(
     this.add
       .sprite(230, 50, "heart")
       .play("spin")
       .setScale(0.8)
       .setScrollFactor(0)
       .setVisible(true)
   );
   this.hearts.push(
     this.add
       .sprite(300, 50, "heart")
       .play("spin")
       .setScale(0.8)
       .setScrollFactor(0)
       .setVisible(true)
   );
   this.hearts.push(
     this.add
       .sprite(370, 50, "heart")
       .play("spin")
       .setScale(0.8)
       .setScrollFactor(0)
       .setVisible(true)
   );
     
     var dress= map.findObject("Object Layer 1", (obj) => obj.name === "dress2");
     this.dress2 = this.physics.add.sprite(dress.x, dress.y, "dress");
 
    var dress= map.findObject("Object Layer 1", (obj) => obj.name === "dress3");
     this.dress3 = this.physics.add.sprite(dress.x, dress.y, "dress");

     var dress= map.findObject("Object Layer 1", (obj) => obj.name === "dress");
    this.dress = this.physics.add.sprite(dress.x, dress.y, "dress");

    var shirt= map.findObject("Object Layer 1", (obj) => obj.name === "shirt");
    this.shirt = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var shirt= map.findObject("Object Layer 1", (obj) => obj.name === "shirt2");
    this.shirt2 = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var shirt= map.findObject("Object Layer 1", (obj) => obj.name === "shirt3");
    this.shirt3 = this.physics.add.sprite(shirt.x, shirt.y, "shirt");
 

   
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
 var start = map.findObject("Object Layer 1", (obj) => obj.name === "start");
this.player=this.physics.add.sprite(start.x, start.y, 'MC');

     this.player.body.setSize(this.player.width * 0.1, this.player.height * 0.3);
 
 
    

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

  this.shirtCollected = this.add
         .text(420, 46, "shirt collected " + window.shirt,{
          fontSize: "20px",
          fill: "#f5f607",
         })
         .setScrollFactor(0);

         console.log("showInventory");

    // start another scene in parallel
    this.scene.launch("showInventory");
    
    this.dressCollected = this.add
         .text(420, 76, "dress collected " + window.dress,{
          fontSize: "20px",
          fill: "#f5f607",
         })
         .setScrollFactor(0);

         console.log("showInventory");

    // start another scene in parallel
    this.scene.launch("showInventory");

  

 this.physics.add.overlap(this.player, this.dress2, this.hitdress, null, this);
 this.physics.add.overlap(this.player, this.dress3, this.hitdress, null, this);
 this.physics.add.overlap(this.player, this.dress,  this.hitdress, null, this);
 this.physics.add.overlap(this.player, this.shirt2, this.hitshirt, null, this);
 this.physics.add.overlap(this.player, this.shirt3, this.hitshirt, null, this);
 this.physics.add.overlap(this.player, this.shirt, this.hitshirt, null, this);

 
 
   // Create the 'KE' enemy sprite
   let x = 240;
   let y = 153;
   this.enemy1 = this.physics.add.sprite(x, 432, 'KE');
   
   this.enemy2 = this.physics.add.sprite( 237, y, 'KE');

   this.enemy3 = this.physics.add.sprite( 1004, y, 'KE');
 
   this.enemy4 = this.physics.add.sprite( 471, y, 'KE');

   this.enemy5 = this.physics.add.sprite( 718, y, 'KE');

   this.enemy6 = this.physics.add.sprite( 146, 330, 'KE');
   
  // When object overlap with player, call the this.collectFire function
  this.physics.add.overlap(this.player, this.enemy6, this.hitEnemy, null, this);
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
   this.enemy5.anims.play('KE-up');
   this.enemy5.anims.play('KE-down');
   this.enemy6.anims.play('KE-left');
   this.enemy6.anims.play('KE-right');
   
   
 
   // Add a tween to move the 'KE' enemy back and forth
   this.tweens.add({
       targets: this.enemy1,
       x: 490, // End X position
       flipX: true,
       duration: 1500, // Duration in milliseconds
       ease: 'Linear', // Linear easing
       yoyo: true, // Move back and forth
       repeat: -1 // Repeat indefinitely
   });
   
 
   this.tweens.add({
     targets: this.enemy2,
     x: 730,
     flipX: true,
     duration: 1700,
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

this.tweens.add({
  targets: this.enemy6,
  x: 580,
  flipX: true,
  duration: 1700,
  ease: 'Linear',
  yoyo: true,
  repeat: -1,

});

// // Add background music
// window.backgroundMusic.stop();
// window.backgroundMusic3 = this.sound.add('room2.mp3', { loop: true });
// window.backgroundMusic3.play();

 // Start the countdown timer
 this.startTimer();


// var level2Down = this.input.keyboard.addKey(50);

  
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
          this.player.x > 380 &&
          this.player.y > 680 &&
          this.player.y < 720 &&
          window.dress > 2 &&
          window.shirt > 2

        ) {

          console.log("Jump to winscene");
          this.levelwin();
    
          console.log("Door1");
          this.level1();
        }
       
   
      } // end of update //

     
   

      hitdress(player, item) {
        console.log("Hit dress!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        window.dress++; // Increment dress count
        this.dressCollected.setText("dresscollected " + window.dress );
        item.disableBody(true, true); // Remove dress
        return false;
    }
    startTimer() {
      // Start the countdown timer event
      this.time.addEvent({
        delay: 1000, // Update every second (1000 milliseconds)
        callback: this.updateTimer,
        callbackScope: this,
        loop: true, // Repeat indefinitely
      });
    }
    updateTimer() {
      // Decrement the current time
      this.currentTime--;
  
      // Check if time has run out
      if (this.currentTime <= 0) {
        // Game over logic
        this.scene.start("gameover");
      } else {
        // Format the time into minutes and seconds
        let minutes = Math.floor(this.currentTime / 60);
        let seconds = this.currentTime % 60;
  
        // Update the timer text
        this.timerText.setText(
          `Time: ${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`
        );
      }
    }
    
    hitshirt(player, item) {
        console.log("Hit shirt!!!");
        this.sound.play('collect');
        this.cameras.main.shake(0);
        window.shirt++; // Increment shirt count
        this.shirtCollected.setText("shirtcollected " + window.shirt );
        item.disableBody(true, true); // remove shirt
    // Create a new shirt sprite at a specific position
    let shirtSprite = this.physics.add.sprite(350, 70, "shirt");
    shirtSprite.setScrollFactor(0);
    shirtSprite.setScale(1.0); // Scale the shirt sprite
    shirtSprite.setVisible(true); // Make the shirt sprite visible

        return false;
    }

    level1(player, tile) {
      console.log("winscene function");
      this.backgroundMusic3.stop();
      this.scene.start("winscene");
    }
   
    hitEnemy(player, enemy) {
      console.log("Hit enemy!!!");
      this.sound.play('hsk');
      this.cameras.main.shake(400);
      window.heart--; // Decrement player's heart count


      // Update heart sprites' visibility
      if (window.heart >= 0 && window.heart < this.hearts.length) {
        // Hide the next heart in the sequence
        this.hearts[window.heart].setVisible(false);
      }
  
      enemy.disableBody(true, true); // Remove enemy
      if (window.heart < 1) {
          console.log("Jump to game over");
          window.backgroundMusic3.stop();

          this.scene.start("gameover");
      }

   enemy.disableBody(true, true); // Remove enemy

        // Add any other effects or actions you want when the player hits an enemy
        return false;
  }


      winscene(player, tile) {
        console.log("winscene function");
        window.backgroundMusic3.stop();
        this.scene.start("winscene",);
      }
   // function to jump to winning scene
  levelwin() {
    this.backgroundMusic.stop();
    if (window.shirt <= 3, window.dress<= 3) console.log("winscene");
    this.scene.start("winscene");
  }
}
    