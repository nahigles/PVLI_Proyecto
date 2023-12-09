export default class Nave extends Phaser.GameObjects.Sprite {
    /**
	 * Constructor
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} key - texture
	 */
    constructor(scene, x, y, key, bounds){
		// Llamamos al constructor del padre
		super(scene, x, y, key);
        this.speed = 2;
        this.setScale(1,1); 

        // Guardamos escena y añadimos ajolote a escena
		this.scene = scene;
		this.scene.add.existing(this);
        this.key = key;

        this.bounds = bounds;

        //FISICAS
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt);

        this.x += this.speed;

        this.screenWrap();

	}

    screenWrap () {

        if (this.x < this.bounds.x)
        {
            this.x = this.bounds.x + this.bounds.w;
        }
        else if (this.x > this.bounds.x + this.bounds.w)
        {
            this.x = this.bounds.x;
        }
    
        if (this.y < this.bounds.y)
        {
            this.y = this.bounds.x + this.bounds.h;
        }
        else if (this.y > this.bounds.y + this.bounds.h)
        {
            this.y = 0;
        }
    
    }
}