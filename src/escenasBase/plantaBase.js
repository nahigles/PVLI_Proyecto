
/**
 * Escena planta base de la que van a heredar todas las plantas
 * Aqui se encuentra todo lo que tienen en comun todas las plantas
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
        this.load.spritesheet("houseButton", "./assets/images/UI/house.png", {frameWidth: 80, frameHeight: 80});
    }

    create(){
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //Minijuego
		this.mjCompletado = false;
        //Mision
        this.misionCompletada = false;
        //musica
        this.musica = "";
        //boton irse a casa
        this.scene.get("UiScene").actions("BotonExit");
    }
    //pasa al minijuego que corresponda dependiendo de la planta, pausa la escena de la planta y la UI
    startMinijuego(){
        this.scene.launch(this.minijuego);
        this.scene.pause();
        this.scene.get("UiScene").exitVisible(false);
        this.scene.pause("UiScene");
    }
    //cuando se completa el minijuego se continua con el juego en la planta
    minijuegoCompletado(){
		this.mjCompletado = true;
        this.scene.get("UiScene").exitVisible(true);
        this.scene.resume("UiScene");
	}
    //se llama cuando se ha completado la mision de la planta
    misionCompleta(){
        this.misionCompletada = true;
    }
    update(){  
         if(this.esc.isDown){ //pasa al menu de pausa
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
        if(this.key==='Planta1' && !this.misionCompletada){
            this.scene.get("UiScene").exitVisible(false);
        }
    }
     //habilitar / deshabilitar la musica cuando se entra y sale de la planta 
    music(enable){
		if(enable){
			this.musica.resume();
		}
		else{
			this.musica.pause();
		}
	}
}