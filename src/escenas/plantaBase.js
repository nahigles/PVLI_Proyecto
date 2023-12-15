import Jugador from '../Personajes/jugador.js';
import Button from '../UI/Button.js';
/**
 * Escena planta base
 */
export default class PlantaBase extends Phaser.Scene{
    /**
     * Constructora
     * @param {string} planta -  planta
     * @param {string} nextPlanta - siguiente planta
     * @param {string} tilemap - mapa
     * @param {string} tilename
     * @param {int} tileColision -hasta que numero
     * @param {string} tileColision -siguiente planta
     */

    constructor(planta, nextPlanta, minijuego, tilemap, tilename, tileColision) {
        super({ key: planta });
         //TILE MAP
         this.key=planta;
         this.nextPlanta=nextPlanta;
         this.minijuego=minijuego;
         this.mapname=tilemap;
         this.tilename=tilename;
         this.numColision=tileColision;

         this.nextLocked = true; //el siguiente nivel esta lockeado porq todavía no se ha superado en minijuego
    }

    
    init(){

    }

    preload(){ //cargar los assets que vayamos a usar
       // this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
       this.load.image('pauseButton', './assets/images/UI/PauseMenu/pauseButton3.png');
    }

    create(){
        /*
        // Jugador
		this.jugador = new Jugador(this, 100, 50, 'playerAnim');
		this.jugador.body.setCollideWorldBounds(true);
        // Camara
        this.cameras.main.startFollow(this.jugador);*/
        /*
        this.physics.world.setBounds(0,0,600,180);//ancho  y alto nivel*/
        this.m = this.input.keyboard.addKey('M'); 
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Minijuego
		this.mjCompletado = false;
         // BotonPause
		/*this.pauseButton = new Button(this, 310, 8  , 'pauseButton', ()=>{ this.scene.launch("PauseMenu", {
            level : this.key,
            other : this.minijuego
           });}, ()=>{this.scene.pause();}, ()=>{}, ()=>{} );
        this.pauseButton.setDepth(10);
       
        this.add.existing(this.pauseButton);*/
    }
    startMinijuego(){
        this.scene.launch(this.minijuego);
        this.scene.pause();
    }
    minijuegoCompletado(){
		this.mjCompletado = true;
	}
    moveButtonRight(){
        console.log("tihht");
        this.pauseButton.x += 10;
    }
    moveButtonLeft(){
        console.log("lefy");
        this.pauseButton.x -= 10;
    }
    update(){
        if(this.m.isDown){ 
            this.scene.launch(this.minijuego); // Pasamos al minijuego
            this.scene.pause();
		}        
        else if(this.esc.isDown){
           this.scene.launch("PauseMenu", {
            level : this.key,
            other : this.minijuego
           });
            this.scene.pause(this.key);
        }
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