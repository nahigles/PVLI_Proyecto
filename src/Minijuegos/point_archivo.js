export default class PointArchivo extends Phaser.Geom.Point{
    /**
	 * Contructor de la carpeta
	 * @param {Scene} scene, escena en la que se añade la carpeta
     * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - id
	 */
    constructor(scene,x,y, key) {
        // Constructor del padre 
        super(scene,x,y);

        // Añadimos el punto a la escena 
        this.scene = scene;
		this.scene.add.existing(this);

        this.key = key;
    }
    create(){}

    preUpdate(t, dt){
		super.preUpdate(t, dt);
	}
}