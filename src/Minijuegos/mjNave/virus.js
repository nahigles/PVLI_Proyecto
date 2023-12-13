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
            key = 'lockAnim'
        }
        else {
            if (Math.random() < 0.5){
                key = 'virusA';
                speed = 22;
            }
            else {
                key = 'virusB';
                speed = 33;
            }
        }

		super(scene, x, y, key);

        // Guardamos escena y añadimos ajolote a escena
		this.scene = scene;
		this.scene.add.existing(this);

        this.bounds = bounds;
        this.speed = speed;

        //FISICAS
        this.scene.physics.world.enable(this);        
        this.body.setAllowGravity(false);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        this.scene.physics.world.wrap(this, 0);
	}

    setV(){
        this.body.setVelocity(Phaser.Math.Between(-10, 10) * this.speed, Phaser.Math.Between(-10, 10) + this.speed);
    }

    destroyVirus(){
		console.log("destroy virus");
        this.destroy();
    }
}