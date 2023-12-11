
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
        this.load.image('controlsButton', './assets/images/UI/PauseMenu/controlsButton.png');
        this.load.image('controlsMenu', './assets/images/UI/PauseMenu/controles.png');
        this.load.image('backButton', './assets/images/UI/PauseMenu/backButton.png')
    }
    create(){
        this.add.image(0,0,'backgroundPausa').setScale(4,4).setOrigin(0,0);  
        
		// BotonVolverMinijuego
		new Button(this,300, 105, 'resumeButton', ()=>{this.scene.resume(this.actual);},  ()=>{this.scene.stop();},  ()=>{}, ()=>{});
        //Controles
        new Button(this, 300, 200, 'controlsButton', ()=>{ this.controlsMenu.setVisible(true); },   ()=>{ this.backButton.setVisible(true);}, ()=>{}, ()=>{});
        // BotonSalir
        new Button(this, 300, 300, 'exitButton', ()=>{this.scene.start("MainMenu");}, ()=>{this.scene.stop(this.actual);},()=>{this.scene.stop(this.other);}, ()=>{this.scene.stop();});

        //menu controles
        this.controlsMenu = this.add.image(0,0,'controlsMenu').setOrigin(0,0).setVisible(false);
        //boton volver menu pausa
        this.backButton = new Button(this, 35, 20, 'backButton', ()=>{this.controlsMenu.setVisible(false);}, ()=>{ this.backButton.setVisible(false);},()=>{}, ()=>{});
        this.backButton.setScale(0.15, 0.15);
        this.backButton.setVisible(false);
    }
    update(){
    }
}