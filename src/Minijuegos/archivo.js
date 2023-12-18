export default class Archivo extends Phaser.GameObjects.Container{
    /**
	 * Contructor de la carpeta
	 * @param {Scene} scene, escena en la que se añade la carpeta
     * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
     * @param {string} keyID - id
     * @param {string} keyFolder - id
     * @param {string} keyImg - id
     * @param {string} keyText - id
	 */
    constructor(scene,x,y, keyFolder, keyID, keyImg, keyText) {
        // Constructor del padre 
        super(scene,x,y);
        this.setScale(0.3,0.3);

        // Añadimos la carpeta a la escena 
        this.scene = scene;
		this.scene.add.existing(this);

        const imgFolder =  new Phaser.GameObjects.Sprite(this.scene, 0, 0, keyImg, 0);
        const text = new Phaser.GameObjects.BitmapText(this.scene,0, 0, keyText, keyFolder).setFontSize(32);
        
        this.id = keyID;

        this.add([imgFolder, text]).setScale(1,1);
        this.setSize(imgFolder.width, imgFolder.height);
        
        this.setInteractive();

        this.on('pointerover', () =>
        {
            
            imgFolder.setTint(0x44ff44);
            console.log('aaaaaaaaaaa');
            
        });

        this.on('pointerout', () =>
        {
            
            imgFolder.clearTint();
            
        });
    }
    create(){}

    preUpdate(t, dt){
		//super.preUpdate(t, dt);
	}
}