/**
 * Sprite de virus que se utiliza en el minijuego de la planta 4
 * Controla su movimiento, con su velocidad y los limites de la escena
 */
export default class Virus extends Phaser.GameObjects.Sprite {
    /**
	 * Constructor
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 */

    constructor(scene, bounds, isLock){
		// Llamamos al constructor del padre
        let x = Phaser.Math.Between(bounds.x+10, bounds.x+bounds.w-10);
        let y = Phaser.Math.Between(bounds.y+10, bounds.y+bounds.h-10);
        
        let key;
        let speed;
        if (isLock){
            key = 'lock'
        }
        else {
            if (Math.random() < 0.5){
                key = 'virusA';
                speed = 12;
            }
            else {
                key = 'virusB';
                speed = 10;
            }
            if (scene.virusCant == 1){
                scene.anims.create({
                    key: 'explotionAnim',
                    frames: scene.anims.generateFrameNumbers('explotionAnim', {start:0, end:7}),
                    frameRate: 10,
                    hideOnComplete: true
                });
            }
        }

		super(scene, x, y, key);

        if (isLock){
            key = 'lock'
            speed = 10;
            this.setScale(3,3); }

        // Guardamos escena y añadimos ajolote a escena
		this.scene = scene;
		this.scene.add.existing(this);

        this.bounds = bounds;
        this.speed = speed;

        //FISICAS
        this.scene.physics.world.enable(this);        
        this.body.setAllowGravity(false);

        this.keyID = key;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        this.scene.physics.world.wrap(this, 0);
	}

    setV(){
        this.body.setVelocity(Phaser.Math.Between(-10, 10) * this.speed, Phaser.Math.Between(-10, 10) + this.speed);
    }

    destroyVirus(){
        this.body.setVelocity(0);
        this.play('explotionAnim', true);
        this.once('animationcomplete', () => {
            setTimeout(()=>{
                this.destroy();
            },100);
        })
        if (this.keyID == 'lock'){
            this.scene.win();
        }
    }
}