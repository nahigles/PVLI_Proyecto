import MinijuegoBase from '../../escenasBase/minijuegoBase.js';
import BolaPapel from './bolaPapel.js'
import Basura from './basura.js'

/**
 * Minijuego 2 donde hay una basura con movimiento lateral y una bola de papel que se debe encestar
 * Si se encestan 10 bolas se completa el minijeugo y vuelve a la planta 2
 */
export default class MJ_Basuras extends MinijuegoBase{

    constructor(){
        super('mj_Basuras', 'Planta2');
    }
    init(){
        super.init();
        this.ballNumer = 10; //bolas a encestar
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
            fontSize: '20px', 
            fill: '#fff',
            fontFamily:'Arial',
            resolution: 2,
            antialias: true
        }).setScrollFactor(0);

        this.basura = new Basura(this, 150, 150, "basuraImagen");
        this.bolaPapel = new BolaPapel(this,150,350, 'bolaImage', ()=>{this.basura.basuraCollider});
  
        //colisiones y rebote
        this.physics.add.overlap(this.basura, this.bolaPapel, (basura,bolaPapel)=>{
         // si colisiona hace esto
         if(bolaPapel.body.touching.down){
             this.ballNumer = this.ballNumer - 1;
             this.ballsText.setText('BALLS: ' + this.ballNumer);
             bolaPapel.resetPosition();
             basura.stopBasura();
            } 
        });
    }

    update(t,dt){
        if(this.ballNumer == 0){
            setTimeout(()=>{
                this.mjSound.pause();
                this.scene.resume('Planta2'); //volvemos a planta
                this.scene.stop();
                let plantica2 = this.scene.get("Planta2");
                plantica2.minijuegoCompletado();
                plantica2.music(true);
            },500);
            
        }
    }
}