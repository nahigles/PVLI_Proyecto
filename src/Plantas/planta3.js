import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import Ascensor from './ascensor.js';
export default class Planta3 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta3', 'Planta4', 'mj_Carpetas', 'level1', 'tiles', 560);
	}

	init(){
		super.init();
	}

    preload(){
		super.preload();
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.image('pauseButton', './assets/images/UI/PauseMenu/pauseButton.png');

		// IMAGENES MAPA
		this.load.tilemapTiledJSON('tilemap_Planta_3', './assets/Prueba_Mapa/mapa_planta_3_azul.json');
        this.load.image('tileset_architecture_blue', 'assets/officeAssets/Architecture/tiles_architecture_blue.png');
        this.load.image('tileset_furniture_blue', 'assets/officeAssets/Furniture/tiles_furniture_blue.png');
        this.load.image('tileset_objects_blue', 'assets/officeAssets/Objects/tiles_objects_blue.png');

		// NPCS
		this.load.spritesheet('NPCLola', './assets/images/Characters/Lola.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCFede', './assets/images/Characters/Fede.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCJesus', './assets/images/Characters/Jesus.png', {frameWidth: 24, frameHeight: 36})

		// NPS DIALOGO
		this.load.image('Lola', 'assets/images/UI/Dialogs/faces/Lola.png');
		this.load.image('Fede', 'assets/images/UI/Dialogs/faces/Fede.png');
		this.load.image('Jesus', 'assets/images/UI/Dialogs/faces/Jesus.png');
    }

    create(data){
		super.create();

		// TILEMAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_3', 
			tileWidth: 16, 
			tileHeight: 16,
			width : 100,
			height : 100
		});
		
		// tiles
		const tileset_architecture = this.map.addTilesetImage('tiles_architecture_blue', 'tileset_architecture_blue');  
		const tileset_furniture = this.map.addTilesetImage('tiles_furniture_blue', 'tileset_furniture_blue');  
		const tileset_objects = this.map.addTilesetImage('tiles_objects_blue', 'tileset_objects_blue');  
		//const tileset_plants = this.map.addTilesetImage('tiles_plantas_yellow', 'tileset_plants_yellow');  
		
		// Layers 
		this.backgroundLayer = this.map.createLayer('Background', tileset_architecture);
		this.wallLayer = this.map.createLayer('Walls', tileset_architecture);
		this.windowsLayer = this.map.createLayer('Windows', tileset_architecture);
		this.objectsLayer = this.map.createLayer('Furniture', [tileset_objects, tileset_furniture]);
		this.objectsLayer2 = this.map.createLayer('Furniture2', [tileset_objects, tileset_furniture]);
		this.pizarraLayer = this.map.createLayer('Pizarra', [tileset_objects]);
		this.pizarraLayer2 = this.map.createLayer('Pizarra2', [tileset_objects]);
		this.pizarraLayer3 = this.map.createLayer('Pizarra3', [tileset_objects]);
		this.chairsLayer = this.map.createLayer('Chairs', [tileset_objects]);

		// Colisiones con las paredes
		this.wallLayer.setCollisionByExclusion([-1]);
		//Ascensor
		this.ascensor = new Ascensor(this, 750 , 88, 'ascensorAnim' );

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
		this.e = this.input.keyboard.addKey('E');
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
				
				this.ascensor.once('abierto', function(){
					//cuando haya acabado la animacion
					this.scene.start('Planta4', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido, 
						sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo, 
						thinker : this.jugador.thinker, feeler : this.jugador.feeler});
   					this.scene.stop();
					this.scene.get("UiScene").removeUI();
				}, this);
			}
			else{
				console.log("todavia no puedes subir");
			}
		}
	}
    update(){
		super.update();
		if(this.e.isDown){	//subir ascensor
			this.nextLevel();
		}
		if(this.p.isDown){ 
			this.scene.get("UiScene").removeUI();
			this.scene.start('Planta4', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido, 
										sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo, 
										thinker : this.jugador.thinker, feeler : this.jugador.feeler});
			this.scene.stop();
			console.log("Paso de P3 a P4")
		}	
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}