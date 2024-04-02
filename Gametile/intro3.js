class intro3 extends Phaser.Scene {
    constructor() {
        super('intro3');

    }

    preload(){
       
        this.load.image("intro3img", "assets/intro3.png");
    }

    create() {
        console.log("intro3");
        this.add.image(320, 320, "intro3img")
        this.add.text(130, 160, ' press spacebar to continue',
            { font: '24px Courier', fill: '#9665aa' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            this.scene.start("intro4");
        }, this);
    }
}