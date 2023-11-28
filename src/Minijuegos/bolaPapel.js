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
        this.touch = false;

    }  
    
    create(){
        //this.input.mouse.disableContextMenu();
    }

    preUpdate(t,dt) {
        super.update(t,dt);
        const pointer = this.input.activePointer;

        this.x = pointer.worldX
        console.log(this.x);
    }
}