import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import MJ_Basuras from '../Minijuegos/mj_Basuras.js' ;
import Button from '../UI/Button.js';
export default class Planta2 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta2', "Planta3", 'mj_Basuras', 'level1', 'tiles', 560);
	}

	init(){
		super.init();
	}

    preload(){
		super.preload();
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.image('pauseButton', './assets/images/UI/PauseMenu/pauseButton.png');

    }

    create(){
		super.create();

		this.jugador = new Jugador(this, 100, 50, 'playerAnim');
		this.jugador.body.setCollideWorldBounds(true);
		
		this.pauseButton = new Button(this, 570, 30, 'pauseButton', ()=>{this.scene.launch("PauseMenuPlanta2");}, ()=>{this.scene.pause();}, ()=>{} , ()=>{});
		this.pauseButton.setScrollFactor(0);
        this.pauseButton.setDepth(100);
		this.p = this.input.keyboard.addKey('P');
    }

    update(){
		super.update();
		
		if(this.p.isDown){ 
			this.scene.start('Planta4');
			this.scene.stop();
			console.log("Paso de P2 a P4")
		}	
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}