import MinijuegoBase from '../escenas/minijuegoBase.js';
import BolaPapel from './bolaPapel.js'
import Basura from './basura.js'
export default class MJ_Basuras extends MinijuegoBase{

    constructor(){
        super('mj_Basuras', 'Planta2');
    }
    init(){
        super.init();
        this.ballNumer = 10;
    }
    preload(){
        super.preload();
        this.load.image('background2', './assets/images/Backgrounds/BackgroundPapelera.png');
        this.load.image('bolaImage', './assets/images/Objetos/BolaPapel.png');
        this.load.image('basuraImagen', './assets/images/Objetos/basura.png');
    }
    create(){
        super.create();

        //background
        this.add.image(0,0,'background2').setOrigin(0,0).setScale(10.0,13.0);
        
        this.ballsText = this.add.text(5,8, 'BALLS: ' + this.ballNumer, {
            fontSize: '10px', 
            fill: '#fff',
            fontFamily:'Arial',
            resolution: 50,
            antialias: true
        }).setScrollFactor(0);

        this.basura = new Basura(this, 150, 150, "basuraImagen");
        this.bolaPapel = new BolaPapel(this,150,350, 'bolaImage', ()=>{this.basura.basuraCollider});
  
        //colisiones y rebote
        this.physics.add.collider(this.basura, this.bolaPapel, (basura,bolaPapel)=>{
         // si colisiona hace esto
            this.ballNumer = this.ballNumer - 1;
            console.log("Colisionau");
        });
    }

    update(t,dt){
        console.log(this.ballNumer);

        if(this.ballNumer == 0){
            setTimeout(()=>{
                this.scene.resume('Planta2'); //volvemos a planta
                this.scene.stop();
            },1500);
        }
    }
}