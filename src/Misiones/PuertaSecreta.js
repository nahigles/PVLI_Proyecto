export default class PuertaSecreta extends Phaser.Scene{

    constructor(){
        super('puertaSecreta', 'Planta2');
        this.correct = false;
    }
    init(){
    }
    preload(t,dt){
        //this.load.image('background2', './assets/images/Backgrounds/BackgroundPapelera.png');
    }
    create(){

        //background
        //this.add.image(0,0,'background2').setOrigin(0,0).setScale(10.0,13.0);
        
        // Crear imagenes con fors para colocarlos con el mismo espacio entre numeros

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