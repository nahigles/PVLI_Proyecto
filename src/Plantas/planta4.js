import plantaBase from '../escenasBase/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import PurpleKey from '../Misiones/purpleKey.js'
import LockedDoor from '../Misiones/lockedDoor.js'

export default class Planta4 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta4', 'Planta4_2', 'mj_Nave', 'level1', 'tiles', 560);
		
	}

	init(){
		super.init();
		this.contGolpes = 0;
		this.maxGolpes = 20;
		this.puertaAbierta = false;
		this.keyCatched = false;
	}

    preload(){
        super.preload();
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});

		// IMAGENES MAPA
		this.load.tilemapTiledJSON('tilemap_Planta_4_1', './assets/Prueba_Mapa/mapa_planta_4_1_purple.json');
        this.load.image('tileset_architecture_purple', 'assets/officeAssets/Architecture/tiles_architecture_purple.png');
        this.load.image('tileset_furniture_purple', 'assets/officeAssets/Furniture/tiles_furniture_purple.png');
        this.load.image('tileset_objects_purple', 'assets/officeAssets/Objects/tiles_objects_purple.png');
        this.load.image('tileset_door_purple', 'assets/officeAssets/Doors/tile_door_purple.png');

		// NPCS
		this.load.spritesheet('NPCArchie', './assets/images/Characters/Archie.png', {frameWidth: 24, frameHeight: 36})

		// NPS DIALOGO
		this.load.image('Archie', 'assets/images/UI/Dialogs/faces/Archie.png');

		// LOCKED DOOR AND KEY
		this.load.image('Locked_door', 'assets/officeAssets/Doors/locked_door_purple.png');
		this.load.image('purple_key', 'assets/images/Objetos/purple_key.png');
    }

    create(data){
		super.create();

		// Musica
		this.musica = this.sound.add('plant4Sound');
		this.musica.loop = true;
		this.musica.play();

		// TILEMAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_4_1', 
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

		// Layers 
		this.backgroundLayer = this.map.createLayer('Background', tileset_architecture);
		this.wallLayer = this.map.createLayer('Walls', tileset_architecture);
		this.windowsLayer = this.map.createLayer('Windows', tileset_architecture);
		this.objectsLayer = this.map.createLayer('Furniture', [tileset_objects, tileset_furniture]);
		this.chairsLayer = this.map.createLayer('Chairs', [tileset_objects]);
		this.doorLayer = this.map.createLayer('Door', [tileset_door]);

		// Colisiones con las paredes
		this.wallLayer.setCollisionByExclusion([-1]);

		// MISION
		// Puerta
		for (const objeto of this.map.getObjectLayer('Door').objects) {
			
			this.locked_door = new LockedDoor(this, objeto.x, objeto.y, 'Locked_door');
		}

		// Llave
		for (const objeto of this.map.getObjectLayer('Key').objects) {
			
			this.key_door = new PurpleKey(this, objeto.x, objeto.y, 'purple_key');
		}
		
		
		this.locked_door.on('pointerdown', () =>
		{
			this.contGolpes++;
		});

		// Grupo de NPCS
		this.NPCGroup = this.physics.add.group();
		// NPCS POR CAPA DE OBJETOS
		// Bucle de creación
		for (const objeto of this.map.getObjectLayer('NPCS').objects) {
			// `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'NPCBase') {
				this.npc  = new NPC(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.name);
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

		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);

		// UISCENE
		this.scene.launch("UiScene", {
			home: this,
			player: this.jugador,
			NPCs: this.NPCGroup,
			insignias: [data.extrovertido, data.introvertido, data.intuitivo, data.sensitivo, data.thinker, data.feeler, false, false]
		});	
		this.scene.get("UiScene").actions("BotonExit");

		// Colisiones MAPA 
		this.physics.add.collider(this.jugador, this.wallLayer);
		this.physics.add.collider(this.NPCGroup, this.wallLayer);

		this.e = this.input.keyboard.addKey('E');
		
    }
	jugadorJuzgador(){
		this.jugador.juzgador = true;
	}
	jugadorPerceptivo(){
		this.jugador.perceptivo = true;
	}
    update(){
		
		super.update();
		
		// MISION
		// Cogemos la llave
		if(this.physics.overlap(this.jugador, this.key_door) && this.e.isDown){	
			this.key_door.visible = false;
			this.keyCatched = this.key_door.catch = true;
		}

		if(!this.puertaAbierta){ //si esta cerrada comprobamos si la abren
			if ((this.keyCatched && this.physics.overlap(this.jugador, this.locked_door) && this.e.isDown) // Si hemos cogido la llave e interactuamos con la puerta
			|| (this.contGolpes >= this.maxGolpes)){ // Cuando hayamos golpeado la puerta suficientes veces
				this.misionCompleta();
				this.puertaAbierta = true;
				this.scene.get("UiScene").removeUI();
				setTimeout(()=>{
					this.music(false);
					this.scene.launch("Planta4_2", {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido, 
						sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo, 
						thinker : this.jugador.thinker, feeler : this.jugador.feeler,
						juzgador : this.jugador.juzgador, perceptivo: this.jugador.perceptivo}); //volvemos a planta
					this.scene.stop();
				},1000);		
			}
		}
    }

	onPause(bol){
		this.jugador.onPauseInput(bol);
	}
}