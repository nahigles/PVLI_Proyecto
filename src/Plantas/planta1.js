import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';

export default class Planta1 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta1', "planta2", "mj_plataformas", 'level1', 'tiles', 560);
		//por ahora lo d tiles no tiene sentido
	}

	init(){
		super.init();

	}
    preload(){
		//this.load.image("player", "./assets/images/AjoloteTrajeado.png" );
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.spritesheet('NPCEmilio', './assets/images/Characters/Emilio.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCAurelia', './assets/images/Characters/Aurelia.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCJulia', './assets/images/Characters/Julia.png', {frameWidth: 24, frameHeight: 36})
		this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image('dialogBox', 'assets/images/Hud/dialogBox.png');
		super.preload();
		//background
	//	this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		
    }

    create(){
		super.create();

		// Jugador
		this.explPLYR = new Jugador(this, 100, 50, 'playerAnim');
		this.explPLYR.body.setCollideWorldBounds(true);
		this.cameras.main.setBounds(0,0,800, 180);//ancho  y alto nivel
		this.cameras.main.startFollow(this.explPLYR);
		this.physics.world.setBounds(0,0,800,180);//ancho  y alto nivel
		
		//this.physics.add.collider(this.explPLYR);
		
		this.NPCGroup = this.physics.add.group();
		this.NPCGroup.add(new NPC(this, 100, 50, 'NPCEmilio', 'Emilio'));
		this.NPCGroup.add(new NPC(this, 250, 50, 'NPCAurelia', 'Aurelia'));
		this.NPCGroup.add(new NPC(this, 400, 50, 'NPCJulia', 'Julia'));

		this.scene.launch("UiScene", {
			home: this,
			player: this.explPLYR,
			NPCs: this.NPCGroup
		});
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

	onPause(){
		this.explPLYR.onPauseInput();
	}
}