
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
        this.input.keyboard.on('keydown-ESC', function (event) {
            this.scene.launch("PauseMenu" + this.key);
            this.scene.pause(this.key);
        }, this);
    }
    update(){
    }
}