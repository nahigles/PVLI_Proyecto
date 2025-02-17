import Button from '../UI/Button.js';
/**
 *Escena de la que van a heredar todos los minijuegos
* Aqui se encuentra todo lo que tienen en comun todos los minijuegos
 */
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
        this.load.audio('minijuegoSound', 'assets/sounds/minijuegoSound.ogg');
        
    }
    create(){
        this.ButtonSoundd = this.sound.add('buttonSound');
        this.mjSound = this.sound.add('minijuegoSound');
        this.mjSound.loop = true;
        this.mjSound.setVolume(0.25);
        this.mjSound.play();

        this.input.keyboard.on('keydown-ESC', function (event) {
            this.scene.launch("PauseMenu", {
                level : this.key,
                other : this.planta
               });
            this.scene.pause(this.key); 
            this.music(false);
        }, this);
         // BotonPause
		this.pauseButton = new Button(this, 575, 25, 'pauseButtonMJ', ()=>{ this.scene.launch("PauseMenu", {
            level : this.key,
            other : this.planta
           });
           this.scene.pause(); 
           this.music(false);
        }, this.ButtonSoundd ).setScrollFactor(0);
        this.pauseButton.setDepth(10);
    }
    update(){
    }
    //habilitar / deshabilitar la musica cuando se entra y sale del minijuego 
    music(enable){
		if(enable){
			this.mjSound.resume();
		}
		else{
			this.mjSound.pause();
		}

	}
}