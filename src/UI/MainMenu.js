
import Button from './Button.js';
export default class MainMenu extends Phaser.Scene {
	/**
	 * Constructor, deficimos la key que tendrá la escena, nos sirve para los cambios de escena 
	 */
	constructor(){	
		super({ key: 'MainMenu' });
	}
	init(){
	}
    preload(){
		//this.load.image("playButton", "./assets/images/UI/MainMenu/playButton.png" );
        this.load.spritesheet("playButton2", "./assets/images/UI/MainMenu/playButton2.png", {frameWidth: 300, frameHeight: 120});
		
    }
    create(){
		// BotonPlay
		new Button(this, 200, 100, 'playButton').setScale(0.5,0.5);
    }
    update(){
    }

	play(){
		this.scene.start("Planta1");
	}
}