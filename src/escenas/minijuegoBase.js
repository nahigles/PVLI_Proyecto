export default class MinijuegoBase extends Phaser.Scene{
     /**
     * Constructora
     * @param {string} minijuego 
     * @param {string} planta
     */
    constructor(minijuego, planta) {
        super({key: minijuego});
        this.minijuego = minijuego;
        this.planta = planta;
    }
    init(){

    }
    preload(){

    }
    create(){
        this.q = this.input.keyboard.addKey('Q'); //salir del minijuego
    }
    update(){
        if(this.q.isDown){ // Comprobamos si hemos pulsado la tecla 'Q'
			this.scene.resume(this.planta); //volvemos a planta
            this.scene.stop();
		}

    }
}