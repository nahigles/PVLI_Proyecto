export default class NPCBase extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor del pato
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
	constructor(scene, x, y, key){
		// Llamamos al constructor del padre
		super(scene, x, y, key, 0);

		/*
		// Animacion del NPC
		this.scene.anims.create({
			key: 'idleNPC',
			frames: scene.anims.generateFrameNumbers(key, {start:0, end:1}),
			frameRate: 2,
			repeat: -1
		});
		*/

		// Guardamos escena y añadimos NPC a escena
		this.scene = scene;
		this.scene.add.existing(this);
        
        //FISICAS
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
		this.body.onOverlap = true;
		
		//sprite NPC
		this.setOrigin(0,0).setScale(3.0,3.0);
		
		// Ejecutamos la animación 'idle'
		/*this.play('idleNPC')*/
		console.log(this);

		// Speed
		this.speed = 3;

		// INPUT
		this.e = this.scene.input.keyboard.addKey('E'); //interact
    }

	preUpdate(t, dt){
        //this.preUpdate(t, dt); //al poner esto dejan de salir los dos
        /*this.play('idleNPC', true)*/
	}

    interact(){
		if(this.e.isDown){
			console.log('HOLA!');			
		}
    }
}