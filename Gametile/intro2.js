class intro2 extends Phaser.Scene {
    constructor() {
        super('intro2');

    }

    preload(){
       
        this.load.image("intro2img", "assets/intro2.png");
    }

    create() {
        console.log("intro2");
        this.add.image(320, 320, "intro2img")
        this.add.text(130, 160, ' press spacebar to continue',
            { font: '24px Courier', fill: '#9665aa' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            this.scene.start("intro3");
        }, this);
    }
}