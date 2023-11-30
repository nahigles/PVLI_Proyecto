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
	constructor(UI, planta, who){
		this.UI = UI;
		this.who = who;

		this.conversText;
		this.index = 1; //por ahora vas a empezar por el primero
		//(no sabemos si queremos tener alreadyTalked)

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

		this.initConversation();
    }	

	initConversation(){		

		this.UI.initDialog(this, this.conversText.Talk[this.index].who, this.conversText.Talk[this.index].frase);
	}

	next(){
		console.log("conversationNext");
		if (this.conversText.Talk[this.index].choice){
			//algo d la choice
		}
		else {
			this.index = this.conversText.Talk[this.index].nextId;
			this.initConversation();
		}
	}
}




