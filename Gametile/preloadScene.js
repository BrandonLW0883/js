class preloadScene extends Phaser.Scene {
    constructor() {
        super('preloadScene');

    }
    init(data) {
        this.player=data.player
    }

    preload(){
       
        this.load.image("mainpage", "assets/mainpage.png");
    }

    create() {
        console.log("preloadScene");

        
        this.add.image(320, 320, "mainpage")
        this.add.text(130, 160, ' press spacebar to continue',
            { font: '24px Courier', fill: '#9665aa' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            this.scene.start("intro1");
        }, this);
    }
}
