export default class Button extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor del pato
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 */
	constructor(scene, x, y, key, action){
		// Llamamos al constructor del padre
		super(scene, x, y);

        // Añadimos sprite a la escena
		this.scene.add.existing(this);
		this.setInteractive();
		this.setScale(0.5,0.5);

        // Guardamos escena
		this.scene = scene;

		// Timer
		this.timeAcum = 0;
		this.pulsadoBoolean = false;
		this.actionMethod = action;
		this.self = this;


        this.scene.anims.create({
			key: key,
			frames: scene.anims.generateFrameNumbers(key, {start:0, end:0}),
			frameRate: 1,
			repeat: -1
		});

        this.play(key);

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

		if(this.pulsadoBoolean){

			if(this.timeAcum > 1000){ // this.timeAcum > tiempo de espera que queramos para cambiar de escena
				//this.scene.play();
				this.actionMethod();
				this.timeAcum = 0;
				this.pulsadoBoolean = false;
			}

			this.timeAcum = this.timeAcum + dt;
		}
	}

    	/**
	 * Boton pulsado
	 * @param {Pointer} pointer 
	 */
	pulsado(pointer){
		this.pulsadoBoolean = true;
	}
}
