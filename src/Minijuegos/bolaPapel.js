export default class BolaPapel extends Phaser.GameObjects.Sprite{
    /**
     * Constructor plataforma
     *  @param {Scene} scene - escena en la que aparece
     *  @param {number} x - coordenada x
     *  @param {number} y - coordenada y
     *  @param {String} key - identificador del color del sprite
     */
    constructor(scene, x, y, key, activoDesactivoBasura) {
        //constructor padre
        super(scene,x,y,key);
        //añadir la plataforma a la escena
        scene.add.existing(this);
        //añadir fisicas
        scene.physics.add.existing(this); 
        this.body.allowGravity = false; //no tienen gravedad
        this.pulsadaBola = false;
        this.speed = 350;
        this.initialY = y;
        this.bajando = false;
        this.escala = 5.0;
        this.setScale(this.escala,this.escala);
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
        // Si bola clicada
        else{
            this.setScale(this.escala,this.escala);
            this.escala = this.escala*0.995;
            // Si ya ha llegado al punto mas alto de la pantalla
            if(this.y < 30){
                // Va pa abajo
                this.bajando = true;
                this.body.setVelocityY(this.speed);
                // Activo collider basura (o bola de pende como lo quiera)
                //activoDesactivoBasura(true);
            }
            else if(this.bajando && 250 < this.y){
                this.resetPosition();
                // Desactivo collider
                //activoDesactivoBasura(false);
            }
        }

    }

    resetPosition(){
        this.setPosition(this.x, this.initialY);
        this.escala = 5.0;
        this.setScale(this.escala,this.escala);
        this.body.setVelocityY(0);
        this.pulsadaBola = false;
        this.bajando = false;
    }
}