import dialogEvents from "./EventCenter.js";
import Conversation from "./conversation.js";
/**
 * Clase que maneja con quien vas a hablar o con quien estas hablando
 * Tiene al player y los NPCs y cuando recibe el evento wantToTalk mira los overlaps y devuelve con quien estamos hablando
 */
export default class DialogManager {
  constructor(scene, UI, player, NPCGroup, insignias) {
    this.scene = scene;
    this.UI = UI;
    this.isTalking = false;

    this.NPCGroup = NPCGroup;
    scene.physics.add.overlap(this.NPCGroup, player);

    this.NPCGroup.getChildren();
    for (const NPC of this.NPCGroup.getChildren()) {
      NPC.visited = false;
    }

    this.insignias = insignias;

    dialogEvents.on("wantToTalk", this.wantToTalk, this);
  }

  wantToTalk() {
    var NPC = this._whoIsTalking();

    if(NPC.talker != 'NONE'){        
      this.isTalking = true;
      new Conversation(this.UI, this.scene.key, NPC.talker.name, NPC.visited, this.insignias);
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
