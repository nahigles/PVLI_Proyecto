
import Tecla from './Tecla.js';
export default class PuertaSecreta extends Phaser.Scene{

    constructor(){
        super('puertaSecreta', 'Planta2');
        this.correct = false;
        this.escrito = [" ", " ", " "];
        this.clave = ["0", "4", "7"];
        this.claveMirada = false;
    }
    init(){
    }
    preload(t,dt){
        // Cargo imagenes
        this.load.image('backgroundM2', './assets/images/Backgrounds/BackgroundM2.png');
        this.load.image('pantalla', './assets/images/Objetos/Pantalla.png')
        this.load.image('0', './assets/images/Objetos/TecladoNumerico/Number0.png');
        this.load.image('1', './assets/images/Objetos/TecladoNumerico/Number1.png');
        this.load.image('2', './assets/images/Objetos/TecladoNumerico/Number2.png');
        this.load.image('3', './assets/images/Objetos/TecladoNumerico/Number3.png');
        this.load.image('4', './assets/images/Objetos/TecladoNumerico/Number4.png');
        this.load.image('5', './assets/images/Objetos/TecladoNumerico/Number5.png');
        this.load.image('6', './assets/images/Objetos/TecladoNumerico/Number6.png');
        this.load.image('7', './assets/images/Objetos/TecladoNumerico/Number7.png');
        this.load.image('8', './assets/images/Objetos/TecladoNumerico/Number8.png');
        this.load.image('9', './assets/images/Objetos/TecladoNumerico/Number9.png');
        this.load.image('tick', './assets/images/Objetos/TecladoNumerico/Tick.png');
        this.load.image('cross', './assets/images/Objetos/TecladoNumerico/Cross.png');
    }
    create(){

        //background
        this.add.image(0,0,'backgroundM2').setOrigin(0,0).setScale(10.0,13.0);
        this.add.image(290,60,'pantalla').setOrigin(0.5,0.5).setScale(5.0,5.0);
        
        // Fila columna y numeros para ayuda de colocar
        let fil = 3;
        let col = 3;
        let nums = 1; // key

        // Donde empiezan a colocarse las teclas
        let desplX = 210;
        let desplY = 140;

        // Distaancia entre teclas
        let distanciaX = 80;
        let distanciaY = 70;

        // Teclas del 1 al 9 incluidos
        for(let i=0; i<col; i++){

            for(let j = 0; j < fil; j++){
                new Tecla(this, j*distanciaX+desplX, i*distanciaY+desplY, nums);
                nums++;
            }
        }

        // Teclas tick 0 y cross
        new Tecla(this, desplX,3*distanciaY + desplY, "cross");
        new Tecla(this, distanciaX+desplX, 3*distanciaY+desplY, "0");
        new Tecla(this, 2*distanciaX + desplX, 3*distanciaY + desplY, "tick");

        // Texto numeros para pantalla
        this.numbers = this.add.text(230,32, this.escrito[0] + " " + this.escrito[1] + " " + this.escrito[2], {
            fontSize: '50px', 
            fill: '#000',
            fontFamily:'Arial',
            resolution: 2,
            antialias: true
        }).setScrollFactor(0);

    }

    update(t,dt){
        super.update(t,dt);

        if(this.correct){
            setTimeout(()=>{
                this.scene.resume('Planta2'); //volvemos a planta
                this.scene.stop();
            },500);
        }
    }

    anadirNum(n){
        let i = 0;
        while(i < this.escrito.length && this.escrito[i] != " "){
            i++;
        }

        if(i < 3){
            this.escrito[i] = n;
            this.numbers.setText(this.escrito[0] + " " + this.escrito[1] + " " + this.escrito[2]);
        }
    }

    quitarNum(){
        let i = this.escrito.length - 1;
        while(i >= 0 && this.escrito[i] == " "){
            i--;
        }

        this.escrito[i] = " ";
        this.numbers.setText(this.escrito[0] + " " + this.escrito[1] + " " + this.escrito[2]);

    }

    comprobarCorrecto(){
        let correctttt = true;

        let i = 0;
        while(i < this.escrito.length && correctttt){
            if(this.escrito[i] != this.clave[i]){
                correctttt = false;
            }

            i++;
        }

        if(!correctttt){
            this.escrito = [" ", " ", " "];
            this.numbers.setText(this.escrito[0] + " " + this.escrito[1] + " " + this.escrito[2]);
        }
        else{
            let plantica2 = this.scene.get("Planta2");
            plantica2.lightsOn();
            plantica2.misionCompleta();

            if(!this.clavMirada){
                this.scene.get("UiScene").sigConver();
            }
        }
        
        this.correct = correctttt;
    }

    clavMirada(){
        this.claveMirada = true;
    }
}