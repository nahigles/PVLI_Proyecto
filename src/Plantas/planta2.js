import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import MJ_Basuras from '../Minijuegos/mj_Basuras.js' ;
import Button from '../UI/Button.js';
export default class Planta2 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta2', 'Planta3', 'mj_Basuras', 'level1', 'tiles', 560);

		this.claveNum = ["1", "3", "8"];
	}

	init(){
		super.init();
	}

    preload(){
		super.preload();
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.image('pauseButton', './assets/images/UI/PauseMenu/pauseButton.png');

		// IMAGENES MAPA
		this.load.tilemapTiledJSON('tilemap_Planta_2', './assets/Prueba_Mapa/mapa_planta_2_verde.json');
        this.load.image('tileset_architecture_green', 'assets/officeAssets/Architecture/tiles_architecture_green.png');
        this.load.image('tileset_furniture_green', 'assets/officeAssets/Furniture/tiles_furniture_green.png');
        this.load.image('tileset_objects_green', 'assets/officeAssets/Objects/tiles_objects_green.png');
    }

    create(){
		super.create();

		// TILEMAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_2', 
			tileWidth: 16, 
			tileHeight: 16,
			width : 100,
			height : 100
		});
		
		// tiles
		const tileset_architecture = this.map.addTilesetImage('tiles_architecture_green', 'tileset_architecture_green');  
		const tileset_furniture = this.map.addTilesetImage('tiles_furniture_green', 'tileset_furniture_green');  
		const tileset_objects = this.map.addTilesetImage('tiles_objects_green', 'tileset_objects_green');  
		//const tileset_plants = this.map.addTilesetImage('tiles_plantas_yellow', 'tileset_plants_yellow');  
		
		// Layers 
		this.backgroundLayer = this.map.createLayer('Background', tileset_architecture);
		this.wallLayer = this.map.createLayer('Walls', tileset_architecture);
		this.windowsLayer = this.map.createLayer('Windows', tileset_architecture);
		this.columsLayer = this.map.createLayer('Colums', tileset_architecture);
		this.objectsLayer = this.map.createLayer('Furniture', [tileset_objects, tileset_furniture]);
		this.PCLayer = this.map.createLayer('PC', [tileset_objects]);
		this.chairsLayer = this.map.createLayer('Chairs', [tileset_objects]);

		// Colisiones con las paredes
		this.wallLayer.setCollisionByExclusion([-1]);

		// JUGADOR POR CAPA DE OBJETOS	
		this.jugador = this.map.createFromObjects('Jugador', {
			name: 'Jugador',
			classType: Jugador
		})[0];

		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);

		// Colisiones MAPA 
		this.physics.add.collider(this.jugador, this.wallLayer);
		//this.physics.add.collider(this.NPCGroup, this.wallLayer);
		
		this.pauseButton = new Button(this, 570, 30, 'pauseButton', ()=>{this.scene.launch("PauseMenuPlanta2");}, ()=>{this.scene.pause();}, ()=>{} , ()=>{});
		this.pauseButton.setScrollFactor(0);
        this.pauseButton.setDepth(100);
		this.p = this.input.keyboard.addKey('P');
		this.i = this.input.keyboard.addKey('I'); // tecla prueba para mision planta 2
    }

    update(t,dt){
		super.update(t,dt);
		
		if(this.p.isDown){ 
			this.scene.start('Planta3');
			this.scene.stop();
		}
		if(this.i.isDown){
			this.scene.start('puertaSecreta');
			this.scene.stop();
		}	
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}