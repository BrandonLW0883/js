class level02 extends Phaser.Scene {
  constructor() {
    super({ key: "level02" });
    // Add any other constructor initialization here
    this.timerText = null; // Text object to display the timer
    this.totalTime = 120; // Total time in seconds (2 minutes)
    this.currentTime = this.totalTime; // Current time in seconds

    this.musicPlaying = false; // Variable to track music state
  }

  init(data) {
    this.player = data.player
    this.inventory = data.inventory
  }

  preload() {
    // Load JSON and other assets here
    this.load.tilemapTiledJSON("level2", "assets/level2.tmj");

    this.load.image("clotheimg", "assets/clothes768x768.png");
    this.load.image("buildingimg", "assets/Buildings32x32.png");
    this.load.image("forestimg", "assets/forest_tiles.png");
    this.load.image("interiorimg", "assets/interior718x1214.png");
    this.load.spritesheet("MC", "assets/maincharacter.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("KE", "assets/karenenemy.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("shirt", "assets/shirt.png");
    this.load.audio("hsk", "assets/hsk.wav");
    this.load.audio("collect", "assets/collect.mp3");
    this.load.audio("room1.mp3", ["assets/room1.mp3", "assets/room1.mp3"]);
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
    let hitSound = this.sound.add("hsk");
    hitSound.play();

    let hitSound2 = this.sound.add("collect");
    hitSound2.play();

    let tilesArray = [clothesTiles, forestTiles, interiorTiles, buildingTiles];

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
    this.timerText = this.add
      .text(70, 40, "Time: 02:00", { fontSize: "18px", fill: "#fff" })
      .setScrollFactor(0)
      .setVisible(true);
   
    // make the camera follow the player
    this.player = this.physics.add.sprite(146, 176, "MC");
    window.player = this.player;

    this.cameras.main.startFollow(this.player);

    this.anims.create({
      key: "MC-up",
      frames: this.anims.generateFrameNumbers("MC", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "MC-left",
      frames: this.anims.generateFrameNumbers("MC", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "MC-down",
      frames: this.anims.generateFrameNumbers("MC", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "MC-right",
      frames: this.anims.generateFrameNumbers("MC", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "KE-up",
      frames: this.anims.generateFrameNumbers("KE", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "KE-left",
      frames: this.anims.generateFrameNumbers("KE", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "KE-down",
      frames: this.anims.generateFrameNumbers("KE", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "KE-right",
      frames: this.anims.generateFrameNumbers("KE", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "heartAim",
      frames: this.anims.generateFrameNumbers("heart", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNumbers("heart", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    if (this.musicPlaying) {
      this.backgroundMusic = this.sound.add("room1.mp3", { loop: true });
      this.backgroundMusic.play();
      this.musicPlaying = true;
    }

    //this.player = this.physics.add.sprite(146, 176, 'MC');
    //window.player = this.player
    var shirt = map.findObject("ObjectLayer", (obj) => obj.name === "shirt");
    this.shirt = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

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

    var shirt = map.findObject("ObjectLayer", (obj) => obj.name === "shirt2");
    this.shirt2 = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var shirt = map.findObject("ObjectLayer", (obj) => obj.name === "shirt3");
    this.shirt3 = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var start = map.findObject("ObjectLayer", (obj) => obj.name === "start");

    this.player = this.physics.add.sprite(start.x, start.y, "MC");
    window.player = this.player;

    this.player.body.setSize(this.player.width * 0.1, this.player.height * 0.3);

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

    this.shirtCollected = this.add
         .text(360, 46, "shirt collected " + window.shirt,{
          fontSize: "20px",
          fill: "#f5f607",
         })
         .setScrollFactor(0);

         console.log("showInventory");

    // start another scene in parallel
    this.scene.launch("showInventory");
    


    this.physics.add.overlap(
      this.player,
      this.shirt,
      this.hitshirt,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.shirt2,
      this.hitshirt,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.shirt3,
      this.hitshirt,
      null,
      this
    );

    // Create the 'KE' enemy sprite
    let x = 240;
    let y = 233;
    this.enemy1 = this.physics.add.sprite(68, 241, "KE");

    this.enemy2 = this.physics.add.sprite(580, y, "KE");

    this.enemy3 = this.physics.add.sprite(100, 105, "KE");

    // When object overlap with player, call the this.collectFire function
    this.physics.add.overlap(
      this.player,
      this.enemy3,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy2,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy1,
      this.hitEnemy,
      null,
      this
    );

    // Start the 'KE' enemy animation
    this.enemy1.anims.play("KE-left");
    this.enemy1.anims.play("KE-right");
    this.enemy2.anims.play("KE-up");
    this.enemy2.anims.play("KE-down");
    this.enemy3.anims.play("KE-left");
    this.enemy3.anims.play("KE-right");

    // Add a tween to move the 'KE' enemy back and forth
    this.tweens.add({
      targets: this.enemy1,
      x: 422, // End X position
      flipX: true,
      duration: 4000, // Duration in milliseconds
      ease: "Linear", // Linear easing
      yoyo: true, // Move back and forth
      repeat: -1, // Repeat indefinitely
    });

    this.tweens.add({
      targets: this.enemy2,
      y: 458,
      duration: 4000,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        console.log("yoyo");
        this.enemy2.play("KE-up");
      },
      onRepeat: () => {
        console.log("onrepeat");
        this.enemy2.play("KE-down");
      },
    });

    this.tweens.add({
      targets: this.enemy3,
      x: 580, // End X position
      flipX: true,
      duration: 4000, // Duration in milliseconds
      ease: "Linear", // Linear easing
      yoyo: true, // Move back and forth
      repeat: -1, // Repeat indefinitely
    });

    // Add background music
    this.backgroundMusic = this.sound.add("room1.mp3", { loop: true });
    this.backgroundMusic.play();

      // Stop background music if playing
      if (this.scene.isActive("level01")) {
        this.scene.get("level01").backgroundMusic.stop();
      }

    // Start the countdown timer
    this.startTimer();
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
      this.player.x > 262 &&
      this.player.y > 545.4 &&
      this.player.y < 570 &&
      window.shirt > 2
    ) {
      console.log("Jump to winscene");
      this.levelwin();

    }
  } // end of update //

  // this function is called when player touch the heart

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
  collectshirt(player, shirt) {
    console.log("collectshirt");
    this.collectSnd.play();

    // Increment the count of collected shirts
    window.shirt++;

    // Disable the collected shirt item
    shirt.disableBody(true, true);

    // Update the text displaying the number of collected shirts
    this.shirtCollected.setText("Shirts Collected: " + window.shirt);
}
  hitshirt(player, item) {
    console.log("Hit shirt!!!");
    this.sound.play("collect");
    this.cameras.main.shake(0);
    window.shirt++;
    item.disableBody(true, true); // remove shirt
    // Create a new shirt sprite at a specific position
    let shirtSprite = this.physics.add.sprite(400, 50, "shirt");
    shirtSprite.setScrollFactor(0);
    shirtSprite.setScale(1.0); // Scale the shirt sprite
    shirtSprite.setVisible(true); // Make the shirt sprite visible

    // Add the new shirt sprite to the array
    // this.shirts.push(shirtSprite);

    return false;
  }

  hitEnemy(player, enemy) {
    console.log("Hit enemy!!!");
    this.sound.play("hsk");
    this.cameras.main.shake(600);

    window.heart--;

    // Update heart sprites' visibility
    if (window.heart >= 0 && window.heart < this.hearts.length) {
      // Hide the next heart in the sequence
      this.hearts[window.heart].setVisible(false);
    }

    if (window.heart < 1) {
      console.log("Jump to game over");
      this.scene.start("gameover",
      {player: this.player, } 
      )
    }

    enemy.disableBody(true, true); // Remove enemy

    // Add any other effects or actions you want when the player hits an enemy
    return false;
  }

  winscene(player, tile) {
    console.log("winscene function");
    this.backgroundMusic.stop();
    
    this.scene.start("winscene"
    )
  }

  // function to jump to winning scene
  levelwin() {
    this.backgroundMusic.stop();
    if (window.shirt <= 3) console.log("winscene");
    this.scene.start("winscene");
  }
}
