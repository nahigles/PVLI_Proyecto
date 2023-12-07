export default class BolaPapel extends Phaser.GameObjects.Sprite{
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
        this.pulsadaBola = false;
        this.speed = 150;
        this.initialY = y;
        this.bajando = false;
        this.setScale(5.0,5.0);
    }  
    
    create(){
        this.input.mouse.disableContextMenu();
    }

    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        const pointer = this.scene.input.activePointer;

        // Si no ha sido pulsado
        if(!this.pulsadaBola){
            this.x = pointer.worldX

            // Si clica
            if (pointer.leftButtonDown())
            {
                this.pulsadaBola = true;
                this.body.setVelocityY(-this.speed);
            }
        }
        else{
            // Si ya ha llegado al punto mas alto de la pantalla
            // Va pa abajo
            if(this.y < 0){
                this.bajando = true;
                this.body.setVelocityY(this.speed);
                // Activo collider basura (o bola de pende como lo quiera)
            }
            else if(this.initialY < this.y){
                this.body.setVelocityY(0);
                this.pulsadaBola = false;
                this.bajando = false;
                // Desactivo collider
            }
        }

        if(this.pulsadaBola && !this.bajando){
            
        }
    }

    resetPosition(){
        this.body.setPosition(this.x, this.initialY,0);
    }
}