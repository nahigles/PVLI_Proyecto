export default class Bala extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 * @param {Pool} pool - object pool
	 */
	constructor(scene, x, y, rot, pool, bounds) {
		super(scene, x, y, 'balaAnim');
        this.key = 'balaAnim';
        this.rotation = rot;
        this.setScale(3,3); 

		this.scene.add.existing(this);

        this.scene.anims.create({
			key: this.key,
			frames: scene.anims.generateFrameNumbers(this.key, {start:0, end:1}),
			frameRate: 10,
			repeat: -1
		});

		this.pool = pool;
        this.bounds = bounds;
        
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);

        this.play(this.key, true);
	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
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