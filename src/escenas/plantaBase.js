//import...

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
        //this.load.image('background', 'assets/images/oficina.png');

    }

    create(){
        /*
        this.add.image(0, 0, 'background').setScale(0.8, 0.8).setOrigin(0, 0) // background

        //gameObjects

        this.nextKey = this.input.keyboard.addKey('E'); //// Y escuchamos la pulsación de la tecla 'E' para cambiar de escena.
        */
    }

    update(){
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