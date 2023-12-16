
import Tecla from './Tecla.js';
export default class PuertaSecreta extends Phaser.Scene{

    constructor(){
        super('puertaSecreta', 'Planta2');
        this.correct = false;
    }
    init(){
    }
    preload(t,dt){
        //this.load.image('background2', './assets/images/Backgrounds/BackgroundPapelera.png');
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
        //this.add.image(0,0,'background2').setOrigin(0,0).setScale(10.0,13.0);
        
        // Fila columna y numeros para ayuda de colocar
        let fil = 3;
        let col = 3;
        let nums = 1;

        // Donde empiezan a colocarse las teclas
        let desplX = 210;
        let desplY = 150;

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
        this.numbers = this.add.text(8,90, this.numbers, {
            fontSize: '20px', 
            fill: '#fff',
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
            },1500);
        }
    }
}