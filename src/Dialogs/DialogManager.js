import dialogEvents from "./EventCenter.js";
import dialogText from "../Dialogs/dialogText.json"  assert { type: 'json' };

export default class DialogManager {
  constructor(scene, UI, player, NPCGroup) {
    this.scene = scene;
    this.UI = UI;
    this.isTalking = false;

    this.NPCGroup = NPCGroup;
    scene.physics.add.overlap(this.NPCGroup, player);

    dialogEvents.on("wantToTalk", this.wantToTalk, this);
  }

  wantToTalk() {
    var talker = this._whoIsTalking();
    if(talker != 'NONE'){        
      console.log('empezamos a hablar con ' + talker.name);
      this.isTalking = true;
      //this.UI.initDialog(talker.name);
      
      
      this.name = talker.name;
      if (this.name == "Emilio")
        this.text = dialogText.Emilio; ///QUIERO PONER TALKER NAME!!!!!!!!!!!!!!!
      else if (this.name == "Aurelia")
        this.text = dialogText.Aurelia; ///QUIERO PONER TALKER NAME!!!!!!!!!!!!!!!
      else if (this.name == "Julia")
        this.text = dialogText.Julia; ///QUIERO PONER TALKER NAME!!!!!!!!!!!!!!!

      this.UI.initDialog(this.text);
  
    }
  }

  _whoIsTalking() {
    var talker = 'NONE';

    this.NPCGroup.getChildren();
    for (const NPC of this.NPCGroup.getChildren()) {
      if (NPC.body.embedded) NPC.body.touching.none = false; //embedded es overlapeado y además no se mueve
      let touching = !NPC.body.touching.none;

      if (touching) {
        talker = NPC;
      }
    }

    return talker;
  }
}
