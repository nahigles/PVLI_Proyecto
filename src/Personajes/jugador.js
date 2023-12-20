
export default class Jugador extends Phaser.GameObjects.Container {
	/**
	 * Constructor del jugador
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 */
	constructor(scene, x, y){
		
		// Llamamos al constructor del padre
		super(scene, x, y);
		this.speed = 120; // Nuestra velocidad de movimiento será 140

		
		// Animaciones del jugador
		this.scene.anims.create({
			key: 'walk',
			frames: scene.anims.generateFrameNumbers('playerAnim', {start:8, end:11}),
			frameRate: 2,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'idle',
			frames: scene.anims.generateFrameNumbers('playerAnim', {start:0, end:1}),
			frameRate: 2,
			repeat: -1
		});

		
		this.scene.anims.create({
			key: 'jump',
			frames: scene.anims.generateFrameNumbers('playerAnim', {start:32, end:35}),
			frameRate: 2,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'sit',
			frames: scene.anims.generateFrameNumbers('playerAnim', {start:40, end:41}),
			frameRate: 2,
			repeat: -1
		});
		
		// Guardamos escena y añadimos jugador a escena
		this.scene = scene;
		this.scene.add.existing(this);

        //FISICAS
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(true);
		this.body.onOverlap = true;
		

		//sprite jug
		this.jugador = new Phaser.GameObjects.Sprite(scene, 0, 0, 'playerAnim', 0);
		this.jugador.setOrigin(0.3,0).setScale(1.0,1.0);
		
		this.add(this.jugador); // Añadimos al contenedor

		// Ejecutamos la animación 'idle'
		this.jugador.play('idle');

		// INPUT
		this.inputEnabled = true;
		this.a = this.scene.input.keyboard.addKey('A'); //izquierda
		this.d = this.scene.input.keyboard.addKey('D'); //derecha
		//this.e = this.scene.input.keyboard.addKey('E'); //interact
		this.cursors = this.scene.input.keyboard.createCursorKeys();

		// Físicas
		this.body.width = 10;
		this.body.height = 24;
		scene.physics.add.existing(this);
		
		//Misiones
		this.extrovertido = false;
		this.introvertido = false;
		this.sensitivo = false;
		this.intuitivo = false;
		this.thinker = false;
		this.feeler =  false;
		this.juzgador = false;
		this.perceptivo =  false;

    }
	preUpdate(t, dt){
		// preupdate del padre, en este caso container
		this.jugador.preUpdate(t, dt);
		//console.log(this.inputEnabled);
		if(this.inputEnabled)
		{
			// Si se pulsa letra A
			if(this.a.isDown || this.cursors.left.isDown){ 
				this.body.setVelocityX(-this.speed);
				this.jugador.setFlip(true, false);
				this.jugador.play('walk', true);
				//this.scene.moveButtonLeft();
			} 
	
			// Si se pulsa letra D
			else if(this.d.isDown || this.cursors.right.isDown){
				this.body.setVelocityX(this.speed);
				this.jugador.setFlip(false, false);
				this.jugador.play('walk', true);
				//this.scene.moveButtonRight();
			} 
			else {
				this.jugador.play('idle', true);
				this.body.setVelocityX(0);
			}
		}
	}	

	onPauseInput(bol){
		this.inputEnabled = !bol;
	}

	sitAnim(){
		this.jugador.play('sit', true);
	}

	jumpAnim(){
		this.jugador.play('jump', true);
		this.jugador.setFlip(false, false);
	}
	// Método vacio necesario para creación de objetos desde tilemap
	setTexture(){}

}
