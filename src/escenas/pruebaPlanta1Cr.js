//import...

/**
 * Escena planta1
 */
export default class Planta1 extends Phaser.Scene{
    /**
     * Constructor, definimos la key de esta escena
     */
    constructor(){
        super({key: 'Planta1'});
    }
    init(){

    }
    preload(){ //cargar los assets que vayamos a usar
        this.load.image('background', 'assets/images/oficina.png');

    }
    create(){
        this.add.image(0, 0, 'background').setScale(0.8, 0.8).setOrigin(0, 0) // background

        //gameObjects

        this.nextKey = this.input.keyboard.addKey('E'); //// Y escuchamos la pulsación de la tecla 'E' para cambiar de escena.

    }
    update(){
        if(this.nextKey.isDown){ // Comprobamos si hemos pulsado la tecla 'Q', en cuyo caso, pasamos a esa escena.
			this.scene.start("MinijuegoPlataformas"); // Pasamos a la escena con identificador 'MinijuegoPlataformas'
		}
    }
}