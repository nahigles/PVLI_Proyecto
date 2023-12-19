import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import Ascensor from './ascensor.js';
export default class Planta2 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta2', 'Planta3', 'mj_Basuras', 'level1', 'tiles', 560);
		this.claveNum = ["0", "4", "7"];
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

		// NPCS
		this.load.spritesheet('NPCAndrea', './assets/images/Characters/Andrea.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCPedro', './assets/images/Characters/Pedro.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCMelisa', './assets/images/Characters/Melisa.png', {frameWidth: 24, frameHeight: 36})

		// NPS DIALOGO
		this.load.image('Andrea', 'assets/images/UI/Dialogs/faces/Andrea.png');
		this.load.image('Pedro', 'assets/images/UI/Dialogs/faces/Pedro.png');
		this.load.image('Melisa', 'assets/images/UI/Dialogs/faces/Melisa.png');
	}

    create(data){
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
				//if(objeto.name == 'Emilio' || objeto.name == 'Victoria') this.npc.setFlip(true, false);
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
		//this.e = this.input.keyboard.addKey('E');
		this.w = this.input.keyboard.addKey('W');
		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);

		// Colisiones MAPA 
		this.physics.add.collider(this.jugador, this.wallLayer);
		this.physics.add.collider(this.NPCGroup, this.wallLayer);
		
		this.p = this.input.keyboard.addKey('P');
		this.i = this.input.keyboard.addKey('I'); // tecla prueba para mision planta 2
    }
	nextLevel(){
		const subir = this.physics.overlap(this.jugador, this.ascensor); //comprobar si el jugador esta "tocando" el ascensor para poder subir
		if(subir){
			if(this.mjCompletado && this.misionCompletada) {//Si se ha completado la mision y el minijuego puede subir, si no todavia no
				console.log("puedes subir");
				this.ascensor.play('abrir', true);
				setTimeout(()=>{
					this.scene.start('Planta3', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido,
										 sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo});
					this.scene.stop();
				},2000);
			}
			else{
				console.log("todavia no puedes subir");
			}
		}
	}
    update(t,dt){
		super.update(t,dt);
		if(this.w.isDown){	//subir ascensor
			this.nextLevel();
		}
		if(this.p.isDown){ 
			this.scene.start('Planta3', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido,
										 sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo});
			this.scene.stop();
		}
		if(this.i.isDown){
			this.scene.launch('puertaSecreta', this.claveNum);
            this.scene.pause();
		}	
    }

	onPause(){
		this.jugador.onPauseInput();
	}
}