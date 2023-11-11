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

		// Animaciones del jugador
		this.scene.anims.create({
			key: 'walk',
			frames: scene.anims.generateFrameNumbers(key, {start:8, end:11}),
			frameRate: 2,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'idle',
			frames: scene.anims.generateFrameNumbers(key, {start:0, end:1}),
			frameRate: 2,
			repeat: -1
		});


		// Guardamos escena y añadimos jugador a escena
		this.scene = scene;
		this.scene.add.existing(this);

        //FISICAS
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
		
		//sprite jug
		this.jugadorSprite = new Phaser.GameObjects.Sprite(scene, x-100, y-60, key, 0);
		this.jugadorSprite.setOrigin(0,0).setScale(3.0,3.0);
		this.add(this.jugadorSprite); // Añadimos al contenedor
		
		// Ejecutamos la animación 'idle'
		this.jugadorSprite.play('idle')
		console.log(this);

		// Speed
		this.speed = 3;

		// INPUT
		this.a = this.scene.input.keyboard.addKey('A'); //izquierda
		this.d = this.scene.input.keyboard.addKey('D'); //derecha
		this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

	preUpdate(t, dt){
		// preupdate del padre, en este caso container
		this.jugadorSprite.preUpdate(t, dt);
		
		// Si se pulsa letra A
		if(this.a.isDown || this.cursors.left.isDown){ 
			this.x += (dt/20)*2*-this.speed;
			this.jugadorSprite.setFlip(true, false);
			this.jugadorSprite.play('walk', true);
		} 

		// Si se pulsa letra D
		else if(this.d.isDown || this.cursors.right.isDown){
			this.x += (dt/20)*2*this.speed;
			this.jugadorSprite.setFlip(false, false);
			this.jugadorSprite.play('walk', true);
		} 

		else {
			this.jugadorSprite.play('idle', true)
		}
	}
}
