class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super('preloadScene');
    }
    create () {
        // let graphics = this.add.graphics();

        // graphics.fillStyle(0xff3300, 1);

        // graphics.fillRect(100, 200, 900, 800);
        // graphics.fillRect(100, 100, 100, 800);

        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue',
            { font: '24px Courier', fill: '#d89b7f' });
 
        var spaceDown = this.input.keyboard.addKey('SPACE');
 
        spaceDown.on('down', function(){
            this.scene.start("level01");
            }, this );
 
    }

}
