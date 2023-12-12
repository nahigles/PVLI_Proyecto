import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPCBase from '../Personajes/NPCBase.js';
import NPC from '../Personajes/NPCBase.js';
import MJ_Plataformas from '../Minijuegos/mj_Plataformas.js' ;
import Button from '../UI/Button.js';

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
		this.load.image('pauseButton', './assets/images/UI/PauseMenu/pauseButton.png');
		//background
	//	this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		

		// IMAGENES TILES 
		this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/tilemap_planta_1_amarilla_2.json');
        this.load.image('tileset_architecture_yellow', 'assets/officeAssets/Architecture/tiles_architecture_yellow.png');
		this.load.image('tileset_door_yellow', 'assets/officeAssets/Doors/tile_door_yellow.png');
        this.load.image('tileset_furniture_yellow', 'assets/officeAssets/Furniture/tiles_furniture_yellow.png');
        this.load.image('tileset_objects_yellow', 'assets/officeAssets/Objects/tiles_objects_yellow.png');
        this.load.image('tileset_objects_grey', 'assets/officeAssets/Objects/tileset_objects.png');
        //this.load.image('tileset_plants_yellow', 'assets/officeAssets/Plants/tiles_plantas_yellow.png');
    }

    create(){
		super.create();

		this.p = this.input.keyboard.addKey('P');
		// BotonPause
		this.pauseButton = new Button(this, 584, 88, 'pauseButton', ()=>{this.scene.launch("PauseMenuMJ");}, ()=>{this.scene.pause();}, ()=>{} ).setScrollFactor(0);
		// TILEMAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_1', 
			tileWidth: 16, 
			tileHeight: 16,
			width : 100,
			height : 100
		});
		
		
		// tiles
		const tileset_architecture = this.map.addTilesetImage('tiles_architecture_yellow', 'tileset_architecture_yellow');  
		const tileset_door = this.map.addTilesetImage('tile_door_yellow', 'tileset_door_yellow');  
		const tileset_furniture = this.map.addTilesetImage('tiles_furniture_yellow', 'tileset_furniture_yellow');  
		const tileset_objects = this.map.addTilesetImage('tiles_objects_yellow', 'tileset_objects_yellow');  
		const tileset_objects_grey = this.map.addTilesetImage('tileset_objects', 'tileset_objects_grey');  
		//const tileset_plants = this.map.addTilesetImage('tiles_plantas_yellow', 'tileset_plants_yellow');  
		
		// Layers 
		this.backgroundLayer = this.map.createLayer('Background', tileset_architecture);
		this.wallLayer = this.map.createLayer('Walls', tileset_architecture);
		this.windowsLayer = this.map.createLayer('Windows', tileset_architecture);
		this.columsLayer = this.map.createLayer('Colums', tileset_architecture);
		this.cubiclesLayer = this.map.createLayer('Cubicles', [tileset_objects, tileset_objects_grey]);
		this.doorLayer = this.map.createLayer('Doors', tileset_door);
		this.objectsLayer = this.map.createLayer('Furniture', [tileset_objects, tileset_furniture, tileset_objects_grey]);
		this.chairsLayer = this.map.createLayer('Chairs', [tileset_objects, tileset_objects_grey]);

		// Colisiones con las paredes
		this.wallLayer.setCollisionByExclusion([-1]);
		
		// NPCS POR CAPA DE OBJETOS
		// Grupo de NPCS
		this.NPCGroup = this.physics.add.group();
		// Bucle de creación
		for (const objeto of this.map.getObjectLayer('NPCS').objects) {
			// `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'NPCBase') {
				this.npc = new NPC(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.name);
				this.NPCGroup.add(this.npc);
				console.log("Esto apesta aa");

			}
		}

		// JUGADOR POR CAPA DE OBJETOS	
		this.jugador = this.map.createFromObjects('Jugador', {
			name: 'Jugador',
			classType: Jugador
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
		
		// Colisiones MAPA 
		this.physics.add.collider(this.jugador, this.wallLayer)
		this.physics.add.collider(this.NPCGroup, this.wallLayer)
       

    }

    update(){
		super.update();
		/*console.log(this.jugador.x);
		console.log(this.jugador.y);
		if(this.p.isDown){ 
			this.scene.start('Planta2');
			this.scene.stop();
			console.log("Paso de P1 a P2")
		}*/
		
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}