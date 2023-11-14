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

    if (this.isTalking) {
      //this.isTalking = !this.scene.dialogPlugin.goToNext();
      if(talker == 'NONE'){        
        console.log('dejas d hablar' + talker.name);
        this.isTalking = false;
      }
    } 
    else {
      if(talker != 'NONE'){        
        console.log('empezamos a hablar con ' + talker.name);
        this.isTalking = true;
        this.name = talker.name;
        this.text = dialogText.Emilio;
        this.UI.initDialog(this.text);
      }
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
