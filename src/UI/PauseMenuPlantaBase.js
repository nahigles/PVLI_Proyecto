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
        this.load.image('resumeButton2', './assets/images/UI/PauseMenu/resumeButton2.png');
        this.load.image('backgroundPausa', './assets/images/Backgrounds/e7d1ff.png');
        this.load.image('exitButton2', './assets/images/UI/PauseMenu/exitButton2.png');
    }
    create(){
        this.add.image(0,0,'backgroundPausa').setScale(4,4).setOrigin(0,0);  
		// BotonVolverPlanta
		this.resumeButton = new Button(this,300, 150, 'resumeButton2', ()=>{this.scene.resume(this.planta);},  ()=>{this.scene.stop();},  ()=>{}, ()=>{});
        // BotonSalir
        this.buttonExit = new Button(this, 300, 250, 'exitButton2', ()=>{this.scene.start("MainMenu");}, ()=>{this.scene.stop(this.planta)}, ()=>{this.scene.stop()}, ()=>{});
    }
    update(){
    }
}