export default class LockedDoor extends Phaser.GameObjects.Sprite{
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
        this.scene = scene;
		this.scene.add.existing(this);
        //fisicas
        scene.physics.add.existing(this); 
        this.body.allowGravity = false; //no tienen gravedad
        this.setInteractive();
    }
    preUpdate(t, dt){
		super.preUpdate(t, dt);
	}
}