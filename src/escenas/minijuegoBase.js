import Button from '../UI/Button.js';
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
        this.load.image('pauseButtonMJ', './assets/images/UI/PauseMenu/pauseButton.png');
    }
    create(){
        this.input.keyboard.on('keydown-ESC', function (event) {
            this.scene.launch("PauseMenu", {
                level : this.key,
                other : this.planta
               });
            this.scene.pause(this.key);
        }, this);
         // BotonPause
		this.pauseButton = new Button(this, 575, 25, 'pauseButtonMJ', ()=>{ this.scene.launch("PauseMenu", {
            level : this.key,
            other : this.planta
           });}, ()=>{this.scene.pause();}, ()=>{}, ()=>{} ).setScrollFactor(0);
        this.pauseButton.setDepth(10);
    }
    update(){
    }
}