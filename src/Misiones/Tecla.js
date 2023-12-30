export default class Tecla extends Phaser.GameObjects.Sprite{
    /**
	 * Contructor de la nota con tecla
	 * @param {Scene} scene, escena en la que se añade la tecla
     * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
    constructor(scene,x,y,key, funcion) {
        //constructor del padre (Sprite)
        super(scene,x,y, key);
        // Añadimos la tecla a la escena 
        this.key = key;
        this.scene = scene;
		this.scene.add.existing(this);
        this.setScale(5.0,5.0);
        this.setInteractive();

        // Clicar
        this.on('pointerdown', (pointer)=>
        {   
            this.clicado();
            this.setTint(0xff0000);
            funcion();

        });

        // Pasar por encima raton
        this.on('pointerout', (pointer)=>
        {
            this.clearTint();
        });

        // Soltar click
        this.on('pointerup', (pointer)=>
        {
            this.clearTint();
        });
    }

    create(){
    }

    preUpdate(t, dt){
		super.preUpdate(t, dt);
	}

    clicado(){
        if(this.key == "tick"){
            this.scene.comprobarCorrecto();
        }
        else if(this.key == "cross"){
            this.scene.quitarNum();
        }
        // numero del 0 al 9
        else{
            this.scene.anadirNum(this.key);
        }
    }

    music(enable){
		if(enable){
			this.sonido.resume();
		}
		else{
			this.sonido.pause();
		}
	}
}