/**
 * Sprite de carpeta que se utiliza en la mision de la planta 1
 * Controla su movimiento lateral, su destruccion
 */
export default class Carpeta extends Phaser.GameObjects.Sprite{
    /**
	 * Contructor de la carpeta
	 * @param {Scene} scene, escena en la que se añade la carpeta
     * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
    constructor(scene,x,y,key) {
        //constructor del padre (Sprite)
        super(scene,x,y, key);
        this.setScale(0.3,0.3);
        // Añadimos la carpeta a la escena 
        this.scene = scene;
		this.scene.add.existing(this);
        //fisicas
        scene.physics.add.existing(this); 
        this.body.allowGravity = false; //no tienen gravedad
        //propiedad para saber si ha sido cogida por el jugador
        this.catch = false;
        this.speed = 120;
        this.a = this.scene.input.keyboard.addKey('A'); //izquierda
		this.d = this.scene.input.keyboard.addKey('D'); //derecha
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
    //para saber si ha sido cogida por el jugador
    isCatch(){
        return this.catch;
    }
    //cuando se coge debe seguir al jugador
    followPlayer(){
        this.catch = true;
        this.y += 10;
        this.x = this.scene.jugador.x + 5;
    }
    die(){
        this.destroy();
    }
    preUpdate(t, dt){
		super.preUpdate(t, dt);
        if(this.catch){
			if(this.a.isDown || this.cursors.left.isDown){ 
				this.body.setVelocityX(-this.speed);
			} 
			else if(this.d.isDown || this.cursors.right.isDown){
				this.body.setVelocityX(this.speed);
			} 
            else{
                this.body.setVelocityX(0);
            }
        }
	}
}