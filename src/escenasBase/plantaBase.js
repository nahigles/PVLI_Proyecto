
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
    
    preload(){
        // Cargamos sonidos
        this.load.audio('plant1Sound', 'assets/sounds/planta1Sound.WAV');
        this.load.audio('plant2Sound', 'assets/sounds/planta2Sound.WAV');
        this.load.audio('plant3Sound', 'assets/sounds/planta3Sound.WAV');
        this.load.audio('plant4Sound', 'assets/sounds/planta4Sound.WAV');
        this.load.audio('plant5Sound', 'assets/sounds/planta5Sound.WAV');
    }

    create(){
        this.m = this.input.keyboard.addKey('M'); 
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //Minijuego
		this.mjCompletado = false;
        //Mision
        this.misionCompletada = false;
  
        this.musica = "";
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
         if(this.esc.isDown){
            this.music(false);
           this.scene.launch("PauseMenu", {
            level : this.key,
            other : this.minijuego
           });
            this.scene.pause(this.key);
        }
        if(this.key==='Planta4_2') {
            this.misionCompletada = true;;
        }
    }

    music(enable){
		if(enable){
			this.musica.resume();
		}
		else{
			this.musica.pause();
		}
	}
}