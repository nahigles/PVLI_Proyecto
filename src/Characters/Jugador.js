export default class Jugador extends Phaser.GameObjects.Container {
	/**
	 * Constructor del pato
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 */
	constructor(scene, x, y, key){
		// Llamamos al constructor del padre
		super(scene, x, y);

		// Guardamos escena y añadimos jugador a escena
		this.scene = scene;
		this.scene.add.existing(this);

		//sprite jug
		this.jugador = new Phaser.GameObjects.Sprite(scene, x, y, key, 0);
		this.jugador.setOrigin(0,0).setScale(0.5,0.5);
		this.add(this.jugador); // Añadimos al contenedor

		// Speed
		this. speed = 3;

		// INPUT
		this.a = this.scene.input.keyboard.addKey('A'); //izquierda
		this.d = this.scene.input.keyboard.addKey('D'); //derecha
    }

	preUpdate(t, dt){
		// preupdate del padre, en este caso container
		this.jugador.preUpdate(t, dt);
		
		// Si se pulsa letra A
		if(this.a.isDown){ 
			this.x += (dt/20)*2*-this.speed;
		} 

		// Si se pulsa letra D
		else if(this.d.isDown){
			this.x += (dt/20)*2*this.speed;
		} 

	}
}
