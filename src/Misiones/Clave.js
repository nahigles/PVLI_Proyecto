export default class Clave extends Phaser.GameObjects.Sprite{
    /**
	 * Contructor de la nota con clave
	 * @param {Scene} scene, escena en la que se añade la clave
     * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
    constructor(scene,x,y,key) {
        //constructor del padre (Sprite)
        super(scene,x,y, key);
        // Añadimos a la escena 
        this.scene = scene;
		this.scene.add.existing(this);
        //fisicas
        scene.physics.add.existing(this); 
        this.body.allowGravity = false; //no tienen gravedad

        this.setScale(0.4,0.4);
    }
    preUpdate(t, dt){
		super.preUpdate(t, dt);
	}
}