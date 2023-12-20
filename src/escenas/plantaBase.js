
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
    }
    init(){
    }

    preload(){ //cargar los assets que vayamos a usar
       this.load.image('pauseButton', './assets/images/UI/PauseMenu/pauseButton3.png');
    }

    create(){
        this.m = this.input.keyboard.addKey('M'); 
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //Minijuego
		this.mjCompletado = false;
        //Mision
        this.misionCompletada = false;
    }
    startMinijuego(){
        this.scene.launch(this.minijuego);
        this.scene.pause();
        this.scene.pause("UiScene");
    }
    minijuegoCompletado(){
		this.mjCompletado = true;
        this.scene.resume("UiScene");
	}
    misionCompleta(){
        this.misionCompletada = true;
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
}