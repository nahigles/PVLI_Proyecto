import plantaBase from '../escenas/plantaBase.js';
import Jugador from '../Characters/Jugador.js';

export default class Planta1 extends plantaBase {
	/**
	 * Nivel 1
	 * @extends plantaBase
	 */
	constructor(){	
		super("planta1", "planta2", "mj_plataformas", 'level1', 'tiles', 560);
		//por ahora lo d tiles no tiene sentido
	}

	init(){
		super.init();

	}
    preload(){
		//this.load.image("player", "./assets/images/AjoloteTrajeado.png" );
		this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});

		// MAPA PRUEBA 1
		/*this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/example.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');
        this.load.image('tileset_Planta_1_2', './assets/Prueba_Mapa/tileset_elevator.png');
        this.load.image('tileset_Planta_1_3', './assets/Prueba_Mapa/tileset_objects.png');*/

		// MAPA PRUEBA 2
		this.load.tilemapTiledJSON('tilemap_Planta_1', './assets/Prueba_Mapa/mapa_prueba_2.json');
        this.load.image('tileset_Planta_1_1', './assets/Prueba_Mapa/tileset_architecture.png');

    }

    create(){
		super.create();
		// TILEMAP
        this.map = this.make.tilemap({ 
			key: 'tilemap_Planta_1', 
            tileWidth: 16, 
            tileHeight: 16
		});
		
        // tiles
        const tileset1 = this.map.addTilesetImage('tileset_architecture', 'tileset_Planta_1_1');  
        /*const tileset2 = this.map.addTilesetImage('tileset_elevator', 'tileset_Planta_1_2');  
        const tileset3 = this.map.addTilesetImage('tileset_objects', 'tileset_Planta_1_3');  */
		
        // Layers MAPA PRUEBA 1
        /*this.backgroundLayer = this.map.createLayer('BGWall', [tileset1, tileset2, tileset3]);
        this.groundLayer = this.map.createLayer('Architecture', [tileset1, tileset2, tileset3]);
        this.foreground = this.map.createLayer('Elevators', [tileset1, tileset2, tileset3]);*/
		//this.backgroundLayer.resizeWorld();

		// Layers MAPA PRUEBA 2
		this.backgroundLayer = this.map.createLayer('Fondo', tileset1);
        this.wallLayer = this.map.createLayer('Paredes', tileset1);
		this.wallLayer.setCollisionByExclusion([-1]);

		// Layers con colisiones
		// his.wallLayer.setCollision(13); 

		//this.groundLayer.scale.setTo(game.width, game.height);
		// Jugador
		
		//this.cameras.main.scrollY = -300;
		
		this.jugador = new Jugador(this, 100, 50, 'playerAnim');
		this.cameras.main.startFollow(this.jugador);
		// Colisiones MAPA PRUEBA 2
		this.physics.add.collider(this.jugador, this.wallLayer, () => {console.log("COLISION")})
		

    }

    update(){
		super.update();/*
		if(this.physics.add.collider(this.jugador, this.wallLayer))
		{
			console.log("colisiona");
		} 
		else{
			console.log(" NO colisiona");
		}*/
    }
}