import Bala from '../Minijuegos/bala.js'

export default class Pool {
	/**
	 * @param {Scene} scene - escena en la que aparecen los elementos de la pool
	 * @param {Number} max - elemento html que define la cantidad máxima de la pool sobre la que no queremos que crezca más
	 * @param {Boolean} reuse - decimos si queremos reutilizar elementos de la pool que están vivos si no hay más remedio
	 */
	constructor (scene, max, reuse, bounds) {
		this._group = scene.add.group();
		this.max = max;
		this.scene = scene;
		this.reuse = reuse;
		this.bounds = bounds;
	}
	
	addEntity(entity) {
		this._group.add(entity);
		this._group.killAndHide(entity);
	}
	
	spawn (x, y, rot) {
		let entity = this._group.getFirstDead();
		console.log("spawn");
		
		if(!entity){		
			console.log("!entity");

			if (this._group.getLength() < this.max) {
				entity = new Bala(this.scene, x, y, rot, this, this.bounds);				
				console.log("Pool created: " + entity)	
				this.addEntity(entity);
			} 
			 //Como hemos mencionado podemos querer reutilizar el elemento que más tiempo ha estado vivo si no tenemos otra opción
			else if (this.reuse.checked) { 
				entity = this._group.getFirstNth(1, true);
				this._group.remove(entity);				
				entity.x = x;
				entity.y = y;
				this._group.add(entity);	
				console.log ("reused");
			}			
		}		

		// Cuando ya hemos conseguido la entidad de alguna forma la reutilizamos
		if (entity) {
			console.log("dead relive");
			entity.setActive(true);
			entity.setVisible(true);
			entity.activate();
			entity.play(entity.key, true);

			//entity.body.checkCollision.none = false;
		}

		console.log(entity);
		return entity;
	}
	
	/**
	 * Método para liberar una entidad
	 * @param {Object} entity - entidad de la pool que queremos marcar como libre
	 */
	release (entity) {
		//entity.body.checkCollision.none = true;
		this._group.killAndHide(entity);
		/*
		entity.setActive(false);
		entity.setVisible(false);
		*/
	}


	getPhaserGroup(){
		return this._group;
	}
}
