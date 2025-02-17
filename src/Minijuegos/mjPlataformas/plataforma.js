/**
 * Sprite de plataforma que se utiliza en el minijuego de la planta 1
 * Controla su movimiento lateral, su destruccion
 */
export default class Plataforma extends Phaser.GameObjects.Sprite{
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
        this.body.setImmovable(true);   //no se mueve si el jugador esta encima
        this.body.allowGravity = false; //no tienen gravedad
        this.setScale(0.2,0.2);       //escala para sprite
        this.desplazamiento = 50;       //cuanto se van a mover
        //limite derecha e izquierda de movimiento
        this.limDer = this.x + this.desplazamiento; 
        this.limIzq = this.x - this.desplazamiento;
        this.touch = false;
        //solo se le agrega velocidad a las plataformas verdes y azules
        if(key==='verde')  {
            this.direccion = 1;
            this.body.setVelocity(25* this.direccion, 0);
        }  
        if(key==='azul')  {
            this.direccion = -1;
            this.body.setVelocity(25* this.direccion, 0);
        }  
    }
    //para las plataformas moradas, la primera vez que se salta cambia la textura y la segunda vez destruye la plataforma
    hit(){
        if(this.texture.key==='morado')  {
            this.setTexture('moradoRota');
        }
        if(this.texture.key==='moradoRota' && this.touch){
            this.destroy();
        }
    }
    //si no ha sido saltada por el jugador ya, se marca como saltada
    touched(){
        if(!this.touch) {
            this.touch = true;
        }
    }
    update() {
        if(this.texture.key==='verde' || this.texture.key==='azul')  {
            if(this.x < this.limIzq) {
                this.direccion = 1;
                this.body.setVelocity(25 * this.direccion, 0);
            }
            if(this.x > this.limDer) {
                this.direccion = -1;
                this.body.setVelocity(25 * this.direccion, 0);
            }
        }
    }
   
}