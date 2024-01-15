/**
 * Sprite de bala que se utiliza en el minijuego de la planta 4
 * Controla su movimiento, con su rotacion y los limites de la escena
 */

export default class Bala extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Bala
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {Pool} pool - object pool
	 */
	constructor(scene, x, y, rot, pool, bounds, isFirst) {
		super(scene, x, y, 'balaAnim');
        this.key = 'balaAnim';
        this.rotation = rot;
        this.setScale(3,3); 

		this.scene.add.existing(this);
		
		if (isFirst){
			this.scene.anims.create({
				key: this.key,
				frames: scene.anims.generateFrameNumbers(this.key, {start:0, end:1}),
				frameRate: 10,
				repeat: -1
			});
		}

		this.pool = pool;
        this.bounds = bounds;
        
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);

        this.play(this.key, true);
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
        
        this.play(this.key, true);
		
        this.scene.physics.velocityFromRotation(this.rotation, 666, this.body.acceleration);

        if (this.x < this.bounds.x || this.x > this.bounds.x + this.bounds.w || this.y < this.bounds.y || this.y > this.bounds.y + this.bounds.h)
        {            
			this.destroy();
        }
	}
	
    destroyBala(){
		this.pool.release(this);
		
    }
}