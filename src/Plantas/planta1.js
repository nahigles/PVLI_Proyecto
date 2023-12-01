import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPCBase from '../Personajes/NPCBase.js';
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
		

		// MAPA PRUEBA 1
		/*this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/example.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');
        this.load.image('tileset_Planta_1_2', './assets/Prueba_Mapa/tileset_elevator.png');
        this.load.image('tileset_Planta_1_3', './assets/Prueba_Mapa/tileset_objects.png');*/

		// MAPA PRUEBA 2
		this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/mapa_prueba_3.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');
		this.load.image('tileset_Planta_1_2', './assets/Prueba_Mapa/tileset_elevator.png');
        this.load.image('tileset_Planta_1_3', './assets/Prueba_Mapa/tileset_objects.png');
    }

    create(){
		super.create();

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
		this.backgroundLayer = this.map.createLayer('BG Wall', [tileset1, tileset3]);
		this.wallLayer = this.map.createLayer('Walls', [tileset1, tileset3]);
		// Layers MAPA PRUEBA 3
		this.cubiclesLayer = this.map.createLayer('Cubicles', tileset3);
		this.elevatorsLayer = this.map.createLayer('Elevators', [tileset1, tileset2, tileset3]);

		this.wallLayer.setCollisionByExclusion([-1]);
		// Layer objeto

		// Jugador
		//this.jugador = new Jugador(this, 100, 50, 'playerAnim');
		
		
		this.NPCGroup = this.physics.add.group();
		/*this.NPCGroup.add(new NPC(this, 100, 50, 'NPCEmilio', 'Emilio'));
		this.NPCGroup.add(new NPC(this, 250, 50, 'NPCAurelia', 'Aurelia'));
		this.NPCGroup.add(new NPC(this, 400, 50, 'NPCJulia', 'Julia'));*/

		// NPCS POR CAPA DE OBJETOS
		for (const objeto of this.map.getObjectLayer('NPCS').objects) {
			// `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'NPCBase') {
				this.npc = new NPC(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.name);
				this.NPCGroup.add(this.npc);
			}
		}



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
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}