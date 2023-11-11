import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Characters/Jugador.js';
import NPC from '../Characters/NPCBase.js';

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
		//this.load.image("player", "./assets/images/AjoloteTrajeado.png" );
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.spritesheet('NPCAnim', './assets/images/Characters/Emilio.png', {frameWidth: 24, frameHeight: 36})
    }

    create(){
		super.create();
		// Jugador
		this.explPLYR = new Jugador(this, 100, 50, 'playerAnim');
		this.explNPC = new NPC(this, 100, 50, 'NPCAnim');
		
		this.explPLYR.body.onOverlap = true;
		this.explNPC.body.onOverlap = true;
		this.physics.add.overlap(this.explPLYR, this.explNPC, () => {this.explNPC.diHola()})
    }

    update(){
		super.update();
    }
}