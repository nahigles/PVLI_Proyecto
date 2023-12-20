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
      console.log("getChildNPC " + NPC.name);
      NPC.visited = false;
    }

    console.log("DialoManagerConstruido");

    dialogEvents.on("wantToTalk", this.wantToTalk, this);
  }

  wantToTalk() {
    var NPC = this._whoIsTalking();

    console.log("WANT TO TALK");

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

      if (touching) {
        talker = NPC;
        this.visited = NPC.visited;
        NPC.visited = true;
        //caso especial de Inma y Charlotte (están juntas)
          if (talker.name == "Inma"){
            this.NPCGroup.getChildren();
            for (const NPC of this.NPCGroup.getChildren()) {
              if (NPC.name == "Charlotte"){
                NPC.visited = true;
              }
            }
          }
          else if (talker.name == "Charlotte"){
            this.NPCGroup.getChildren();
            for (const NPC of this.NPCGroup.getChildren()) {
              if (NPC.name == "Inma"){
                NPC.visited = true;
              }
            }
          }
      }
    }

    return {talker: talker, visited: this.visited};
  }

  removeDM(){
    dialogEvents.destroy();
  }
}
