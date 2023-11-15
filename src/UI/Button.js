export default class Button extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor del pato
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 */
	constructor(scene, x, y, key){
		// Llamamos al constructor del padre
		super(scene, x, y);

        // Añadimos sprite a la escena
		this.scene.add.existing(this);
		this.setInteractive();

        // Guardamos escena
		this.scene = scene;

		this.self = this;

        this.scene.anims.create({
			key: 'playButton2',
			frames: scene.anims.generateFrameNumbers('playButton2', {start:0, end:0}),
			frameRate: 1,
			repeat: -1
		});

        this.play('playButton2');

        this.on('pointerdown', (pointer)=>
        {
			this.pulsado(pointer);
            this.setTint(0xff0000);

        });

        this.on('pointerout', (pointer)=>
        {

            this.clearTint();

        });

        this.on('pointerup', (pointer)=>
        {

            this.clearTint();

        });
    }

	preUpdate(t, dt){
        // Si ponemos animación descomentar
        super.preUpdate(t, dt)
	}

	
    	/**
	 * Boton pulsado
	 * @param {Pointer} pointer 
	 */
	pulsado(pointer){
		// Animacion si queremos
		this.scene.play();
		console.log("Boton pulsadoOOOOOOOO");
	}

	
}
