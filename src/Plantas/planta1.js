import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import Carpeta from '../Misiones/carpeta.js';
import Ascensor from './ascensor.js';
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
		
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.spritesheet('NPCVictoria', './assets/images/Characters/Victoria.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCAlvaro', './assets/images/Characters/Alvaro.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCAlma', './assets/images/Characters/Alma.png', {frameWidth: 24, frameHeight: 36})
		this.load.spritesheet('NPCEmilio', './assets/images/Characters/Emilio.png', {frameWidth: 24, frameHeight: 36})
		this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image('dialogBox', 'assets/images/UI/Dialogs/dialogBoxB.png');
		this.load.image('Player', 'assets/images/UI/Dialogs/faces/Player.png');
		this.load.image('Victoria', 'assets/images/UI/Dialogs/faces/Victoria.png');
		this.load.image('Alvaro', 'assets/images/UI/Dialogs/faces/Alvaro.png');
		this.load.image('Alma', 'assets/images/UI/Dialogs/faces/Alma.png');
		this.load.image('Emilio', 'assets/images/UI/Dialogs/faces/Emilio.png');
	
		this.load.image('dialogBox', 'assets/images/Hud/dialogBox.png');
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.image('Carpeta', './assets/images/Objetos/Carpeta.png');
		this.load.spritesheet('ascensorAnim', './assets/images/Objetos/tileset_elevator.png', {frameWidth: 32, frameHeight: 48});
		// IMAGENES MAPA 
		this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/tilemap_planta_1_amarilla_2.json');
        this.load.image('tileset_architecture_yellow', 'assets/officeAssets/Architecture/tiles_architecture_yellow.png');
		this.load.image('tileset_door_yellow', 'assets/officeAssets/Doors/tile_door_yellow.png');
        this.load.image('tileset_furniture_yellow', 'assets/officeAssets/Furniture/tiles_furniture_yellow.png');
        this.load.image('tileset_objects_yellow', 'assets/officeAssets/Objects/tiles_objects_yellow.png');
        this.load.image('tileset_objects_grey', 'assets/officeAssets/Objects/tileset_objects.png');
    }

    create(){
		super.create();

		this.p = this.input.keyboard.addKey('P');
		this.w = this.input.keyboard.addKey('W');
		console.log(this.pauseButton); 
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
		// Layer objeto
		
		// Grupo de NPCS
		this.NPCGroup = this.physics.add.group();
		// NPCS POR CAPA DE OBJETOS
		// Bucle de creación
		for (const objeto of this.map.getObjectLayer('NPCS').objects) {
			// `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'NPCBase') {
				this.npc  = new NPC(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.name);
				if(objeto.name == 'Emilio' || objeto.name == 'Victoria') this.npc.setFlip(true, false);
				this.NPCGroup.add(this.npc);
			}
		}
		//Ascensor
		this.ascensor = new Ascensor(this, 750 , 88, 'ascensorAnim' );
		// JUGADOR POR CAPA DE OBJETOS	
		this.jugador = this.map.createFromObjects('Jugador', {
			name: 'Jugador',
			classType: Jugador
		})[0];
		console.log(this.jugador);
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

		//Mision
		this.carpeta = new Carpeta(this,66, this.jugador.y+4, 'Carpeta').setScale(0.2, 0.2);
		this.e = this.input.keyboard.addKey('E');
		this.haveToTalk = false;	//saber si tiene que hablar o no con Alvaro
		this.alreadyTalked = false;	//saber si ya ha hablado con Alvaro
		this.choose = false;		//saber si se ha elegido una opcion de la mision, si se ha hablado con Victoria
    }
	catchFolder(){
		const canCatch = this.physics.overlap(this.jugador, this.carpeta); //comprobar si el jugador esta "tocando" la carpeta para poder cogerla
		if(canCatch && !this.carpeta.catch) { //si se puede coger y no se ha cogido antes
			this.carpeta.catch = true;
			this.carpeta.y += 10;
		}
	}
	nextLevel(){
		const subir = this.physics.overlap(this.jugador, this.ascensor); //comprobar si el jugador esta "tocando" el ascensor para poder subir
		if(subir){
			if(this.mjCompletado && this.misionCompletada) {//Si se ha completado la mision y el minijuego puede subir, si no todavia no
				console.log("puedes subir");

				this.ascensor.play('abrir', true);
				
				this.ascensor.once('abierto', function(){
					//cuando haya acabado la animacion
					this.scene.launch('Planta2', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido});
					this.scene.stop();
					this.scene.get("UiScene").removeUI();
				}, this);
			}
			else{
				console.log("todavia no puedes subir");
			}
		}
	}
	hablaConAlvaro(){		//ha elegido hablar con Alvaro
		this.haveToTalk = true;
	}
	finConversacionVictoria(){// ha hablado con Victoria, por lo que ha tomado una decision respecto a la mision
		this.choose = true;
	}
	finConversacionAlvaro(){// ha hablado con Alvaro
		this.alreadyTalked = true;
	}
	resultadoMision(){
		if(this.haveToTalk && this.alreadyTalked ) { //si tenia que hablar y ha hablado
			console.log("extrovertido");
			this.jugador.extrovertido = true; //extrovertido
			this.misionCompletada = true;
		}
		else if(!this.haveToTalk && this.alreadyTalked && !this.carpeta.catch){ //si no tenia que hablar, pero no ha cogido la carpeta, Alvaro le ha hablado
			console.log("extrovertido");
			this.jugador.extrovertido = true; //extrovertido
			this.misionCompletada = true;
		}
		else if(!this.haveToTalk && this.alreadyTalked && this.carpeta.catch) { //si no tenia que hablar,pero ha hablado  aunque haya  ha cogido la carpeta
			console.log("extrovertido");
			this.jugador.extrovertido = true; //extrovertido
			this.misionCompletada = true;
		}
		else if(!this.haveToTalk && !this.alreadyTalked&& this.carpeta.catch){//si no tenia que hablar, no ha hablado  y ha cogido la carpeta
			console.log("introvertido");
			this.jugador.introvertido = true; //introvertido
			this.misionCompletada = true;
		}
	}
    update(){
		super.update();
		if(this.p.isDown){
			this.scene.get("UiScene").removeUI();
			this.scene.launch('Planta2', {introvertido : this.jugador.introvertido, extrovertido : this.jugador.extrovertido});
			this.scene.stop();
		}
		if(this.e.isDown){	//coger carpeta o subir ascensor
			this.catchFolder();
			this.nextLevel();
		}
		if(this.carpeta.catch) { //si se ha cogido la carpeta, se mueve con el jugador para taparle
			this.carpeta.x = this.jugador.x + 5;
		}
		//si no se tenia que hablar, pero no se ha cogido la carpeta, Alvaro te ve y te habla
		if(this.choose && !this.misionCompletada && !this.haveToTalk && !this.alreadyTalked &&!this.carpeta.catch && this.jugador.x > 370 ){
			this.jugador.body.setVelocityX(0);
			this.scene.get("UiScene").talk();
		}
		//Cuando se llegue a Alma, dependiendo de lo que has hecho se te de el resultado de la mision
		if(this.choose && !this.misionCompletada && this.jugador.x > 550){
			this.resultadoMision();
			if(this.misionCompletada) {
				this.carpeta.destroy(); //se elimina la carpeta
			}
		}
	}
	onPause(bol){
		this.jugador.onPauseInput(bol);
	}
}