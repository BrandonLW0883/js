class winscene extends Phaser.Scene {
    constructor() {
        super({ key: 'winscene' });
        this.musicPlaying = false; // Variable to track music state
    }

    preload() {
        // Preload assets if needed
        this.load.image("winning1", "assets/winning1.png");
        this.load.audio('winsound', 'assets/winsound.wav');
    }
  
    create() {
        console.log("winscene");

        //window.backgroundMusic.stop();

  
        this.add.image(320, 320, "winning1")
        // // Display winning image
        // this.add.image(300, 300, "winning1");
        window.shirt=0
        window.backgroundMusic2.stop();

        window.winsoundMusic = this.sound.add('winsound', { loop: false });
        window.winsoundMusic.play();


        // Check for spacebar press to restart level
        let spaceDown = this.input.keyboard.addKey('ENTER');
        spaceDown.on('down', function() {
            // this.backgroundMusic2.stop();
            this.scene.start("level01",
            {player: this.player, } 
            )
        }, this);
    }
    
}