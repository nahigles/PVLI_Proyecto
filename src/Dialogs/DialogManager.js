import dialogEvents from "./EventCenter.js";
//import stuffToSay from "./dialog.json";
//import TalkZone from "./TalkZone";

export default class DialogManager {
  constructor(scene, player, NPCGroup) {
    this.scene = scene;
    this.isTalking = false;

    /*
    scene.dialogPlugin.setSettings({
      dialogHeight: 52,
      avatarWidth: 32,
      fontFamily: "atari",
      fontSize: 16,
      atBottom: false,
      frameSettings: {
        key: {
          key: "frames",
          frame: 0
        },
        offsetConfig: 8
      },
      paddings: {
        xPaddingOut: 5,
        yPaddingOut: 5,
        xPaddingIn: 10,
        yPaddingIn: 10
      }
    });
    */

    //this.physics.add.overlap(this.explPLYR, this.explNPC, () => {this.explNPC.interact()})

    this.NPCGroup = NPCGroup;
    scene.physics.add.overlap(this.NPCGroup, player);

    dialogEvents.on("wantToTalk", this.wantToTalk, this);
  }

  /*
  addZone(talkerSprite, talkerName) {
    var zone = new TalkZone(this.scene, 50, 35, talkerSprite, talkerName);

    this.zoneGroup.add(zone);
  }
*/
  wantToTalk() {
    /*var talker = this._whoIsTalking();
    if (this.isTalking) {
      this.isTalking = !this.scene.dialogPlugin.goToNext();
    } else {
      this.isTalking = true;
      this.scene.dialogPlugin.startDialog(stuffToSay[talker]);
    }*/
  }
/*
  _whoIsTalking() {
    var talker = this.defaultName;

    this.zoneGroup.getChildren();
    for (const zone of this.zoneGroup.getChildren()) {
      if (zone.body.embedded) zone.body.touching.none = false;
      let touching = !zone.body.touching.none;

      if (touching) {
        talker = zone.talkerName;
      }
    }

    return talker;
  }
  */
}
