import Jugador from '../Characters/Jugador.js';

export default class Planta1 extends Phaser.Scene {
	/**
	 * Constructor, deficimos la key que tendrá la escena, nos sirve para los cambios de escena 
	 */
	constructor(){	
		super({ key: 'Planta1' });
	}

	init(){

	}
    preload(){
		this.load.image("player", "./assets/images/AjoloteTrajeado.png" );
    }

    create(){

		// Jugador
		new Jugador(this, 100, 50, 'player');
    }

    update(){

    }
}