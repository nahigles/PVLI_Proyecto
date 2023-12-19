export default class Ajolote extends Phaser.GameObjects.Sprite {
    /**
	 * Constructor
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
    constructor(scene, x, y, key){
		// Llamamos al constructor del padre
		super(scene, x, y, key);
        this.speed = 200;
        this.setScale(2.5,2.5); 

        // Guardamos escena y añadimos ajolote a escena
		this.scene = scene;
		this.scene.add.existing(this);
        this.key = key;

        //FISICAS
        scene.physics.world.enable(this);
        this.body.setAllowGravity(true);
        // INPUT
		this.inputEnabled = true;
		this.a = this.scene.input.keyboard.addKey('A'); //izquierda
		this.d = this.scene.input.keyboard.addKey('D'); //derecha
		this.cursors = this.scene.input.keyboard.createCursorKeys();

		// Animaciones
		/*this.scene.anims.create({
			key: 'jump',
			frames: scene.anims.generateFrameNumbers(key, {start:0, end:1}),
			frameRate: 2,
			repeat: -1
		});*/
		this.scene.anims.create({
			key: 'lookingUp',
			frames: scene.anims.generateFrameNumbers(key, {start:26, end:26}),
			frameRate: 2,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'lookingDown',
			frames: scene.anims.generateFrameNumbers(key, {start:28, end:28}),
			frameRate: 2,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'jumpAjolote',
			frames: scene.anims.generateFrameNumbers(key, {start:29, end:31}),
			frameRate: 8,
			repeat: 0
		});
		this.play('lookingDown');
		this.body.setSize(this.width * 0.7, this.height * 0.6);
		this.body.setOffset(this.width * 0.1,	this.height * 0.35);
		
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt); 
        if(this.inputEnabled)
		{
			// Si se pulsa letra A
			if(this.a.isDown || this.cursors.left.isDown){ 
				this.body.setVelocityX(-this.speed);
				this.setFlip(true, false);
			} 
			// Si se pulsa letra D
			else if(this.d.isDown || this.cursors.right.isDown){
				this.body.setVelocityX(this.speed);
				this.setFlip(false, false);
			} 
			else {
				this.body.setVelocityX(0);
			}
		}
	}
}