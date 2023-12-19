import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';

export default class Planta5 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta5', 'Planta1', 'mj_Nave', 'level1', 'tiles', 560);
	}

	init(){
		super.init();
	}

    preload(){
        super.preload();
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});

		// IMAGENES MAPA
		this.load.tilemapTiledJSON('tilemap_Planta_5', './assets/Prueba_Mapa/mapa_planta_jefe.json');
        this.load.image('tileset_architecture_blue', 'assets/officeAssets/Architecture/tiles_architecture_blue.png');
        this.load.image('tileset_architecture_purple', 'assets/officeAssets/Architecture/tiles_architecture_purple.png');
        this.load.image('tileset_architecture_green', 'assets/officeAssets/Architecture/tiles_architecture_green.png');
        this.load.image('tileset_furniture_yellow', 'assets/officeAssets/Furniture/tiles_furniture_yellow.png');
        this.load.image('tileset_furniture_purple', 'assets/officeAssets/Furniture/tiles_furniture_purple.png');
        this.load.image('tileset_furniture_blue', 'assets/officeAssets/Furniture/tiles_furniture_blue.png');
        this.load.image('tileset_furniture_green', 'assets/officeAssets/Furniture/tiles_furniture_green.png');
        this.load.image('tileset_objects_yellow', 'assets/officeAssets/Objects/tiles_objects_yellow.png');
        this.load.image('tileset_objects_green', 'assets/officeAssets/Objects/tiles_objects_green.png');
        this.load.image('tileset_objects_purple', 'assets/officeAssets/Objects/tiles_objects_purple.png');
        this.load.image('tileset_objects_blue', 'assets/officeAssets/Objects/tiles_objects_blue.png');
    }

    create(data){
		super.create();

		// TILEMAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_5', 
			tileWidth: 16, 
			tileHeight: 16,
			width : 100,
			height : 100
		});
		
		// tiles
		const tileset_architecture_purple = this.map.addTilesetImage('tiles_architecture_purple', 'tileset_architecture_purple');  
		const tileset_architecture_blue = this.map.addTilesetImage('tiles_architecture_blue', 'tileset_architecture_blue');  
		const tileset_furniture_purple = this.map.addTilesetImage('tiles_furniture_purple', 'tileset_furniture_purple');  
		const tileset_furniture_yellow = this.map.addTilesetImage('tiles_furniture_yellow', 'tileset_furniture_yellow');  
		const tileset_furniture_blue = this.map.addTilesetImage('tiles_furniture_blue', 'tileset_furniture_blue');  
		const tileset_furniture_green = this.map.addTilesetImage('tiles_furniture_green', 'tileset_furniture_green');  
		const tileset_objects_purple = this.map.addTilesetImage('tiles_objects_purple', 'tileset_objects_purple');  
		const tileset_objects_green = this.map.addTilesetImage('tiles_objects_green', 'tileset_objects_green');  
		const tileset_objects_yellow = this.map.addTilesetImage('tiles_objects_yellow', 'tileset_objects_yellow');  
		const tileset_objects_blue = this.map.addTilesetImage('tiles_objects_blue', 'tileset_objects_blue');  
		//const tileset_plants = this.map.addTilesetImage('tiles_plantas_yellow', 'tileset_plants_yellow');  
		
		// Layers 
		this.backgroundLayer = this.map.createLayer('Background', [tileset_architecture_blue, tileset_architecture_purple]);
		this.wallLayer = this.map.createLayer('Walls', tileset_architecture_purple);
		this.windowsLayer = this.map.createLayer('Windows', tileset_architecture_blue);
		this.objectsLayer2 = this.map.createLayer('Furniture2', [tileset_objects_blue, tileset_furniture_blue, tileset_objects_green, tileset_furniture_green, tileset_objects_purple, tileset_furniture_purple, tileset_objects_yellow, tileset_furniture_yellow]);
		this.objectsLayer = this.map.createLayer('Furniture', [tileset_objects_blue, tileset_furniture_blue, tileset_objects_green, tileset_furniture_green, tileset_objects_purple, tileset_furniture_purple, tileset_objects_yellow, tileset_furniture_yellow]);
		this.chairsLayer = this.map.createLayer('Chairs', [tileset_objects_blue, tileset_objects_green, tileset_objects_purple, tileset_objects_yellow]);

		// Colisiones con las paredes
		this.wallLayer.setCollisionByExclusion([-1]);

		// Grupo de NPCS
		this.NPCGroup = this.physics.add.group();
		// NPCS POR CAPA DE OBJETOS
		// Bucle de creación
		for (const objeto of this.map.getObjectLayer('NPCS').objects) {
			// `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'NPCBase') {
				console.log('creado npc planta 2');
				this.npc  = new NPC(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.name);
				if(objeto.name == 'Lola' || objeto.name == 'Jesus') this.npc.setFlip(true, false);
				console.log(this.npc.x, this.npc.y);
				this.NPCGroup.add(this.npc);
			}
		}
		
		// JUGADOR POR CAPA DE OBJETOS	
		this.jugador = this.map.createFromObjects('Jugador', {
			name: 'Jugador',
			classType: Jugador
		})[0];
		this.jugador.introvertido = data.introvertido;
		this.jugador.extrovertido = data.extrovertido;
		this.jugador.intuitivo = data.intuitivo;
		this.jugador.sensitivo = data.sensitivo;
		this.jugador.thinker = data.thinker;
		this.jugador.feeler = data.feeler;
		this.jugador.juzgador = data.juzgador;
		this.jugador.perceptivo = data.perceptivo;
		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);

		// Colisiones MAPA 
		this.physics.add.collider(this.jugador, this.wallLayer);
		this.physics.add.collider(this.NPCGroup, this.wallLayer);

		this.p = this.input.keyboard.addKey('P');
    }

    update(){

		super.update();

		if(this.p.isDown){ 
			this.scene.start('Planta1');
			this.scene.stop();
			console.log("Paso de P5 a P1")
		}	
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}