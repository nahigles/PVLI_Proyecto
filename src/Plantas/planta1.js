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
		this.load.spritesheet('NPCVictoria', './assets/images/Characters/Victoria.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCAlvaro', './assets/images/Characters/Alvaro.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCAlma', './assets/images/Characters/Alma.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCEmilio', './assets/images/Characters/Emilio.png', {frameWidth: 24, frameHeight: 36})
		this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image('dialogBox', 'assets/images/UI/Dialogs/dialogBoxB.png');
		this.load.image('Player', 'assets/images/UI/Dialogs/faces/Player.png');
		this.load.image('Victoria', 'assets/images/UI/Dialogs/faces/Victoria.png');
		this.load.image('Alvaro', 'assets/images/UI/Dialogs/faces/Alvaro.png');
		this.load.image('Alma', 'assets/images/UI/Dialogs/faces/Alma.png');
		this.load.image('Emilio', 'assets/images/UI/Dialogs/faces/Emilio.png');
		super.preload();
		//background
	//	this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		

		// MAPA PRUEBA 1
		/*this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/example.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');
        this.load.image('tileset_Planta_1_2', './assets/Prueba_Mapa/tileset_elevator.png');
        this.load.image('tileset_Planta_1_3', './assets/Prueba_Mapa/tileset_objects.png');*/

		// MAPA PRUEBA 2
		this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/mapa_prueba_3.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');

    }

    create(){
		super.create();

		this.p = this.input.keyboard.addKey('P');

		// TILEMAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_1', 
			tileWidth: 16, 
			tileHeight: 16,
			width : 100,
			height : 100
		});
		
		
		// tiles
		const tileset1 = this.map.addTilesetImage('tileset_architecture', 'tileset_Planta_1_1');  
		const tileset2 = this.map.addTilesetImage('tileset_elevator', 'tileset_Planta_1_2');  
		const tileset3 = this.map.addTilesetImage('tileset_objects', 'tileset_Planta_1_3');  
		
		// Layers MAPA PRUEBA 1
		/*this.backgroundLayer = this.map.createLayer('BGWall', [tileset1, tileset2, tileset3]);
		this.groundLayer = this.map.createLayer('Architecture', [tileset1, tileset2, tileset3]);
		this.foreground = this.map.createLayer('Elevators', [tileset1, tileset2, tileset3]);*/
		//this.backgroundLayer.resizeWorld();

		// Layers MAPA PRUEBA 2
		this.backgroundLayer = this.map.createLayer('BG Wall', [tileset1, tileset2, tileset3]);
		this.wallLayer = this.map.createLayer('Walls', [tileset1, tileset2, tileset3]);
		// Layers MAPA PRUEBA 3
		this.cubiclesLayer = this.map.createLayer('Cubicles', [tileset2, tileset3]);
		this.elevatorsLayer = this.map.createLayer('Elevators', [tileset2, tileset3]);

		this.wallLayer.setCollisionByExclusion([-1]);
		// Layer objeto

		//Camara
		//this.cameras.main.setBounds(0,0,800, 180);//ancho  y alto nivel
		// Jugador
		//this.jugador = new Jugador(this, 100, 50, 'playerAnim');
		
		
		this.NPCGroup = this.physics.add.group();
		this.NPCGroup.add(new NPC(this, 400, 50, 'NPCVictoria', 'Victoria'));
		this.NPCGroup.add(new NPC(this, 300, 50, 'NPCAlvaro', 'Alvaro'));
		this.NPCGroup.add(new NPC(this, 200, 50, 'NPCAlma', 'Alma'));
		this.NPCGroup.add(new NPC(this, 100, 50, 'NPCEmilio', 'Emilio'));

		/*
		// NPCS POR CAPA DE OBJETOS
		for (const objeto of this.map.getObjectLayer('NPCS').objects) {
			// `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'NPCBase') {
				this.npc = new NPC(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.name);
				this.NPCGroup.add(this.npc);
			}
		}
		*/


		// JUGADOR POR CAPA DE OBJETOS	
		this.jugador = this.map.createFromObjects('Jugador', {
			classType: Jugador,
			id: 2
		})[0];
		console.log(this.jugador);
		console.log("Esto apesta");

		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);
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