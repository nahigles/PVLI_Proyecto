import dialogEvents from "./EventCenter.js";
import Conversation from "./conversation.js";

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

      new Conversation(this.UI, this.scene.key, talker.name);
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
