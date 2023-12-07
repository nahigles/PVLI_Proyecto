export default class Basura extends Phaser.GameObjects.Sprite{
    /**
     * Constructor plataforma
     *  @param {Scene} scene - escena en la que aparece
     *  @param {number} x - coordenada x
     *  @param {number} y - coordenada y
     *  @param {String} key - identificador del color del sprite
     */
    constructor(scene, x, y, key) {
        //constructor padre
        super(scene,x,y,key);
        //añadir la plataforma a la escena
        scene.add.existing(this);
        //añadir fisicas
        scene.physics.add.existing(this); 
        this.body.allowGravity = false; //no tienen gravedad
        this.touch = false;

        this.setScale(4.0,4.0);
        this.desplazamiento = 25;
        this.speed = 40;

        //limite derecha e izquierda de movimiento
        this.limDer = 500; 
        this.limIzq = 0;

        this.body.setVelocity(this.speed, 0);
    }  
    
    create(){

      
    }

    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        
        if(this.x < this.limIzq) {
            this.body.setVelocity(this.speed, 0);
        }
        if(this.x > this.limDer) {
            this.body.setVelocity(-this.speed, 0);
        }
    }
}