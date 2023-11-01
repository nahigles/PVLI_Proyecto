//import...

/**
 * Escena minijuego plataformas
 */
export default class Minijuego1 extends Phaser.Scene{
    /**
     * Constructor, definimos la key de esta escena
     */
    constructor(){
        super({key: 'MinijuegoPlataformas'});
    }
    init(){

    }
    preload(){ //cargar los assets que vayamos a usar
        this.load.image('background', 'assets/images/background.jpeg');

    }
    create(){
        this.add.image(0, 0, 'background').setScale(0.8, 0.8).setOrigin(0, 0) // background

        //gameObjects

        this.nextKey = this.input.keyboard.addKey('Q'); //// Y escuchamos la pulsación de la tecla 'Q' para cambiar de escena.

    }
    update(){
        if(this.nextKey.isDown){ // Comprobamos si hemos pulsado la tecla 'Q', en cuyo caso, pasamos a esa escena.
			this.scene.start("Planta1"); // Pasamos a la escena con identificador 'Planta1'
		}
    }
}