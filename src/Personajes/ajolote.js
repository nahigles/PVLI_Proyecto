export default class Ajolote extends Phaser.GameObjects.Sprite {
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
        this.setScale(0.3,0.3); 

        // Guardamos escena y añadimos ajolote a escena
		this.scene = scene;
		this.scene.add.existing(this);
        this.key = key;

        //FISICAS
        scene.physics.world.enable(this);
        this.body.setAllowGravity(true);
        // INPUT
		this.inputEnabled = true;
		this.a = this.scene.input.keyboard.addKey('A'); //izquierda
		this.d = this.scene.input.keyboard.addKey('D'); //derecha
		this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt); 
        if(this.inputEnabled)
		{
			// Si se pulsa letra A
			if(this.a.isDown || this.cursors.left.isDown){ 
				this.body.setVelocityX(-this.speed);
			} 
			// Si se pulsa letra D
			else if(this.d.isDown || this.cursors.right.isDown){
				this.body.setVelocityX(this.speed);
			} 
			else {
				this.body.setVelocityX(0);
			}
		}
	}
}