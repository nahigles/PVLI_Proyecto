import plantaBase from '../escenasBase/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import Ascensor from './ascensor.js';
import NPC from '../Personajes/NPCBase.js';
/**
* Segunda parte planta 4
* Cuando se complete el minijuego se podra subir a la siguiente planta por el ascensor
 */
export default class Planta4_2 extends plantaBase {
	/**
	 * Nivel 4
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
		this.load.spritesheet('NPCConrad', './assets/images/Characters/Conrad.png', {frameWidth: 24, frameHeight: 36})

		// NPS DIALOGO
		this.load.image('Charlotte', 'assets/images/UI/Dialogs/faces/Charlotte.png');
		this.load.image('Inma', 'assets/images/UI/Dialogs/faces/Inma.png');
		this.load.image('Conrad', 'assets/images/UI/Dialogs/faces/Conrad.png');
    }

    create(data){
		super.create();

		// Musica
		this.musica = this.sound.add('plant4Sound');
		this.musica.loop = true;
		this.musica.play();

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
				this.npc  = new NPC(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.name);
				if(objeto.name == 'Inma') this.npc.setFlip(true, false);
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
		this.e = this.input.keyboard.addKey('E');
		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);

		// UISCENE
		this.scene.launch("UiScene", {
			home: this,
			player: this.jugador,
			NPCs: this.NPCGroup,
			insignias: [data.extrovertido, data.introvertido, data.intuitivo, data.sensitivo, data.thinker, data.feeler, data.juzgador, data.perceptivo]
		});	

		// Colisiones MAPA 
		this.physics.add.collider(this.jugador, this.wallLayer);
		this.physics.add.collider(this.NPCGroup, this.wallLayer);

		this.firstTimeConrad = false;
    }
	nextLevel(){
		const subir = this.physics.overlap(this.jugador, this.ascensor); //comprobar si el jugador esta "tocando" el ascensor para poder subir
		if(subir){
			if(this.mjCompletado && this.misionCompletada) {//Si se ha completado la mision y el minijuego puede subir, si no todavia no
				this.ascensor.play('abrir', true);
				
				this.ascensor.once('abierto', function(){
					//cuando haya acabado la animacion
					this.music(false);	
					this.scene.launch('Planta5', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido, 
						sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo, 
						thinker : this.jugador.thinker, feeler : this.jugador.feeler,
						juzgador : this.jugador.juzgador, perceptivo: this.jugador.perceptivo});
   					this.scene.stop();
					this.scene.get("UiScene").removeUI();
				}, this);
			}
		}
	}
    update(){

		super.update();
		if(this.e.isDown){	//subir ascensor
			this.nextLevel();
		}
		if(this.mjCompletado && !this.firstTimeConrad){
			this.scene.get("UiScene").talk();
			this.firstTimeConrad = true;
		}
    }

	onPause(bol){
		this.jugador.onPauseInput(bol);
	}

	startMinijuegoP4()
	{
		this.onPause(true);
		this.scene.launch(this.minijuego);
		this.scene.pause("UiScene");
	}
	resumeP4(){
		this.onPause(false);
	}
}