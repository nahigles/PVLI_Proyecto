import plantaBase from '../escenas/plantaBase.js';
//import Jugador from '../Personajes/jugador.js';

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
		//background
	//	this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		
    }

    create(){
		super.create();
		/*//background
		// Jugador
		this.jugador = new Jugador(this, 100, 50, 'playerAnim');
		//this.jugador.setCollideWorldBounds(true);
		this.cameras.main.setBounds(0,0,600, 180);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		//this.cameras.main.startFollow(this.jugador, true, 0.08, 0.08);
		//this.physics.world.setBounds(0,0,600,180);//ancho  y alto nivel
		//this.physics.add.collider(this.jugador);*/
    }

    update(){
		super.update();
    }
}