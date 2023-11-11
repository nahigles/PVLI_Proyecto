import DialogManager from "../Dialogs/DialogManager.js";
import dialogEvents from "../Dialogs/EventCenter.js";

export default class UiScene extends Phaser.Scene {
  constructor() {
        super({
            key: "UiScene"
        });
    }

    init(){}

    preload(){}

    create(data){    
        /*
        this.dialogManager = new DialogManager(
        data.home,
        data.player,
        data.NPCs
        );

        data.npcs.forEach((npc) => {
        this.dialogManager.addNPC(npc.sprite, npc.name);
        });
        */
    
        console.log("UIcreated");
        this.keyE = scene.input.keyboard.addKey('E');
        this.keyE.on('up', this.talk());
    }

    update(){};

    talk() {
        console.log("talk");
        //dialogEvents.emit("wantToTalk");
    }
}