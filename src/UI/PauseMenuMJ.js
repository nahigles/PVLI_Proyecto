
import Button from './Button.js';
export default class PauseMenuMJ extends Phaser.Scene {
	/**
	 * Constructor, deficimos la key que tendrá la escena, nos sirve para los cambios de escena 
	 */
	constructor(){	
		super({ key: 'PauseMenuMJ' });

		this.self = this;
	}
	init(){
	}
    preload(){
        this.load.spritesheet("playButton2", "./assets/images/UI/MainMenu/playButton2.png", {frameWidth: 300, frameHeight: 120});
        this.load.image('background', './assets/images/Backgrounds/fondonegro.png');
    }
    create(){
        this.add.image(0,0,'background');
		// BotonVolverMinijuego
		//this.buttonMJ = new Button(this,150, 50, 'button', ()=>{this.scene.resume("mj_Plataformas");});
        // BotonVolverPlanta
       this.buttonPlanta = new Button(this, 150, 100, 'playButton', ()=>{this.scene.resume("mj_Plataformas");},   ()=>{this.scene.stop();} );
        // BotonSalir
      //  this.buttonExit = new Button(this, 150, 150, 'playButton', ()=>{this.scene.start("MainMenu");});
    }
    update(){
    }
}