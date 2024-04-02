class intro4 extends Phaser.Scene {
    constructor() {
        super('intro4');

    }

    preload(){
       
        this.load.image("intro4img", "assets/intro4.png");
        this.load.spritesheet('MC', 'assets/maincharacter.png', { frameWidth: 64, frameHeight: 64 });
    }

    

    create() {

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
    
    
       
    
        console.log("intro4");
        this.add.image(320, 320, "intro4img")
        this.add.text(130, 400, ' press spacebar to continue',
            { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            this.scene.start("level01");
        }, this);

        this.add.sprite(100, 500, 'MC').play('MC-up').setScale(2)
        this.add.sprite(250, 500, 'MC').play('MC-left').setScale(2)
        this.add.sprite(400, 500, 'MC').play('MC-down').setScale(2)
        this.add.sprite(550, 500, 'MC').play('MC-right').setScale(2)
    
    }
}