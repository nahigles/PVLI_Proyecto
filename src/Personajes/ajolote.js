export default class NPCBase extends Phaser.GameObjects.Sprite {
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
    }
}