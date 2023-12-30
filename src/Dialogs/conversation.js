import dialogVictoria from "../Dialogs/dialogText/dialogsP1/Victoria.json"  assert { type: 'json' };
import dialogAlvaro from "../Dialogs/dialogText/dialogsP1/Alvaro.json"  assert { type: 'json' };
import dialogAlma from "../Dialogs/dialogText/dialogsP1/Alma.json"  assert { type: 'json' };
import dialogEmilio from "../Dialogs/dialogText/dialogsP1/Emilio.json"  assert { type: 'json' };
import dialogAndrea from "../Dialogs/dialogText/dialogsP2/Andrea.json"  assert { type: 'json' };
import dialogMelisa from "../Dialogs/dialogText/dialogsP2/Melisa.json"  assert { type: 'json' };
import dialogPedro from "../Dialogs/dialogText/dialogsP2/Pedro.json"  assert { type: 'json' };
import dialogLola from "../Dialogs/dialogText/dialogsP3/Lola.json"  assert { type: 'json' };
import dialogFede from "../Dialogs/dialogText/dialogsP3/Fede.json"  assert { type: 'json' };
import dialogJesus from "../Dialogs/dialogText/dialogsP3/Jesus.json"  assert { type: 'json' };
import dialogArchie from "../Dialogs/dialogText/dialogsP4/Archie.json"  assert { type: 'json' };
import dialogInmaCharlotte from "../Dialogs/dialogText/dialogsP4/InmaCharlotte.json"  assert { type: 'json' };
import dialogConrad from "../Dialogs/dialogText/dialogsP4/Conrad.json"  assert { type: 'json' };
import dialogJefe from "../Dialogs/dialogText/dialogsP5/Jefe.json"  assert { type: 'json' };
import dialogJefeE from "../Dialogs/dialogText/dialogsP5/JefeE.json"  assert { type: 'json' };
import dialogJefeI from "../Dialogs/dialogText/dialogsP5/JefeI.json"  assert { type: 'json' };
import dialogJefeS from "../Dialogs/dialogText/dialogsP5/JefeS.json"  assert { type: 'json' };
import dialogJefeN from "../Dialogs/dialogText/dialogsP5/JefeN.json"  assert { type: 'json' };
import dialogJefeT from "../Dialogs/dialogText/dialogsP5/JefeT.json"  assert { type: 'json' };
import dialogJefeF from "../Dialogs/dialogText/dialogsP5/JefeF.json"  assert { type: 'json' };
import dialogJefeJ from "../Dialogs/dialogText/dialogsP5/JefeJ.json"  assert { type: 'json' };
import dialogJefeP from "../Dialogs/dialogText/dialogsP5/JefeP.json"  assert { type: 'json' };

export default class Conversation{
	/**
	 * Constructor
	 * @param {Scene} scene -  escena
	 * @param {string} who - npc _whoIsTalking
	 */
	constructor(UI, planta, who, visited, insignias){
		this.UI = UI;
		this.who = who;

		this.conversText;

		if (visited) { this.index = 0;}
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
			case "Planta2":
				switch(who){
					case "Andrea":
						this.conversText = dialogAndrea;
						break;
					case "AndreaOver":
						this.conversText = dialogAndrea;
						this.index = 10;
						break;
					case "Melisa":
						this.conversText = dialogMelisa;
						break;
					case "Pedro":
						this.conversText = dialogPedro;
						break;
					default:
				}
				break;

			case "Planta3":
				switch(who){
					case "Lola":
						this.conversText = dialogLola;
						break;
					case "Fede":
						this.conversText = dialogFede;
						break;
					case "Jesus":
						this.conversText = dialogJesus;
						break;
					default:
				}
				break;

			case "Planta4":
				switch(who){
					case "Archie":
						this.conversText = dialogArchie;
						break;
					default:
				}
				break;

			case "Planta4_2":
				switch(who){
					case "Inma":
						this.conversText = dialogInmaCharlotte;
						break;
					case "Charlotte":
						this.conversText = dialogInmaCharlotte;
						break;
					case "Conrad":
						this.conversText = dialogConrad;
						break;
					default:
				}
				break;

					
			case "Planta5":
					this.PType = this.readInsignias(insignias);
					this.dialogSwitch('1');
					/*
					this.conversText = dialogJefe;
					switch (this.PType) {
						case 'ENTJ':
							this.index = 1;
							break;
						case 'ENFJ':
							this.index = 2;
							break;
						case 'ESFJ':
							this.index = 3;
							break;
						case 'ESTJ':
							this.index = 4;
							break;
						case 'ENTP':
							this.index = 5;
							break;
						case 'ENFP':
							this.index = 6;
							break;
						case 'ESFP':
							this.index = 7;
							break;
						case 'ESTP':
							this.index = 8;
							break;
						case 'INTJ':
							this.index = 9;
							break;
						case 'INFJ':
							this.index = 10;
							break;
						case 'ISFJ':
							this.index = 11;
							break;
						case 'ISTJ':
							this.index = 12;
							break;
						case 'INTP':
							this.index = 13;
							break;
						case 'INFP':
							this.index = 14;
							break;
						case 'ISFP':
							this.index = 15;
							break;
						case 'ISTP':
							this.index = 16;
							break;
						default:
							break;
					}
					*/

				break;
			default:
		}

		this.next();
    }	

	next(choice = "noHay"){		
		if (this.conversText.Talk[this.index].who != "End") {
			if (this.conversText.Talk[this.index].who == "Action"){
				let what = this.conversText.Talk[this.index].what;
				this.index = this.conversText.Talk[this.index].nextId;
				this.UI.actions(what);
			}
			else if (this.conversText.Talk[this.index].who == "Choice"){ //TIENE Q TOMAR UNA CHOICE)	
				if (choice == "noHay"){ //PRIM VEZ
					this.UI.initDialog(this, this.conversText.Talk[this.index].who, 
					"· " + this.conversText.Talk[this.index].a + "\n· " + this.conversText.Talk[this.index].b,
					this.conversText.Talk[this.index].a,
					this.conversText.Talk[this.index].b)
				}
				else if (choice == "noSabe") {
					this.UI.initDialog(this, "ChoiceStay", 
					"Decide para avanzar.\n. " + this.conversText.Talk[this.index].a + "\n· " + this.conversText.Talk[this.index].b,
					this.conversText.Talk[this.index].a,
					this.conversText.Talk[this.index].b)
				}
				if (choice == "a"){ //ha elegido a
					this.index = this.conversText.Talk[this.index].nextA;
					this.UI.initDialog(this, this.conversText.Talk[this.index].who, this.conversText.Talk[this.index].frase);
					this.index = this.conversText.Talk[this.index].nextId;
				}
				else if (choice == "b"){ //ha elegido b
					this.index = this.conversText.Talk[this.index].nextB;
					this.UI.initDialog(this, this.conversText.Talk[this.index].who, this.conversText.Talk[this.index].frase);
					this.index = this.conversText.Talk[this.index].nextId;
				}
			}
			else if (this.conversText.Talk[this.index].who == "Change"){ //CAMBIO D JSON)
				this.dialogSwitch(this.conversText.Talk[this.index].pTypeId);
				this.index = 1;
				this.next();
			}

			else {
				console.log(this.conversText.Talk[this.index].frase);
				this.UI.initDialog(this, this.conversText.Talk[this.index].who, this.conversText.Talk[this.index].frase);
				this.index = this.conversText.Talk[this.index].nextId;
			}
		}
		else {		
			this.UI.endDialog();
		}
	}

	readInsignias(insignias){
		var pType = ['E', 'N', 'T', 'J']; //Default person

		if(insignias[1]) pType[0] = 'I';
		if(insignias[3]) pType[1] = 'S';
		if(insignias[5]) pType[2] = 'F';
		if(insignias[7]) pType[3] = 'P';

		var stringPType = pType[0] + pType[1] + pType[2] + pType[3];
    	return {pType};
	}

	dialogSwitch (p){
		switch (p) {
			case '0':
				switch (this.PType.pType[0]) {
					case 'E':		
						this.conversText = dialogJefeE;
						break;
					case 'I':			
						this.conversText = dialogJefeI;
						break;
					default:
						break;
				}
			break;

			case '1':
				switch (this.PType.pType[1]) {
					case 'N':	
						this.conversText = dialogJefeN;
						break;
					case 'S':				
						this.conversText = dialogJefeS;
						break;
					default:
						break;
				}
			break;

			case '2':
				switch (this.PType.pType[2]) {
					case 'T':							
						this.conversText = dialogJefeT;
						break;
					case 'F':							
						this.conversText = dialogJefeF;
						break;
					default:
						break;
				}
			break;

			case '3':
				switch (this.PType.pType[3]) {
					case 'J':						
						this.conversText = dialogJefeJ;
						break;
					case 'P':				
						this.conversText = dialogJefeP;
						break;
					default:
						break;
				}
			break;
		
			default:
			break;
		}
	}
}




