/**
 * Sprite de basura que se utiliza en el minijuego de la planta 2
 * Controla su movimiento lateral, con su velocidad,direccion y limites 
 */
export default class Basura extends Phaser.GameObjects.Sprite{
    /**
     * Constructor basura
     *  @param {Scene} scene - escena en la que aparece
     *  @param {number} x - coordenada x
     *  @param {number} y - coordenada y
     *  @param {String} key -
     */
    constructor(scene, x, y, key) {
        //constructor padre
        super(scene,x,y,key);
        
        scene.add.existing(this);
        //añadir fisicas
        scene.physics.add.existing(this); 
        this.body.allowGravity = false; //no tienen gravedad

        this.setScale(2.0,2.0);
        this.speed = 5;
        this.dir = 1;

        //limite derecha e izquierda de movimiento
        this.limDer = 550; 
        this.limIzq = 50;

        this.body.setVelocity(this.speed, 0);
        //this.body.enable = false;
    }  
    
    create(){
    }

    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        
        if(this.x < this.limIzq) {
            this.dir = 1;
        }
        else if(this.x > this.limDer) {
            this.dir = -1;
        }
        this.x += (dt/20)*2*this.speed*this.dir;
    }

    basuraCollider(enableBool){
        this.body.enable = enableBool;
    }

    stopBasura(){
        this.body.setVelocity(0, 0);
    }
}