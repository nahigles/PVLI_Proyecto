export default class Tecla extends Phaser.GameObjects.Sprite{
    /**
	 * Contructor de la nota con tecla
	 * @param {Scene} scene, escena en la que se añade la carpeta
     * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
    constructor(scene,x,y,key) {
        //constructor del padre (Sprite)
        super(scene,x,y, key);
        // Añadimos la tecla a la escena 
        this.scene = scene;
		this.scene.add.existing(this);
        this.setScale(5.0,5.0);

        this.on('pointerdown', (pointer)=>
        {   
            console.log("Clicado");
            this.setTint(0xff0000);

        });

        this.on('pointerout', (pointer)=>
        {
            console.log("Clicado???");
            this.clearTint();

        });

        this.on('pointerup', (pointer)=>
        {
            console.log("FUNCIONA HOSTIA");
            this.clearTint();
        });
    }

    create(){
    
    }

    preUpdate(t, dt){
		super.preUpdate(t, dt);
	}
}