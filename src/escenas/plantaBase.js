
import Jugador from '../Personajes/jugador.js';
/**
 * Escena planta base
 */
export default class PlantaBase extends Phaser.Scene{
    /**
     * Constructora
     * @param {string} level -  nivel
     * @param {string} nextlevel - siguiente nivel
     * @param {string} tilemap - mapa
     * @param {string} tilename
     * @param {int} tileColision -hasta que numero
     */

    constructor(level, nextlevel, minijuego, tilemap, tilename, tileColision) {
        super({ key: level });
         //TILE MAP
         //this.level=level;
         this.nextlevel=nextlevel;
         this.minijuego=minijuego;
         this.mapname=tilemap;
         this.tilename=tilename;
         this.numColision=tileColision;

         this.nextLocked = true; //el siguiente nivel esta lockeado porq todavía no se ha superado en minijuego
        /*
            this.personajes = group d personajes
            botones d menu y cosas d esas?
        */
    }

    
    init(){

    }

    preload(){ //cargar los assets que vayamos a usar
        this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
    }

    create(){
        //jugador
        /*this.jugador = new Jugador(this, 100, 50, 'playerAnim');
        //camara
        //this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
        this.cameras.main.setBounds(0, 0, 600, 180);//ancho  y alto nivel
        this.cameras.main.startFollow(this.jugador);
        this.physics.world.setBounds(0,0,600,180);//ancho  y alto nivel*/
        //this.nextKey = this.input.keyboard.addKey('E'); //// Y escuchamos la pulsación de la tecla 'E' para cambiar de escena.
       
    }

    update(){
        //this.cameras.main.setFollowOffset(0,0);
        //this.cameras.main.startFollow(this.jugador);
        /*
        if(this.nextKey.isDown){ // Comprobamos si hemos pulsado la tecla 'Q', en cuyo caso, pasamos a esa escena.
			this.scene.start(this.minijuego); // Pasamos a la escena con identificador 'MinijuegoPlataformas'
		}
        */
    }

    /*
    CreateMap() {
        this.map = this.make.tilemap({ key: this.mapname });
        this.tiles = this.map.addTilesetImage("mapa", this.tilename);
        this.fondolayer = this.map.createLayer('fondo', this.tiles, 0, 0);
        this.colisionlayer = this.map.createLayer('colision', this.tiles, 0, 0);
        //poner colision a layer
        this.colisionlayer.setCollisionBetween(0, this.numColision);
    }
    */
}