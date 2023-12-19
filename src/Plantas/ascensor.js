export default class Ascensor extends Phaser.GameObjects.Sprite{
    /**
	 * Contructor de la carpeta
	 * @param {Scene} scene, escena en la que se añade la ascensor
     * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
    constructor(scene,x,y,key) {
        //constructor del padre (Sprite)
        super(scene,x,y, key);
       // this.setScale(0.3,0.3);
        // Añadimos el ascensor a la escena 
        this.scene = scene;
		this.scene.add.existing(this);
        //fisicas
        scene.physics.add.existing(this); 
        this.body.allowGravity = false; //no tienen gravedad
        //animacion abrir ascensor
        this.scene.anims.create({
			key: 'abrir',
			frames: scene.anims.generateFrameNumbers('ascensorAnim', {start:1, end:3}),
			frameRate: 2,
			repeat:0,
		});
    }
    preUpdate(t, dt){
		super.preUpdate(t, dt);
	}
}