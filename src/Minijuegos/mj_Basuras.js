import MinijuegoBase from '../escenas/minijuegoBase.js';
import Jugador from '../Personajes/jugador.js';

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
    }
    create(){
        super.create();
        //background
        //this.add.image(0,0,'background').setScrollFactor(0); 
        
        this.ballsText = this.add.text(5,8, 'BALLS: ' + this.ballNumer, {
            fontSize: '10px', 
            fill: '#fff',
            fontFamily:'Arial',
            resolution: 50,
            antialias: true
        }).setScrollFactor(0);
        //jugador
        this.jugador = new Jugador(this,140,100, 'playerAnim');
        this.jugador.body.setCollideWorldBounds(false);
  
        //colisiones y rebote
        this.physics.add.collider(this.jugador, this.plataformas, (jugador,plataforma)=>{
         // si colisiona hace esto
        });
    }
    update(){
        super.update();
        

    }
}