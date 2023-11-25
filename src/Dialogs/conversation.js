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

		switch (planta){
			case "Planta1":
				switch(who){
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
		this.UI.initDialog(this, this.who);
	}
}




