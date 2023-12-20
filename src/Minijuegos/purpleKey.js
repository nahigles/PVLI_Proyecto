export default class PurpleKey extends Phaser.GameObjects.Sprite{
    /**
	 * Contructor de la carpeta
	 * @param {Scene} scene, escena en la que se añade
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
        //propiedad para saber si ha sido cogida por el jugador
        this.catch = false;
    }
    preUpdate(t, dt){
		super.preUpdate(t, dt);
	}
}