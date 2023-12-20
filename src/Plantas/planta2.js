import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import Ascensor from './ascensor.js';
import Clave from '../Misiones/Clave.js';
export default class Planta2 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */

	constructor(){	
		super('Planta2', 'Planta3', 'mj_Basuras', 'level1', 'tiles', 560);
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
        this.load.image('tileset_door_green', 'assets/officeAssets/Doors/green_door.png');

		// NPCS
		this.load.spritesheet('NPCAndrea', './assets/images/Characters/Andrea.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCPedro', './assets/images/Characters/Pedro.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCMelisa', './assets/images/Characters/Melisa.png', {frameWidth: 24, frameHeight: 36})

		// NPS DIALOGO
		this.load.image('Andrea', 'assets/images/UI/Dialogs/faces/Andrea.png');
		this.load.image('Pedro', 'assets/images/UI/Dialogs/faces/Pedro.png');
		this.load.image('Melisa', 'assets/images/UI/Dialogs/faces/Melisa.png');

		// Imagen nota clave
		this.load.image('ClaveSprite', 'assets/images/Objetos/Clave.png');

		// Mask
		this.load.image('Mascara', 'assets/images/Backgrounds/FondoNegroMascara.png');
	}

    create(data){
		super.create();

		this.planta2Sound = this.sound.add('plant2Sound');
		this.planta2Sound.play();

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
		const tileset_locked_door = this.map.addTilesetImage('green_door', 'tileset_door_green');  
		
		// Layers 
		this.backgroundLayer = this.map.createLayer('Background', tileset_architecture);
		this.wallLayer = this.map.createLayer('Walls', tileset_architecture);
		this.windowsLayer = this.map.createLayer('Windows', tileset_architecture);
		this.columsLayer = this.map.createLayer('Colums', tileset_architecture);
		this.objectsLayer = this.map.createLayer('Furniture', [tileset_objects, tileset_furniture, tileset_locked_door]);
		this.PCLayer = this.map.createLayer('PC', [tileset_objects]);
		this.chairsLayer = this.map.createLayer('Chairs', [tileset_objects]);

		// Colisiones con las paredes
		this.wallLayer.setCollisionByExclusion([-1]);

		//Ascensor
		this.ascensor = new Ascensor(this, 50 , 88, 'ascensorAnim' );

		// Clave mision
		this.clave = new Clave(this,170,85, 'ClaveSprite');

		// Grupo de NPCS
		this.NPCGroup = this.physics.add.group();

		// NPCS POR CAPA DE OBJETOS
		// Bucle de creación
		for (const objeto of this.map.getObjectLayer('NPCS').objects) {
			// `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'NPCBase') {
				this.npc  = new NPC(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.name);
				//if(objeto.name == 'Emilio' || objeto.name == 'Victoria') this.npc.setFlip(true, false);
				//console.log(this.npc.x, this.npc.y);
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
		this.e = this.input.keyboard.addKey('E');

		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);

		// UISCENE
		//console.log("Planta 2: launcheas UI");
		
		this.scene.launch("UiScene", {
			home: this,
			player: this.jugador,
			NPCs: this.NPCGroup,
			insignias: [data.extrovertido, data.introvertido, false, false, false, false, false, false]
		});	

		// Colisiones MAPA 
		this.physics.add.collider(this.jugador, this.wallLayer);
		this.physics.add.collider(this.NPCGroup, this.wallLayer);


		// Colision positClave-jugador
		this.physics.add.overlap(this.clave, this.jugador, (clave,jugador)=>{
				if(!this.misionCompletada){
					//console.log("overlapeau");
					setTimeout(()=>{
						this.startMision();
					},3000);
				}
				
			});

		//this.p = this.input.keyboard.addKey('P');

		// Mascara
		this.msk = this.add.sprite(0, 0, 'Mascara').setScale(13.0,13.0);
		this.msk.setAlpha(0.5);

    }
	jugadorIntuitivo(){
		this.jugador.intuitivo = true;
	}
	jugadorSensitivo(){
		this.jugador.sensitivo = true;
	}
	nextLevel(){
		const subir = this.physics.overlap(this.jugador, this.ascensor); //comprobar si el jugador esta "tocando" el ascensor para poder subir
		if(subir){
			if(this.mjCompletado && this.misionCompletada) {//Si se ha completado la mision y el minijuego puede subir, si no todavia no
				//console.log("puedes subir");
				this.ascensor.play('abrir', true);
				
				this.ascensor.once('abierto', function(){
					//cuando haya acabado la animacion
					this.scene.start('Planta3', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido,
						sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo});
   					this.scene.stop();
					this.scene.get("UiScene").removeUI();
				}, this);
			}
			else{
				//console.log("todavia no puedes subir");
			}
		}
	}
    update(t,dt){
		super.update(t,dt);
		if(this.e.isDown){	//subir ascensor
			this.nextLevel();
		}
		/*if(this.p.isDown){ 
			this.scene.get("UiScene").removeUI();
			this.scene.start('Planta3', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido,
										 sensitivo : this.jugador.sensitivo, intuitivo : this.jugador.intuitivo});
			this.scene.stop();
		}*/
    }

	onPause(bol){
		this.jugador.onPauseInput(bol);
	}

	lightsOn(){
		this.msk.setAlpha(0.0);
	}

	startMision(){
		this.scene.launch('puertaSecreta');
        this.scene.pause();
	}
}