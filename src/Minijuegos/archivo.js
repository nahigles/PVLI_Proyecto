export default class Archivo extends Phaser.GameObjects.Container{
    /**
	 * Contructor de la carpeta
	 * @param {Scene} scene, escena en la que se añade la carpeta
     * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - id
	 */
    constructor(scene,x,y,key) {
        // Constructor del padre 
        super(scene,x,y);
        this.key = key;
        this.setScale(0.3,0.3);

        // Añadimos la carpeta a la escena 
        this.scene = scene;
		this.scene.add.existing(this);

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            
            gameObject.x = dragX;
            gameObject.y = dragY;
            
        });

    }
    create(){}

    preUpdate(t, dt){
		//super.preUpdate(t, dt);
	}
}