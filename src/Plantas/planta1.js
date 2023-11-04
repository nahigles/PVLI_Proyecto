import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Characters/Jugador.js';

export default class Planta1 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */
	constructor(){	
		super("planta1", "planta2", "mj_plataformas", 'level1', 'tiles', 560);
		//por ahora lo d tiles no tiene sentido
	}

	init(){
		super.init();

	}
    preload(){
		super.preload();
		this.load.image("player", "./assets/images/AjoloteTrajeado.png" );
    }

    create(){
		super.create();
		// Jugador
		new Jugador(this, 100, 50, 'player');
    }

    update(){
		super.update();
    }
}