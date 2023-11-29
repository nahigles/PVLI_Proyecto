import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import MJ_Plataformas from '../Minijuegos/mj_Plataformas.js' ;

export default class Planta1 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta1', "planta2", 'mj_Plataformas', 'level1', 'tiles', 560);

		
	}

	init(){
		super.init();

	}
    preload(){
		super.preload();
		//this.load.image("player", "./assets/images/AjoloteTrajeado.png" );
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.spritesheet('NPCEmilio', './assets/images/Characters/Emilio.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCAurelia', './assets/images/Characters/Aurelia.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCJulia', './assets/images/Characters/Julia.png', {frameWidth: 24, frameHeight: 36})
		this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image('dialogBox', 'assets/images/Hud/dialogBox.png');
		//background
	//	this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		

		// MAPA PRUEBA 1
		/*this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/example.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');
        this.load.image('tileset_Planta_1_2', './assets/Prueba_Mapa/tileset_elevator.png');
        this.load.image('tileset_Planta_1_3', './assets/Prueba_Mapa/tileset_objects.png');*/

		// MAPA PRUEBA 2
		this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/mapa_prueba_2.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');

    }

    create(){
		super.create();

		this.p = this.input.keyboard.addKey('P');

		// TILEMAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_1', 
			tileWidth: 16, 
			tileHeight: 16
		});
		
		
		// tiles
		const tileset1 = this.map.addTilesetImage('tileset_architecture', 'tileset_Planta_1_1');  
		/*const tileset2 = this.map.addTilesetImage('tileset_elevator', 'tileset_Planta_1_2');  
		const tileset3 = this.map.addTilesetImage('tileset_objects', 'tileset_Planta_1_3');  */
		
		// Layers MAPA PRUEBA 1
		/*this.backgroundLayer = this.map.createLayer('BGWall', [tileset1, tileset2, tileset3]);
		this.groundLayer = this.map.createLayer('Architecture', [tileset1, tileset2, tileset3]);
		this.foreground = this.map.createLayer('Elevators', [tileset1, tileset2, tileset3]);*/
		//this.backgroundLayer.resizeWorld();

		// Layers MAPA PRUEBA 2
		this.backgroundLayer = this.map.createLayer('Fondo', tileset1);
		this.wallLayer = this.map.createLayer('Paredes', tileset1);
		this.wallLayer.setCollisionByExclusion([-1]);

		//Camara
		//this.cameras.main.setBounds(0,0,800, 180);//ancho  y alto nivel
		// Jugador
		this.jugador = new Jugador(this, 100, 50, 'playerAnim');
		this.jugador.body.setCollideWorldBounds(true);
		//Camara
		this.cameras.main.setBounds(0,0,800, 180);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		//this.physics.world.setBounds(0,0,800,180);//ancho  y alto nivel
		
		//this.physics.add.collider(this.explPLYR);
		
		this.NPCGroup = this.physics.add.group();
		this.NPCGroup.add(new NPC(this, 100, 50, 'NPCEmilio', 'Emilio'));
		this.NPCGroup.add(new NPC(this, 250, 50, 'NPCAurelia', 'Aurelia'));
		this.NPCGroup.add(new NPC(this, 400, 50, 'NPCJulia', 'Julia'));
		this.scene.launch("UiScene", {
			home: this,
			player: this.jugador,
			NPCs: this.NPCGroup
		});
		
		// Colisiones MAPA PRUEBA 2
		this.physics.add.collider(this.jugador, this.wallLayer)
		this.physics.add.collider(this.NPCGroup, this.wallLayer)
		

    }

    update(){
		super.update();

		if(this.p.isDown){ 
			this.scene.start('Planta2');
			this.scene.stop();
			console.log("Paso de P1 a P2")
		}
		
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}