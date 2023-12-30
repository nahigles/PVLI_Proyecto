
import Jugador from '../Personajes/jugador.js';
import Button from './Button.js';
export default class MainMenu extends Phaser.Scene {
	/**
	 * Constructor, deficimos la key que tendrá la escena, nos sirve para los cambios de escena 
	 */
	constructor(){	
		super({ key: 'MainMenu' });

		this.self = this;
	}
	init(){
	}
    preload(){
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet("playButton2", "./assets/images/UI/MainMenu/playButton3.png", {frameWidth: 300, frameHeight: 120});
		
		// IMAGENES TILEMAP
		this.load.tilemapTiledJSON('tilemap_main_menu', './assets/Prueba_Mapa/mapa_main_menu.json');
        this.load.image('tileset_architecture_blue', 'assets/officeAssets/Architecture/tiles_architecture_blue.png');
        this.load.image('tileset_architecture_purple', 'assets/officeAssets/Architecture/tiles_architecture_purple.png');
        this.load.image('tileset_architecture_green', 'assets/officeAssets/Architecture/tiles_architecture_green.png');
		this.load.image('tileset_door_purple', 'assets/officeAssets/Doors/tile_door_purple.png');
        this.load.image('tileset_furniture_yellow', 'assets/officeAssets/Furniture/tiles_furniture_yellow.png');
        this.load.image('tileset_furniture_green', 'assets/officeAssets/Furniture/tiles_furniture_green.png');
        this.load.image('tileset_objects_yellow', 'assets/officeAssets/Objects/tiles_objects_yellow.png');
        this.load.image('tileset_objects_green', 'assets/officeAssets/Objects/tiles_objects_green.png');
        this.load.image('tileset_objects_purple', 'assets/officeAssets/Objects/tiles_objects_purple.png');

		// Sonido Boton
		this.load.audio('buttonSound', 'assets/sounds/buttonSound.ogg');
		this.load.audio('mainMenuSound', 'assets/sounds/mainMenuSound.wav')
    }
    create(){
		this.ButtonSoundd = this.sound.add('buttonSound');
		this.MainMenuSound = this.sound.add('mainMenuSound');
		this.MainMenuSound.loop = true;
		this.MainMenuSound.play();

		// TILE MAP
		this.map = this.make.tilemap({ 
			key: 'tilemap_main_menu', 
			tileWidth: 16, 
			tileHeight: 16,
			width : 100,
			height : 100
		});
		
		// TILE SET
		const tileset_architecture_blue = this.map.addTilesetImage('tiles_architecture_blue', 'tileset_architecture_blue');  
		const tileset_architecture_purple = this.map.addTilesetImage('tiles_architecture_purple', 'tileset_architecture_purple');  
		const tileset_architecture_green = this.map.addTilesetImage('tiles_architecture_green', 'tileset_architecture_green');  
		const tileset_door = this.map.addTilesetImage('tile_door_purple', 'tileset_door_purple');  
		const tileset_furniture_yellow = this.map.addTilesetImage('tiles_furniture_yellow', 'tileset_furniture_yellow');  
		const tileset_furniture_green = this.map.addTilesetImage('tiles_furniture_green', 'tileset_furniture_green');  
		const tileset_objects_yellow = this.map.addTilesetImage('tiles_objects_yellow', 'tileset_objects_yellow');  
		const tileset_objects_green = this.map.addTilesetImage('tiles_objects_green', 'tileset_objects_green');  
		const tileset_objects_purple = this.map.addTilesetImage('tiles_objects_purple', 'tileset_objects_purple');  
		
		// LAYERS
		this.backgroundLayer = this.map.createLayer('Fondo', tileset_architecture_blue);
		this.wallLayer = this.map.createLayer('Walls', tileset_architecture_blue);
		this.windowsLayer = this.map.createLayer('Ventanas', [tileset_architecture_green, tileset_architecture_purple, tileset_architecture_blue]);
		this.doorLayer = this.map.createLayer('Puerta', tileset_door);
		this.objectsLayer_1 = this.map.createLayer('Furniture', [tileset_furniture_green, tileset_furniture_yellow, tileset_objects_green, tileset_objects_purple, tileset_objects_yellow]);
		this.objectsLayer_2 = this.map.createLayer('Furniture2', [tileset_furniture_green, tileset_furniture_yellow, tileset_objects_green, tileset_objects_purple, tileset_objects_yellow]);
		this.chairsLayer = this.map.createLayer('Chairs', [tileset_objects_green, tileset_objects_purple, tileset_objects_yellow]);
		
		// Colisiones con las paredes
		this.wallLayer.setCollisionByExclusion([-1]);
		
		// Jugadores
		// Desactivo Input para que no se muevan
		this.player1 = new Jugador(this, 130, 90, 'playerAnim');
		this.player1.onPauseInput(true);
		this.player1.jumpAnim();

		this.player2 = new Jugador(this, 66, 80, 'playerAnim');
		this.player2.onPauseInput(true);
		this.player2.sitAnim();
		this.player2.body.allowGravity = false;
		
		this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.height);//ancho  y alto nivel
		this.cameras.main.startFollow(this.player1);
		this.cameras.main.setZoom(3.2);
		
		// Colisiones MAPA 
		this.physics.add.collider(this.player1, this.wallLayer)
		this.physics.add.collider(this.player2, this.wallLayer)
		
		// BotonPlay
		this.PlayButton = new Button(this, 96, 54, 'playButton2', ()=>{this.scene.launch("Planta1");}, ()=>{this.scene.stop(); this.MainMenuSound.pause();}, ()=>{}, ()=>{}, this.ButtonSoundd);
		this.PlayButton.changeScale(0.18,0.18);
	}

    update(){
    }

	mainMusic(enable){
		if(enable){
			this.MainMenuSound.resume();
		}
		else{
			this.MainMenuSound.pause();
		}
	}
}