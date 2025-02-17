
import Button from './Button.js';
/**
 * Escena de menu de pausa
 * Incluye un boton para volver a la escena anterior, otro para ver los controles y otro  para salir
 */
export default class PauseMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "PauseMenu"
        });
    }

	init(){
	}

    preload(){
        this.load.image('resumeButton', './assets/images/UI/PauseMenu/resumeButton2.png');
        this.load.image('backgroundPausa', './assets/images/Backgrounds/e7d1ff.png');
        this.load.image('exitButton', './assets/images/UI/PauseMenu/exitButton2.png');
        this.load.image('controlsButton', './assets/images/UI/PauseMenu/controlsButton.png');
        this.load.image('controlsMenu', './assets/images/UI/PauseMenu/controles.png');
        this.load.image('backButton', './assets/images/UI/PauseMenu/backButton.png');
        this.load.image('backButton', './assets/images/UI/PauseMenu/backButton.png');
        this.load.image('backgroundHome', './assets/images/Backgrounds/bg_home.png');
    }

    create(data){
        this.ButtonSoundd = this.sound.add('buttonSound');
        this.level = data.level;
        this.other = data.other;
        this.pauseBg = this.add.image(0,0,'backgroundPausa').setScale(4,4).setOrigin(0,0);
		// BotonVolverMinijuego
		new Button(this,300, 105, 'resumeButton', ()=>{
            this.scene.resume(this.level);
             this.scene.get(this.level).music(true);
             this.scene.stop();
            }, this.ButtonSoundd);
        //Controles
        new Button(this, 300, 200, 'controlsButton', ()=>{ 
            this.controlsMenu.setVisible(true); 
            this.backButton.setVisible(true);
        }, this.ButtonSoundd);
        // BotonSalir
        new Button(this, 300, 300, 'exitButton', ()=>{
            this.goHome();
            this.scene.pause();
        }, this.ButtonSoundd);

        //menu controles
        this.controlsMenu = this.add.image(0,0,'controlsMenu').setOrigin(0,0).setVisible(false);
        //boton volver menu pausa
        this.backButton = new Button(this, 35, 20, 'backButton', ()=>{
            this.controlsMenu.setVisible(false);
            this.backButton.setVisible(false);
        },  this.ButtonSoundd);
        this.backButton.setScale(0.15, 0.15);
        this.backButton.setVisible(false);
         //imagen calle irse casa
         this.homeBg = this.add.image(0, 0, 'backgroundHome').setOrigin(0,0).setScale(3.8,3.8);
         this.homeBg.visible = false;
    }

    update(){
    }

    goHome(){
        
        this.scene.get("UiScene").removeUI();
        this.homeBg.visible = true;
        setTimeout(()=>{
            this.scene.start("MainMenu");
            this.scene.stop(this.level);
            this.scene.stop(this.other);
            this.scene.stop();
        },2000);
    }
}