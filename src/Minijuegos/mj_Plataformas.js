import MinijuegoBase from '../escenas/minijuegoBase.js';
import Jugador from '../Personajes/jugador.js';
import Plataforma from '../Minijuegos/plataforma.js';

export default class MJ_Plataformas extends MinijuegoBase{

    constructor(){
        super('mj_Plataformas', 'Planta1');
    }
    init(){
        super.init();
        this.score = 0;
        this.emilioScore = 2000;
    }
    preload(){
        super.preload();
        this.load.image('background', './assets/images/Backgrounds/fondonegro.png');
       //this.load.spritesheet('playerAnim', './assets/images/Player/AnimationSheet.png', {frameWidth: 24, frameHeight: 24});
       //this.load.image('ajolote', './assets/images/AjoloteTrajeado.png');
       this.load.image('azul', './assets/images/Objetos/plataformaAzul.png');
       this.load.image('amarillo', './assets/images/Objetos/plataformaAmarillo.png');
       this.load.image('verde', './assets/images/Objetos/plataformaVerde.png');
       this.load.image('morado', './assets/images/Objetos/plataformaMorada.png');
       this.load.image('moradoRota', './assets/images/Objetos/moradaRota.png');
    }
    create(){
        super.create();
        //background
        this.add.image(0,0,'background').setScale(2,2).setScrollFactor(0); 
        //this.scoreText = this.add.bitmapText(5,8,'scoreFont', 'SCORE' +  this.score, 40).setScrollFactor(0);
        //mostrar score
        
        this.scoreText = this.add.text(5,8, 'SCORE: ' + this.score, {
            fontSize: '10px', 
            fill: '#fff',
            fontFamily:'Arial',
            resolution: 50,
            antialias: true
        }).setScrollFactor(0);
        this.emilioScoreText = this.add.text(5,20, 'EMILIO: ' + this.emilioScore, {
            fontSize: '10px', 
            fill: '#fff',
            fontFamily:'Arial',
            resolution: 50,
            antialias: true
        }).setScrollFactor(0);
        //jugador
        this.jugador = new Jugador(this,10,100);
        this.jugador.body.setCollideWorldBounds(false);
        //plataformas
        this.plataformas = this.add.group();
        this.plataformasAmarillas = this.add.group();
        this.plataformasAzules = this.add.group();
        this.plataformasVerdes = this.add.group();
        this.plataformasMoradas = this.add.group();
        this.pAmarillo = new Plataforma(this,0,150, 'amarillo');
        this.pVerde = new Plataforma(this,50,100, 'verde');
        this.pAzul = new Plataforma(this,260,50, 'azul');
        this.pMorado = new Plataforma(this,180,0, 'morado');
        this.pAmarillo1 = new Plataforma(this,150,-50, 'amarillo');
        this.pVerde1 = new Plataforma(this,50,-100, 'verde');
        this.pAzul1 = new Plataforma(this,260,-150, 'azul');
        this.pMorado1 = new Plataforma(this,180,-200, 'morado');
        this.pAmarillo2 = new Plataforma(this,150,-250, 'amarillo');
        this.pVerde2 = new Plataforma(this,50,-300, 'verde');
        this.pAzul2 = new Plataforma(this,260,-350, 'azul');
        this.pMorado2 = new Plataforma(this,180,-400, 'morado');
        this.pAmarillo3 = new Plataforma(this,150,-450, 'amarillo');
        this.pVerde3 = new Plataforma(this,50,-500, 'verde');
        this.pAzul3 = new Plataforma(this,260,-550, 'azul');
        this.pMorado3 = new Plataforma(this,180,-600, 'morado');
        this.pAmarillo4 = new Plataforma(this,150,-650, 'amarillo');
        this.pVerde4 = new Plataforma(this,50,-700, 'verde');
        this.pAzul4 = new Plataforma(this,260,-750, 'azul');
        this.pMorado4 = new Plataforma(this,180,-800, 'morado');
        this.plataformas.addMultiple([this.pAmarillo, this.pAmarillo1,this.pAmarillo2,this.pAmarillo3,this.pAmarillo4,this.pVerde, this.pVerde1,this.pVerde2,this.pVerde3,this.pVerde4,this.pAzul,this.pAzul1,this.pAzul2,this.pAzul3,this.pAzul4,this.pMorado,this.pMorado1,this.pMorado2,this.pMorado3,this.pMorado4]);
        //colisiones y rebote
        this.physics.add.collider(this.jugador, this.plataformas, (jugador,plataforma)=>{
            if(jugador.body.touching.down) { //solo salta cuando el jugador esta encima de la plataforma
                this.jugador.body.setVelocityY(-220);   //para que cada vez que rebote en una plataforma lo haga con la misma "fuerza"
                if(plataforma.texture.key==='morado' || plataforma.texture.key==='moradoRota' ){
                    if(!plataforma.touch) {
                        plataforma.setTexture('moradoRota');
                    }
                    else{
                        plataforma.destroy();
                    }
                }
                if(!plataforma.touch){
                    plataforma.touch = true;
                    this.score +=  100;
                    this.scoreText.setText('SCORE: '+ this.score);
                }
            }
        });
        //camara
        this.cameras.main.setBounds(0,-850,300, 1070);
        this.cameras.main.startFollow(this.jugador);
    }
    update(){
        console.log(this.jugador.y);
        super.update();
        //gestionar cuando muere
        if (this.jugador.y > 200){
            this.scene.start(this);
        }
        //jugador aparece por el otro lado 
       if(this.jugador.x > 600) this.jugador.x = -25;
       if(this.jugador.x < -25) this.jugador.x = 600;
       //update plataformas
       this.plataformas.children.iterate(plataforma => {
        if(plataforma.update){
            plataforma.update();
        }
       });
       //cuando se iguale el score se termina el minijuego
       if(this.score===this.emilioScore){
            //para que no cambie de repente
            setTimeout(()=>{
                this.scene.resume('Planta1'); //volvemos a planta
                this.scene.stop();
            },1000);
       }

    }
}
/*
this.time.addEvent({
    delay: 1000,
    callback: aux,
    callbackScope: this,
    loop: true

})

aux(){
     console.log("HA PASADO UN SEGUNDO");
}
*/