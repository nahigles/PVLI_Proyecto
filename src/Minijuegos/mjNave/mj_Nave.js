import MinijuegoBase from '../../escenas/minijuegoBase.js';
import Nave from '../../Personajes/nave.js';
import Virus from './virus.js'
import Pool from './pool.js'

export default class MJ_Nave extends MinijuegoBase{

    constructor(){
        super('mj_Nave', 'Planta4');
    }

    init(){
        super.init();
    }

    preload(){
        super.preload();
        this.load.image('background4', './assets/images/Backgrounds/bg_mjNave.png');
        this.load.image('nave', './assets/images/Objetos/nave.png');
		this.load.image('lock', './assets/images/Objetos/lock.png');
        this.load.image('virusA', './assets/images/Objetos/virusA.png');
        this.load.image('virusB', './assets/images/Objetos/virusB.png');
		this.load.spritesheet('balaAnim', './assets/images/Objetos/bala.png', {frameWidth: 5, frameHeight: 5});
		this.load.spritesheet('explotionAnim', './assets/images/Objetos/explotion.png', {frameWidth: 19, frameHeight: 21});
    }

    create(){
        super.create();

        //background
        this.add.image(0,0,'background4').setOrigin(0,0);

        this.bounds = {x: 112, y:80, w:378, h:220};
        this.physics.world.setBounds(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
        
		this.nave = new Nave(this, 300, 300, 'nave');
		this.nave.body.setCollideWorldBounds(true);
        this.nave.body.drag.set(100);
        this.nave.body.maxVelocity.set(200);

        this.VirusGRP = this.physics.add.group({
            allowGravity: false
        });
        for (let i = 0; i < 1; ++i){
            this.virus = new Virus(this, this.bounds);
            this.VirusGRP.add(this.virus);
            this.virus.setV();
        }

        this.lastCreatedTime = 0;
        this.freq = 2000;
        this.virusCant = 0;
        this.virusMax = 3;
        this.theresLock = false;

        this.balasPool = new Pool(this, 100, true, this.bounds);	
        //bala para crear la anim
        this.balasPool.spawn(0, 0, 0, 0, true);

            this.overlapBalas = this.physics.add.overlap(this.VirusGRP, this.balasPool._group, (bala, virus) => {
                bala.destroyBala();
                virus.destroyVirus();
            })
    
            this.overlapNave = this.physics.add.overlap(this.VirusGRP, this.nave, (nave, virus) => {            
                virus.destroyVirus();
                setTimeout(()=>{
                    this.scene.restart();
                }, 100);
            })
            

        this.x = this.input.keyboard.addKey('X');
        this.x.on('down', pointer => {
            this.shoot();
        });

    }

    update(t,dt){
        if (this.virusCant <= this.virusMax && t - this.lastCreatedTime > this.freq){
            this.lastCreatedTime = t;
            this.addVirus();
        }
    }

    shoot(){
		this.balasPool.spawn(this.nave.x, this.nave.y, this.nave.rotation, this.nave.body.velocity, false);
    }

    addVirus(){       
        this.virusCant++;
        
        if (this.virusCant == this.virusMax && !this.theresLock){
            this.theresLock = true; 
        }
        else{
            this.theresLock = false; 
        }
        this.virus = new Virus(this, this.bounds, this.theresLock);
        this.VirusGRP.add(this.virus);
        this.virus.setV();
    }

    win(){
        this.scene.get("Planta4").minijuegoCompletado();
        this.overlapBalas.active = false;
        this.overlapNave.active = false;
            //para que no cambie de repente
            setTimeout(()=>{
                this.scene.stop();
                //this.scene.resume('Planta4'); //volvemos a planta
                this.scene.get("Planta4_2").minijuegoCompletado();
            },1000);
    }
}