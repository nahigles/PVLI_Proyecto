import MinijuegoBase from '../../escenasBase/minijuegoBase.js';
import Ajolote from '../../Personajes/ajolote.js';
import Plataforma from './plataforma.js';

/**
 * Minijuego 1 donde hay un ajolote y plataformas que debe saltar
 * Si se supera el score de Emilio se completa el minijeugo y se vuelve a la planta 1
 */
export default class MJ_Plataformas extends MinijuegoBase{

    constructor(){
        super('mj_Plataformas', 'Planta1');
    }
    init(){
        super.init();
        this.score = 0;
        this.emilioScore = 2023;
    }
    preload(){
       super.preload();

       this.load.spritesheet('ajoloteAnim', './assets/images/Characters/Ajolote_Spritesheet.png', {frameWidth: 24, frameHeight: 24});

       this.load.image('background1', './assets/images/Backgrounds/61fbff.png');
       this.load.image('ajolote', './assets/images/Characters/ajolote.png');
       this.load.image('azul', './assets/images/Objetos/plataformaAzul.png');
       this.load.image('amarillo', './assets/images/Objetos/plataformaAmarillo.png');
       this.load.image('verde', './assets/images/Objetos/plataformaVerde.png');
       this.load.image('morado', './assets/images/Objetos/plataformaMorada.png');
       this.load.image('moradoRota', './assets/images/Objetos/moradaRota.png');
    }
    create(){
        super.create();
        //background
        this.add.image(0,0,'background1').setScale(4,4).setOrigin(0,0).setScrollFactor(0);  
        
        //mostrar score
        this.scoreText = this.add.text(5,8, 'SCORE: ' + this.score, {
            fontSize: '20px', 
            fill: '#000',
            fontFamily:'Arial',
            resolution: 2,
            antialias: true
        }).setScrollFactor(0);
        this.emilioScoreText = this.add.text(5,28, 'EMILIO: ' + this.emilioScore, {
            fontSize: '20px', 
            fill: '#000',
            fontFamily:'Arial',
            resolution: 2,
            antialias: true
        }).setScrollFactor(0);
        //ajolote
        this.ajolote = new Ajolote(this,300 ,200, 'ajoloteAnim');
        this.ajolote.body.setCollideWorldBounds(false);
        //plataformas
        this.plataformas = this.add.group();
        const colores = ['amarillo', 'verde', 'azul', 'morado'];
        let firstXPos = 300;
        let firstYPos = 350;
        const firstPlataforma = new Plataforma(this,firstXPos,firstYPos, 'amarillo');
        this.plataformas.add(firstPlataforma);
        let anteriorX = firstXPos;
        //creacion plataformas
        for(let i = 0; i < 20; i++) {
            
            const color = colores[i%4]; //va alternando ciclicamente entre los cuatro colores
            let x1 = Phaser.Math.Between(90, Math.max(90, anteriorX - 180) );
           
            let x2 = Phaser.Math.Between(Math.min(anteriorX + 180, 510), 510);

            const x = Math.random() < 0.5 ? x1 : x2;
            const y = (firstYPos - 100) - i * 100;
            const newPlataforma = new Plataforma(this, x, y, color);
            this.plataformas.add(newPlataforma);
            anteriorX = x;
        } 
        //colisiones y rebote
        this.physics.add.collider(this.ajolote, this.plataformas, (ajolote,plataforma)=>{
            if(ajolote.body.touching.down) { //solo salta cuando el ajolote esta encima de la plataforma
                this.ajolote.jump();
                plataforma.hit();
                if(!plataforma.touch){  //cuando el ajolote salta por primera vez una plataforma, sube su puntuacion
                    plataforma.touched();
                    this.score +=  100;
                    this.scoreText.setText('SCORE: '+ this.score);
                }
            }
        });
        
        //camara
        this.cameras.main.setBounds(0,-1800,300, 2300);
        this.cameras.main.startFollow(this.ajolote);
    }
    update(){
        super.update();
        //gestionar cuando muere
        if (this.ajolote.y > 500){
            this.mjSound.pause();
            this.scene.start(this);
        }
        //jugador aparece por el otro lado 
       if(this.ajolote.x > 600) this.ajolote.x = -25;
       if(this.ajolote.x < -25) this.ajolote.x = 600;
       //update plataformas
       this.plataformas.children.iterate(plataforma => {
        if(plataforma.update){
            plataforma.update();
        }
       });
       //cuando se iguale el score se termina el minijuego
       if(this.score>this.emilioScore){
            let plantica1 = this.scene.get("Planta1");
            plantica1.minijuegoCompletado();
            //para que no cambie de repente
            setTimeout(()=>{
                this.mjSound.pause();
                plantica1.music(true);
                this.scene.resume('Planta1'); //volvemos a planta
                this.scene.stop();
            },1500);
       }

    }
}
