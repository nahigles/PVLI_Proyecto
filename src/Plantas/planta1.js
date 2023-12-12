import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Personajes/jugador.js';
import NPC from '../Personajes/NPCBase.js';
import Button from '../UI/Button.js';
import Carpeta from '../Misiones/Carpeta.js';
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
		this.load.image('pauseButton', './assets/images/UI/PauseMenu/pauseButton.png');
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
		this.load.image('Carpeta', './assets/images/Objetos/Carpeta.png');
		//this.load.image('Tablon', './assets/images/Objetos/Tabla.png');

		/*// MAPA PRUEBA 1
		this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/example.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');
        this.load.image('tileset_Planta_1_2', './assets/Prueba_Mapa/tileset_elevator.png');
        this.load.image('tileset_Planta_1_3', './assets/Prueba_Mapa/tileset_objects.png');*/

		// MAPA PRUEBA 2
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
		this.w = this.input.keyboard.addKey('W');
		//this.add.image(0,0,'Tablon');  
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
		// Layer objeto
		
		this.NPCGroup = this.physics.add.group();
		this.NPCVictoria = new NPC(this, 400, 50, 'NPCVictoria', 'Victoria');
		this.NPCAlvaro = new NPC(this, 300, 50, 'NPCAlvaro', 'Alvaro');
		this.NPCAlma = new NPC(this, 200, 50, 'NPCAlma', 'Alma');
		this.NPCEmilio = new NPC(this, 100, 50, 'NPCEmilio', 'Emilio');
		this.NPCGroup.addMultiple([this.NPCVictoria, this.NPCAlvaro, this.NPCAlma, this.NPCEmilio]);
		
		// NPCS POR CAPA DE OBJETOS
		// Grupo de NPCS
		//this.NPCGroup = this.physics.add.group();
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
		
		this.pauseButton = new Button(this, 570, 30, 'pauseButton', ()=>{this.scene.launch("PauseMenuPlanta1");}, ()=>{this.scene.pause();}, ()=>{} , ()=>{});
		this.pauseButton.setScrollFactor(0);
        this.pauseButton.setDepth(100);
		console.log("Pause button created:", this.pauseButton);

		// CAMARA
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.jugador);
		this.cameras.main.setZoom(3.2);
		this.scene.launch("UiScene", {
			home: this,
			player: this.jugador,
			NPCs: this.NPCGroup
		});	


		// Colisiones MAPA PRUEBA 2
		this.physics.add.collider(this.jugador, this.wallLayer);
		this.physics.add.collider(this.NPCGroup, this.wallLayer);

		//Mision
		this.carpeta = new Carpeta(this,this.jugador.x, this.jugador.y, 'Carpeta');
		this.e = this.input.keyboard.addKey('E');
		this.haveToTalk = false;	//saber si tiene que hablar o no con Alvaro
		this.alreadyTalked = false;	//saber si ya ha hablado con Alvaro
		this.resultado = false;		//saber si se ha dado ya el resultado de la mision
		this.choose = false;		//saber si se ha elegido una opcion de la mision, si se ha hablado con Victoria
    }
	catchFolder(){
		const canCatch = this.physics.overlap(this.jugador, this.carpeta); //comprobar si el jugador esta "tocando" la carpeta para poder cogerla

		if(canCatch && !this.carpeta.catch) { //si se puede coger y no se ha cogido antes
			this.carpeta.catch = true;
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
			this.resultado = true;
		}
		else if(!this.haveToTalk && this.alreadyTalked && !this.carpeta.catch){ //si no tenia que hablar, pero no ha cogido la carpeta, Alvaro le ha hablado
			console.log("extrovertido");
			this.jugador.extrovertido = true; //extrovertido
			this.resultado = true;
		}
		else if(!this.haveToTalk && this.carpeta.catch){//si no tenia que hablar y ha cogido la carpte
			console.log("introvertido");
			this.jugador.introvertido = true; //introvertido
			this.resultado = true;
		}
	}
    update(){
		super.update();
		if(this.p.isDown){ 
			this.scene.start('Planta2');
			this.scene.stop();
		}
		if(this.e.isDown){	//coger carpeta
			this.catchFolder();
		}
		if(this.carpeta.catch) { //si se ha cogido la carpeta, se mueve con el jugador para taparle
			this.carpeta.x = this.jugador.x + 12;
		}
		//si no se tenia que hablar, pero no se ha cogido la carpeta, Alvaro te ve y te habla
		if(this.choose && !this.resultado && !this.haveToTalk && !this.alreadyTalked &&!this.carpeta.catch && this.physics.overlap(this.jugador, this.NPCAlvaro) ){
			this.jugador.body.setVelocityX(0);
			this.scene.get("UiScene").talk();
		}
		//Cuando se llegue a Alma, dependiendo de lo que has hecho se te de el resultado de la mision
		if(this.choose && !this.resultado && this.physics.overlap(this.jugador, this.NPCAlma)){
			this.resultadoMision();
			if(this.resultado) {
				this.carpeta.destroy();
			}
		}
		//Cuando se tenga el ascensor, sise ha completado la mision y el minijuego puede subir, si no todavia no
		if(this.w.isDown){ 
			if(this.mjCompletado && this.resultado) {
				console.log("puedes subir");
			}
			else{
				console.log("todavia no puedes subir");
			}
		}
    }
	onPause(){
		this.jugador.onPauseInput();
	}
}