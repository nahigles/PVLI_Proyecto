import dialogEvents from "./EventCenter.js";
import Conversation from "./conversation.js";

export default class DialogManager {
  constructor(scene, UI, player, NPCGroup) {
    this.scene = scene;
    this.UI = UI;
    this.isTalking = false;

    this.NPCGroup = NPCGroup;
    scene.physics.add.overlap(this.NPCGroup, player);

    this.NPCGroup.getChildren();
    for (const NPC of this.NPCGroup.getChildren()) {
      NPC.visited = false;
    }

    dialogEvents.on("wantToTalk", this.wantToTalk, this);
  }

  wantToTalk() {
    var NPC = this._whoIsTalking();

    if(NPC.talker != 'NONE'){        
      console.log('empezamos a hablar con ' + NPC.talker.name);
      this.isTalking = true;
      new Conversation(this.UI, this.scene.key, NPC.talker.name, NPC.visited);
    }
  }

  _whoIsTalking() {
    var talker = 'NONE';

    this.NPCGroup.getChildren();
    for (const NPC of this.NPCGroup.getChildren()) {
      if (NPC.body.embedded) NPC.body.touching.none = false; //embedded es overlapeado y además no se mueve
      let touching = !NPC.body.touching.none;

      console.log(NPC.visited);

      if (touching) {
        talker = NPC;
        this.visited = NPC.visited;
        NPC.visited = true;
      }
    }

    
    console.log(this.visited);
    return {talker: talker, visited: this.visited};
  }
}
