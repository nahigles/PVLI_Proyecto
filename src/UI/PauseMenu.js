
import Button from './Button.js';
export default class PauseMenu extends Phaser.Scene {
     /**
     * Constructora
     * @param {string} levelActual //planta o minijuego 
     * @param {string} otherLevel  //planta o minijuego
     * definimos la key que tendrá la escena, nos sirve para los cambios de escena 
     */
     constructor(levelActual, otherLevel, key) {
        super({key: key});
        this.actual = levelActual;
        this.other = otherLevel;
        this.self = this;
    }
	init(){
	}
    preload(){
        this.load.image('resumeButton', './assets/images/UI/PauseMenu/resumeButton2.png');
        this.load.image('backgroundPausa', './assets/images/Backgrounds/e7d1ff.png');
        this.load.image('exitButton', './assets/images/UI/PauseMenu/exitButton2.png');
    }
    create(){
        this.add.image(0,0,'backgroundPausa').setScale(4,4).setOrigin(0,0);  
		// BotonVolverMinijuego
		this.resumeButton = new Button(this,300, 105, 'resumeButton', ()=>{this.scene.resume(this.actual);},  ()=>{this.scene.stop();},  ()=>{}, ()=>{});
        //Controles
        //this.officeButton = new Button(this, 300, 200, 'officeButton', ()=>{this.scene.resume(this.planta);},   ()=>{this.scene.stop(this.minijuego);}, ()=>{this.scene.stop();}, ()=>{});
        // BotonSalir
        this.buttonExit = new Button(this, 300, 300, 'exitButton', ()=>{this.scene.start("MainMenu");}, ()=>{this.scene.stop(this.actual);},()=>{this.scene.stop(this.other);}, ()=>{this.scene.stop();});
    }
    update(){
    }
}