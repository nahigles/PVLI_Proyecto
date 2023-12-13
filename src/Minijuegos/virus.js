export default class Virus extends Phaser.GameObjects.Sprite {
    /**
	 * Constructor
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 */
    constructor(scene, bounds){
		// Llamamos al constructor del padre
        let x = Phaser.Math.Between(bounds.x+10, bounds.x+bounds.w-10);
        let y = Phaser.Math.Between(bounds.y+10, bounds.y+bounds.h-10);
        
        let key;
        let speed;
        if (Math.random() < 0.5){
            key = 'virusA';
            speed = 1;
        }
        else {
            key = 'virusB';
            speed = 2;
        }

		super(scene, x, y, key);

        // Guardamos escena y añadimos ajolote a escena
		this.scene = scene;
		this.scene.add.existing(this);

        this.bounds = bounds;
        this.speed = speed;

        //FISICAS
        scene.physics.world.enable(this); 
        /*       
        this.dirX = Phaser.Math.Between(-1, 1);
        this.dirY = Phaser.Math.Between(-1, 1);
        this.body.setVelocity(10, 20);// = {Phaser.Math.Between(-2, 2), Math.Between(-2, 2)};
        */
        console.log(this);
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt);
        /*
        this.x += this.dirX*this.speed;
        this.y += this.dirY*this.speed;
        */
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