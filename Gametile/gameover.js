class gameover extends Phaser.Scene {

    constructor ()
    {
        super('gameover');
        this.musicPlaying = false; // Variable to track music state
    
    }

    preload(){

        this.load.image("gameover", "assets/gameover.png");

        this.load.audio('gameover.wav', ['assets/gameover.wav', 'assets/gameover.wav']);


    }

    
    create () {

        console.log("gameover")

        // let graphics = this.add.graphics();

        // graphics.fillStyle(0xff3300, 1);

        // graphics.fillRect(100, 200, 900, 800);
        // graphics.fillRect(100, 100, 100, 800);

    
        window.gameoverMusic = this.sound.add('gameover.wav', { loop: false });
        window.gameoverMusic.play();
  
        this.add.image(320, 320, "gameover")
        window.heart=0
       
 
        var spaceDown = this.input.keyboard.addKey('SPACE');
 
        spaceDown.on('down', function(){
            window.backgroundMusic.stop();
            this.scene.start("level01",
            {player: this.player, } 
            )
            }, this );
            // this.add.sprite(100, 300, 'heart') . play('spin').setScale(1)



    }

}
