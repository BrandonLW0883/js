class level05 extends Phaser.Scene {
  constructor() {
    super({ key: "level05" });
    this.timerText = null; // Text object to display the timer
    this.totalTime = 120; // Total time in seconds (2 minutes)
    this.currentTime = this.totalTime; // Current time in seconds
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
    this.load.image("shirt", "assets/shirt.png");
    this.load.image("dress", "assets/dress.png");
    this.load.image("cm", "assets/cm.png");
    this.load.spritesheet("KE3", "assets/karenenemy3.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.audio("hsk", "assets/hsk.wav");
    this.load.audio("collect", "assets/collect.mp3");
    this.load.audio("japanese.mp3", [
      "assets/japanese.mp3",
      "assets/japanese.png",
    ]);
  }

  create() {
    console.log("animationScene");

    // Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level5" });

  window.backgroundMusic.stop();
this.backgroundMusic5 = this.sound.add('japanese.mp3', { loop: true });
this.backgroundMusic5.play();


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

    this.cursors = this.input.keyboard.createCursorKeys();
    this.timerText = this.add
      .text(70, 40, "Time: 02:00", { fontSize: "20px", fill: "#fff" })
      .setScrollFactor(0)
      .setVisible(true);

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

    // // Add background music
    // this.backgroundMusic = this.sound.add("japanese.mp3", { loop: true });
    // this.backgroundMusic.play();

    var shirt = map.findObject("ObjectLayer", (obj) => obj.name === "shirt");
    this.shirt = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var shirt = map.findObject("ObjectLayer", (obj) => obj.name === "shirt2");
    this.shirt2 = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var shirt = map.findObject("ObjectLayer", (obj) => obj.name === "shirt3");
    this.shirt3 = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var shirt = map.findObject("ObjectLayer", (obj) => obj.name === "shirt4");
    this.shirt4 = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var shirt = map.findObject("ObjectLayer", (obj) => obj.name === "shirt5");
    this.shirt5 = this.physics.add.sprite(shirt.x, shirt.y, "shirt");

    var dress = map.findObject("ObjectLayer", (obj) => obj.name === "dress");
    this.dress = this.physics.add.sprite(dress.x, dress.y, "dress");

    var dress = map.findObject("ObjectLayer", (obj) => obj.name === "dress2");
    this.dress2 = this.physics.add.sprite(dress.x, dress.y, "dress");

    var dress = map.findObject("ObjectLayer", (obj) => obj.name === "dress3");
    this.dress3 = this.physics.add.sprite(dress.x, dress.y, "dress");

    var dress = map.findObject("ObjectLayer", (obj) => obj.name === "dress4");
    this.dress4 = this.physics.add.sprite(dress.x, dress.y, "dress");

    var dress = map.findObject("ObjectLayer", (obj) => obj.name === "dress5");
    this.dress5 = this.physics.add.sprite(dress.x, dress.y, "dress");

    var cm = map.findObject("ObjectLayer", (obj) => obj.name === "cm1");
    this.cm1 = this.physics.add.sprite(cm.x, cm.y, "cm");

    var cm = map.findObject("ObjectLayer", (obj) => obj.name === "cm2");
    this.cm2 = this.physics.add.sprite(cm.x, cm.y, "cm");

    var cm = map.findObject("ObjectLayer", (obj) => obj.name === "cm3");
    this.cm3 = this.physics.add.sprite(cm.x, cm.y, "cm");

    var cm = map.findObject("ObjectLayer", (obj) => obj.name === "cm4");
    this.cm4 = this.physics.add.sprite(cm.x, cm.y, "cm");

    //this.cursors = this.input.keyboard.createCursorKeys();

    // var key3Down = this.input.keyboard.addKey(51);

    // key3Down.on('down', function(){
    //  console.log("Key 1 pressed");
    //     this.scene.start("level2");
    //   }, this );

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
      key: "KE3-up",
      frames: this.anims.generateFrameNumbers("KE3", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "KE3-left",
      frames: this.anims.generateFrameNumbers("KE3", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "KE3-down",
      frames: this.anims.generateFrameNumbers("KE3", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "KE3-right",
      frames: this.anims.generateFrameNumbers("KE3", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    // if (this.musicPlaying) {
    //   this.backgroundMusic = this.sound.add("japanese.mp3", { loop: true });
    //   this.backgroundMusic.play();
    //   this.musicPlaying = true;
    // }

    
 

    // Find the "start" object
    let start = map.findObject("ObjectLayer", (obj) => obj.name === "start");
    console.log(start); // Check if start is null or not

    // If start is not null, create the player sprite at its position
    if (start) {
      this.player = this.physics.add.sprite(start.x, start.y, "MC");
      window.player = this.player;
      this.player.body.setSize(
        this.player.width * 0.1,
        this.player.height * 0.3
      );
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

    this.shirtCollected = this.add
      .text(420, 46, "shirt collected " + window.shirt, {
        fontSize: "20px",
        fill: "#f5f607",
      })
      .setScrollFactor(0);

    console.log("showInventory");

    // start another scene in parallel
    this.scene.launch("showInventory");

    this.dressCollected = this.add
      .text(420, 76, "dress collected " + window.dress, {
        fontSize: "20px",
        fill: "#f5f607",
      })
      .setScrollFactor(0);

    console.log("showInventory");

    // start another scene in parallel
    this.scene.launch("showInventory");

    this.cmCollected = this.add
      .text(420, 76, "cm collected " + window.cm, {
        fontSize: "20px",
        fill: "#f5f607",
      })
      .setScrollFactor(0);

    console.log("showInventory");

    // start another scene in parallel
    this.scene.launch("showInventory");

    this.physics.add.overlap(
      this.player,
      this.dress2,
      this.hitdress,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dress3,
      this.hitdress,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dress4,
      this.hitdress,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dress5,
      this.hitdress,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.dress,
      this.hitdress,
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
    this.physics.add.overlap(
      this.player,
      this.shirt4,
      this.hitshirt,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.shirt5,
      this.hitshirt,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.shirt,
      this.hitshirt,
      null,
      this
    );
    this.physics.add.overlap(this.player, this.cm1, this.hitcm, null, this);
    this.physics.add.overlap(this.player, this.cm2, this.hitcm, null, this);
    this.physics.add.overlap(this.player, this.cm3, this.hitcm, null, this);
    this.physics.add.overlap(this.player, this.cm4, this.hitcm, null, this);

    // Create the 'KE' enemy sprite
    let x = 240;
    let y = 153;
    this.enemy1 = this.physics.add.sprite(332, 834, "KE3");

    this.enemy2 = this.physics.add.sprite(53, 723, "KE3");

    this.enemy3 = this.physics.add.sprite(663, 416, "KE3");

    this.enemy4 = this.physics.add.sprite(373, 143, "KE3");

    this.enemy5 = this.physics.add.sprite(874, 205, "KE3");

    this.enemy6 = this.physics.add.sprite(1202, 210, "KE3");

    this.enemy7 = this.physics.add.sprite(132, 110, "KE3");

    this.enemy8 = this.physics.add.sprite(276, 226, "KE3");

    this.enemy9 = this.physics.add.sprite(26, 417, "KE3");

    this.enemy10 = this.physics.add.sprite(404, 393, "KE3");

    this.enemy11 = this.physics.add.sprite(1111, 148, "KE3");

    this.enemy12 = this.physics.add.sprite(320, 580, "KE3");

    this.enemy13 = this.physics.add.sprite(275, 834, "KE3");

    this.enemy14 = this.physics.add.sprite(1301, 185, "KE3");

    this.enemy15 = this.physics.add.sprite(1485, 158, "KE3");


    // When object overlap with player, call the this.collectFire function
    this.physics.add.overlap(
      this.player,
      this.enemy15,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy14,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy13,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy12,
      this.hitEnemy,
      null,
      this
    );
   
    this.physics.add.overlap(
      this.player,
      this.enemy11,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy10,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy9,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy8,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy7,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy6,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy5,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy4,
      this.hitEnemy,
      null,
      this
    );
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
    this.enemy1.anims.play("KE3-left");
    this.enemy1.anims.play("KE3-right");
    this.enemy2.anims.play("KE3-left");
    this.enemy2.anims.play("KE3-right");
    this.enemy3.anims.play("KE3-up");
    this.enemy3.anims.play("KE3-down");
    this.enemy4.anims.play("KE3-left");
    this.enemy4.anims.play("KE3-right");
    this.enemy5.anims.play("KE3-left");
    this.enemy5.anims.play("KE3-right");
    this.enemy6.anims.play("KE3-up");
    this.enemy6.anims.play("KE3-down");
    this.enemy7.anims.play("KE3-up");
    this.enemy7.anims.play("KE3-down");
    this.enemy8.anims.play("KE3-left");
    this.enemy8.anims.play("KE3-right");
    this.enemy9.anims.play("KE3-left");
    this.enemy9.anims.play("KE3-right");
    this.enemy10.anims.play("KE3-up");
    this.enemy10.anims.play("KE3-down");
    this.enemy11.anims.play("KE3-up");
    this.enemy11.anims.play("KE3-down");
    this.enemy12.anims.play("KE3-left");
    this.enemy12.anims.play("KE3-right");
    this.enemy13.anims.play("KE3-left");
    this.enemy13.anims.play("KE3-right");
    this.enemy14.anims.play("KE3-left");
    this.enemy14.anims.play("KE3-right");
    this.enemy15.anims.play("KE3-left");
    this.enemy15.anims.play("KE3-right");

    // When object overlap with player, call the this.collectFire function
    this.physics.add.overlap(
      this.player,
      this.enemy7,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy6,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy5,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy4,
      this.hitEnemy,
      null,
      this
    );
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

    // Add a tween to move the 'KE' enemy back and forth
    this.tweens.add({
      targets: this.enemy1,
      x: 982, // End X position
      flipX: true,
      duration: 1200, // Duration in milliseconds
      ease: "Linear", // Linear easing
      yoyo: true, // Move back and forth
      repeat: -1, // Repeat indefinitely
    });

    this.tweens.add({
      targets: this.enemy2,
      x: 259,
      flipX: true,
      duration: 1200,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy3,
      y: 677,
      duration: 1200,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        console.log("yoyo");
        this.enemy3.anims.play("KE3-up");
      },
      onRepeat: () => {
        console.log("onrepeat");
        this.enemy3.anims.play("KE3-down");
      },
    });

    this.tweens.add({
      targets: this.enemy4,
      x: 851,
      flipX: true,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy5,
      x: 1213,
      flipX: true,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy6,
      y: 733,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        console.log("yoyo");
        this.enemy6.anims.play("KE3-up");
      },
      onRepeat: () => {
        console.log("onrepeat");
        this.enemy6.anims.play("KE3-down");
      },
    });
    this.tweens.add({
      targets: this.enemy7,
      y: 528,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        console.log("yoyo");
        this.enemy7.anims.play("KE3-up");
      },
      onRepeat: () => {
        console.log("onrepeat");
        this.enemy7.anims.play("KE3-down");
      },
    });
    this.tweens.add({
      targets: this.enemy8,
      x: 887,
      flipX: true,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy9,
      x: 447,
      flipX: true,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.enemy10,
      y: 841,
      flipX: true,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy11,
      y: 1046,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        console.log("yoyo");
        this.enemy11.anims.play("KE3-up");
      },
      onRepeat: () => {
        console.log("onrepeat");
        this.enemy11.anims.play("KE3-down");
      },
    });

    this.tweens.add({
      targets: this.enemy12,
      x: 1157,
      flipX: true,
      duration: 1200,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy13,
      x: 48,
      flipX: true,
      duration: 1200,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy14,
      x: 1579,
      flipX: true,
      duration: 1200,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy15,
      y: 702,
      duration: 1500,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        console.log("yoyo");
        this.enemy11.anims.play("KE3-up");
      },
      onRepeat: () => {
        console.log("onrepeat");
        this.enemy11.anims.play("KE3-down");
      },
    });

     // Start the countdown timer
     this.startTimer();
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

    if (this.player.x > 1506 && this.player.y > 1051 && this.player.y < 1083) {
      console.log("Door1");
      this.level1();
    }
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

  hitEnemy(player, enemy) {
    console.log("Hit enemy!!!");
    this.sound.play("hsk");
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
      this.backgroundMusic5.stop();
      this.scene.start("gameover");
    }

    enemy.disableBody(true, true); // Remove enemy

    // Add any other effects or actions you want when the player hits an enemy
    return false;
  }
  hitdress(player, item) {
    console.log("Hit dress!!!");
    this.sound.play("collect");
    this.cameras.main.shake(0);
    window.dress++; // Increment dress count
    item.disableBody(true, true); // Remove dress
    return false;
  }

  hitshirt(player, item) {
    console.log("Hit shirt!!!");
    this.sound.play("collect");
    this.cameras.main.shake(0);
    window.shirt++; // Increment shirt count
    item.disableBody(true, true); // Remove shirt
    return false;
  }

  hitcm(player, item) {
    console.log("Hit cm!!!");
    this.sound.play("collect");
    this.cameras.main.shake(0);
    window.cm++; // Increment shirt count
    item.disableBody(true, true); // Remove shirt
    return false;
  }
  winscene(player, tile) {
    console.log("winscene function");
    this.backgroundMusic5.stop();
    
    this.scene.start("winscene"
    )
  }

  // function to jump to winning scene
  levelwin() {
    this.backgroundMusic5.stop();
    if (window.shirt <= 3) console.log("winscene");
    this.scene.start("winscene");
  }
}

