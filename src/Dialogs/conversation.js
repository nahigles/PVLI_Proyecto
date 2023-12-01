import dialogVictoria from "../Dialogs/dialogText/dialogsP1/Victoria.json"  assert { type: 'json' };
import dialogAlvaro from "../Dialogs/dialogText/dialogsP1/Alvaro.json"  assert { type: 'json' };
import dialogAlma from "../Dialogs/dialogText/dialogsP1/Alma.json"  assert { type: 'json' };
import dialogEmilio from "../Dialogs/dialogText/dialogsP1/Emilio.json"  assert { type: 'json' };

export default class Conversation{
	/**
	 * Constructor del pato
	 * @param {Scene} scene -  escena
	 * @param {string} who - npc _whoIsTalking
	 */
	constructor(UI, planta, who, visited){
		this.UI = UI;
		this.who = who;

		this.conversText;

		if (visited) { this.index = 0; }
		else { this.index = 1; }//por ahora vas a empezar por el primero

		switch (planta){
			case "Planta1":
				switch(who){
					case "Victoria":
						this.conversText = dialogVictoria;
						break;
					case "Alvaro":
						this.conversText = dialogAlvaro;
						break;
					case "Alma":
						this.conversText = dialogAlma;
						break;
					case "Emilio":
						this.conversText = dialogEmilio;
						break;
					default:
				}
				break;
			default:
		}

		// NO SE POR Q PUSE ESTO :/
		/*
		if (this.conversText.Talk[this.index].choice) {this.next();}
		else {
			this.UI.initDialog(this, this.conversText.Talk[this.index].who, this.conversText.Talk[this.index].frase);
		}
		*/

		this.next();
    }	

	next(choice = "noHay"){
		if (this.conversText.Talk[this.index].choice){ //TIENE Q TOMAR UNA CHOICE	
			console.log("choice" + this.index);
			this.UI.initDialog(this, this.conversText.Talk[this.index].who, 
			this.conversText.Talk[this.index].frase,
			this.conversText.Talk[this.index].a,
			this.conversText.Talk[this.index].b)
		}
		else if (choice == "noSabe") {
			//se hace ya en uiScene creo?
		}
		else if (this.conversText.Talk[this.index].isLast){ //ERA LA ULT 
			console.log("last" + this.index);
			this.UI.endDialog();
		}
		else if (false){ //ha elegido a

		}
		else if (false){ //ha elegido b

		}
		else { //SINMAS SEGUIMOS
			console.log("next" + this.index); 
			this.UI.initDialog(this, this.conversText.Talk[this.index].who, this.conversText.Talk[this.index].frase);

			this.index = this.conversText.Talk[this.index].nextId;
		}
	}
}




