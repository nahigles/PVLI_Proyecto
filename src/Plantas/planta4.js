import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';

export default class Planta1 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta4', "planta5", 'mj_Nave', 'level1', 'tiles', 560);
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
    }

    update(){

		super.update();
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}