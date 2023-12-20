export default class Button extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor del boton
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 * @param {string} key - nombre sprite
	 * @param {Function} action1 - accion que se realiza al pulsar el boton
	 * @param {Function} action2 - accion que se realiza al pulsar el boton
	 * @param {Function} action3 - accion que se realiza al pulsar el boton
	 * @param {Function} action4 - accion que se realiza al pulsar el boton
	 */
	constructor(scene, x, y, key, action1, action2, action3,action4, sound){
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
		this.action1Method = action1;
		this.action2Method = action2;
		this.action3Method = action3;
		this.action4Method = action4;
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
				//this.scene.play();
				this.action1Method();
				this.action2Method();
				this.action3Method();
				this.action4Method();
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