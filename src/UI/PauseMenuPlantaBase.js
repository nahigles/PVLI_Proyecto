import Button from './Button.js';
export default class PauseMenuPlantaBase extends Phaser.Scene {
	 /**
     * Constructora
     * @param {string} planta
     * definimos la key que tendrá la escena, nos sirve para los cambios de escena 
     */
     constructor(planta, key) {
        super({key: key});
        this.planta = planta;
        this.self = this;
	}
	init(){
	}
    preload(){
        this.load.image('resumeButton', './assets/images/UI/PauseMenu/resumeButton2.png');
        this.load.image('background', './assets/images/Backgrounds/fondonegro.png');
        this.load.image('exitButton', './assets/images/UI/PauseMenu/exitButton2.png');
    }
    create(){
        this.add.image(0,0,'background').setScale(2,2);  
		// BotonVolverPlanta
		this.resumeButton = new Button(this,300, 150, 'resumeButton', ()=>{this.scene.resume(this.planta);},  ()=>{this.scene.stop();},  ()=>{}, ()=>{});
        // BotonSalir
        this.buttonExit = new Button(this, 300, 250, 'exitButton', ()=>{this.scene.start("MainMenu");}, ()=>{this.scene.stop(this.planta)}, ()=>{this.scene.stop()}, ()=>{});
    }
    update(){
    }
}