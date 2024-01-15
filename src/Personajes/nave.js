/**
 * Sprite de nave utilizado en el minijuego 4
 * Controla su movimiento
 */
export default class Nave extends Phaser.GameObjects.Sprite {
    /**
	 * Constructor
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
    constructor(scene, x, y, key){
		// Llamamos al constructor del padre
		super(scene, x, y, key);
        this.speed = 200;
        this.setScale(1,1); 

        // Guardamos escena y añadimos nave a escena
		this.scene = scene;
		this.scene.add.existing(this);
        this.key = key;

        //FISICAS
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);

        // INPUT
		this.inputEnabled = true;
		this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.a = this.scene.input.keyboard.addKey('A');
		this.d = this.scene.input.keyboard.addKey('D'); 
        this.w = this.scene.input.keyboard.addKey('W'); 
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt); 

        if(this.inputEnabled){
            if (this.cursors.up.isDown || this.w.isDown)
            {
                this.scene.physics.velocityFromRotation(this.rotation, 200, this.body.acceleration);
            }
            else
            {
                this.body.acceleration.set(0);
            }

            if (this.cursors.left.isDown || this.a.isDown)
            {
                this.body.angularVelocity = -300;
            }
            else if (this.cursors.right.isDown || this.d.isDown)
            {
                this.body.angularVelocity = 300;
            }

            else
            {
                this.body.angularVelocity = 0;
            }
		}
	}
}