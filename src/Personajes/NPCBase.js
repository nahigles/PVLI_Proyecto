/**
 * Sprite de NPC
 * Necesario el nombre para identificar que NPC es
 */

export default class NPCBase extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
     * @param {string} name - NPC name
	 */
	constructor(scene, x, y, key, name){
		// Llamamos al constructor del padre
		super(scene, x, y, key, 0);

		
		// Animacion del NPC
		this.scene.anims.create({
			key: key,
			frames: scene.anims.generateFrameNumbers(key, {start:0, end:1}),
			frameRate: 2,
			repeat: -1
		});

		// Guardamos escena y añadimos NPC a escena
		this.name = name;
		this.key = key;
		this.scene = scene;
		this.scene.add.existing(this);
        
        //FISICAS
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
		this.body.onOverlap = true;
		
		// Ejecutamos la animación 'idle'
		this.play(key, true);

		// Speed
		this.speed = 3;
	}

	preUpdate(t, dt){
        super.preUpdate(t, dt); //al poner esto dejan de salir los dos
        this.play(this.key, true)
	}
}