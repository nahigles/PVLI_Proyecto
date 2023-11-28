import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import MJ_Basuras from '../Minijuegos/mj_Basuras.js' ;

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


    }

    create(){
		super.create();

		this.jugador = new Jugador(this, 100, 50, 'playerAnim');
		this.jugador.body.setCollideWorldBounds(true);

		this.m = this.input.keyboard.addKey('K');
		
    }

    update(){
		super.update();

		if(this.m.isDown){ 
            this.scene.start("mj_Basuras"); // Pasamos al minijuego
		}
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}