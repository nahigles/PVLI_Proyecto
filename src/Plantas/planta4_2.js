import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import Ascensor from './ascensor.js';
import NPC from '../Personajes/NPCBase.js';

export default class Planta4_2 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta4_2', 'Planta5', 'mj_Nave', 'level1', 'tiles', 560);
	}

	init(){
		super.init();
	}

    preload(){
        super.preload();
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});

		// IMAGENES MAPA
		this.load.tilemapTiledJSON('tilemap_Planta_4_2', './assets/Prueba_Mapa/mapa_planta_4_2_purple.json');
        this.load.image('tileset_architecture_purple', 'assets/officeAssets/Architecture/tiles_architecture_purple.png');
        this.load.image('tileset_furniture_purple', 'assets/officeAssets/Furniture/tiles_furniture_purple.png');
        this.load.image('tileset_objects_purple', 'assets/officeAssets/Objects/tiles_objects_purple.png');
        this.load.image('tileset_door_purple', 'assets/officeAssets/Doors/tile_door_purple.png');

		// NPCS
		this.load.spritesheet('NPCCharlotte', './assets/images/Characters/Charlotte.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCInma', './assets/images/Characters/Inma.png', {frameWidth: 24, frameHeight: 36})

		// NPS DIALOGO
		this.load.image('Charlotte', 'assets/images/UI/Dialogs/faces/Charlotte.png');
		this.load.image('Inma', 'assets/images/UI/Dialogs/faces/Inma.png');
    }

    create(data){
		super.create();

		// TILEMAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_4_2', 
			tileWidth: 16, 
			tileHeight: 16,
			width : 100,
			height : 100
		});
		
		// tiles
		const tileset_architecture = this.map.addTilesetImage('tiles_architecture_purple', 'tileset_architecture_purple');  
		const tileset_furniture = this.map.addTilesetImage('tiles_furniture_purple', 'tileset_furniture_purple');  
		const tileset_objects = this.map.addTilesetImage('tiles_objects_purple', 'tileset_objects_purple');  
		const tileset_door = this.map.addTilesetImage('tile_door_purple', 'tileset_door_purple');  
		//const tileset_plants = this.map.addTilesetImage('tiles_plantas_yellow', 'tileset_plants_yellow');  
		
		// Layers 
		this.backgroundLayer = this.map.createLayer('Background', tileset_architecture);
		this.wallLayer = this.map.createLayer('Walls', tileset_architecture);
		this.windowsLayer = this.map.createLayer('Windows', tileset_architecture);
		this.chairsLayer2 = this.map.createLayer('Chairs2', [tileset_objects]);
		this.objectsLayer2 = this.map.createLayer('Furniture2', [tileset_objects, tileset_furniture]);
		this.objectsLayer = this.map.createLayer('Furniture', [tileset_objects, tileset_furniture]);
		this.chairsLayer = this.map.createLayer('Chairs', [tileset_objects]);
		this.doorLayer = this.map.createLayer('Door', [tileset_door]);

		// Colisiones con las paredes
		this.wallLayer.setCollisionByExclusion([-1]);
		//Ascensor
		this.ascensor = new Ascensor(this, 50 , 88, 'ascensorAnim' );

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
				if(objeto.name == 'Inma') this.npc.setFlip(true, false);
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
		//this.e = this.input.keyboard.addKey('E');
		this.w = this.input.keyboard.addKey('W');
		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);

		// UISCENE
		this.scene.launch("UiScene", {
			home: this,
			player: this.jugador,
			NPCs: this.NPCGroup
		});	

		// Colisiones MAPA 
		this.physics.add.collider(this.jugador, this.wallLayer);
		this.physics.add.collider(this.NPCGroup, this.wallLayer);

		this.p = this.input.keyboard.addKey('P');
    }
	nextLevel(){
		const subir = this.physics.overlap(this.jugador, this.ascensor); //comprobar si el jugador esta "tocando" el ascensor para poder subir
		if(subir){
			if(this.mjCompletado && this.misionCompletada) {//Si se ha completado la mision y el minijuego puede subir, si no todavia no
				console.log("puedes subir");
				this.ascensor.play('abrir', true);
				//setTimeout(()=>{
					
			this.scene.get("UiScene").removeUI();
					this.scene.start('Planta5', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido, 
						sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo, 
						thinker : this.jugador.thinker, feeler : this.jugador.feeler,
						juzgador : this.jugador.juzgador, perceptivo: this.jugador.perceptivo});
					this.scene.stop();
				//},2000);
			}
			else{
				console.log("todavia no puedes subir");
			}
		}
	}
    update(){

		super.update();
		if(this.w.isDown){	//subir ascensor
			this.nextLevel();
		}
		if(this.p.isDown){ 
			
			this.scene.get("UiScene").removeUI();
			this.scene.start('Planta5', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido, 
				sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo, 
				thinker : this.jugador.thinker, feeler : this.jugador.feeler,
				juzgador : this.jugador.juzgador, perceptivo: this.jugador.perceptivo});
			this.scene.stop();
			console.log("Paso de P4_2 a P5")
		}	
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}