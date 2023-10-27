export default class Jugador {
	/**
	 * Constructor del pato
	 * @param {Scene} scene -  escena
	 * @param {number} x - posición X en la escena
	 * @param {number} y - posición Y en la escena
	 */
	constructor(scene, x, y){
		// Llamamos al constructor del padre, este realmente puede recibir 7 parámetros (scene, x, y, key, hat, xHat, yHat), pero como esto es JS lo que no pasemos será undefined... y de lo que pasamos de más, no se hará nada
		// The cake is a lie
		super(scene, x, y, 'jeremy');

    }
}
