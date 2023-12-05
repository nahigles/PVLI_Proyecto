import Button from './Button.js';
export default class PauseMenuPlanta extends Phaser.Scene {
	/**
	 * Constructor, deficimos la key que tendrá la escena, nos sirve para los cambios de escena 
	 */
	constructor(){	
		super({ key: 'PauseMenuPlanta' });

		this.self = this;
	}
	init(){
	}
    preload(){
        this.load.image('resumeButton', './assets/images/UI/PauseMenu/resumeButton2.png');
        this.load.image('background', './assets/images/Backgrounds/fondonegro.png');
        this.load.image('exitButton', './assets/images/UI/PauseMenu/exitButton.png');
    }
    create(){
        this.add.image(0,0,'background').setScale(2,2);  
		// BotonVolverPlanta
		this.resumeButton = new Button(this,300, 105, 'resumeButton', ()=>{this.scene.resume("Planta1");},  ()=>{this.scene.stop();},  ()=>{}, ()=>{});
        // BotonSalir
        this.buttonExit = new Button(this, 300, 300, 'exitButton', ()=>{this.scene.start("MainMenu");}, ()=>{this.scene.stop("Planta1")}, ()=>{this.scene.stop()}, ()=>{});
    }
    update(){
    }
}