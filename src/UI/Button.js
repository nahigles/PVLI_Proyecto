/**
 * Sprite de boton que realizara acciones al ser pulsado
 */
export default class Button extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor del boton
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 * @param {string} key - nombre sprite
	 * @param {Function} actions - acciones que se realizan al pulsar el boton
	 */
	constructor(scene, x, y, key, actions, sound){
		// Llamamos al constructor del padre
		super(scene, x, y, key);

        // Añadimos sprite a la escena
		this.scene.add.existing(this);
		this.setInteractive();
		this.setScale(0.5,0.5);

        // Guardamos escena y key
		this.scene = scene;
		this.key = key;
		
		// Timer
		this.timeAcum = 0;
		this.pulsadoBoolean = false;
		this.actionsMethods = actions;
		this.self = this;
		this.mySound = sound; 

		if(key === 'playButton2') {
			this.scene.anims.create({
				key: 'playButton2',
				frames: scene.anims.generateFrameNumbers('playButton2', {start:0, end:0}),
				frameRate: 1,
				repeat: -1
			});
			this.play('playButton2');
		}

        this.on('pointerdown', (pointer)=>
        {
			this.pulsado(pointer);
			this.setTint(0xb103fc);
			
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

			if(this.timeAcum > 700){ // this.timeAcum > tiempo de espera que queramos para cambiar de escena
				this.actionsMethods();
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
		this.mySound.play();
	}

	changeScale (x, y){
		this.setScale(x,y);
	}
}