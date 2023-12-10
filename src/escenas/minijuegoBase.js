
export default class MinijuegoBase extends Phaser.Scene{
     /**
     * Constructora
     * @param {string} minijuego 
     * @param {string} planta
     */
    constructor(minijuego, planta) {
        super({key: minijuego});
        this.key = minijuego;
        this.planta = planta;
    }
    init(){

    }
    preload(){
    }
    create(){

    }
    update(){

    }
}