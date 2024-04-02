class intro1 extends Phaser.Scene {
    constructor() {
        super('intro1');

    }

    preload(){
       
        this.load.image("introimg", "assets/intro1.png");
       

    }

    create() {
        console.log("intro1");

        
      

        this.add.image(320, 320, "introimg")
        this.add.text(130, 160, ' press spacebar to continue',
            { font: '24px Courier', fill: '#9665aa' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            this.scene.start("intro2");
        }, this);
    }
}