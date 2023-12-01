import DialogManager from "../Dialogs/DialogManager.js";
import dialogEvents from "../Dialogs/EventCenter.js";
import TextMessage from "../Dialogs/textMessage.js";
import Button from "../UI/Button.js";

export default class UiScene extends Phaser.Scene {
  constructor() {
        super({
            key: "UiScene"
        });
    }

    init(){}

    preload(){
        this.load.spritesheet("choiceButton", "./assets/images/UI/Dialogs/choice.png", {frameWidth: 8, frameHeight: 8});
    }

    create(data){    
        this.ScenePlanta = data.home;
        this.initDialogSystem(data);
        this.initPauseSystem();
    }

    //Sistema de dialogos
    initDialogSystem(data) {
        this.dialogManager = new DialogManager(
            data.home,
            this,
            data.player,
            data.NPCs
        );

        //numeros magicos blabla cambiar!!!!!!
        this.dialogPosX = 300;
        this.dialogPosY = 100;
        this.dialogScaleX = 0.57;
        this.dialogScaleY = 0.55;
        //CREA CAJA D DIALOGO
        this.dialogBox = this.add.image(this.dialogPosX, this.dialogPosY, 'dialogBox').setOrigin(0.5, 0.5);
        this.dialogBox.setScale(this.dialogScaleX, this.dialogScaleY);
        this.dialogBox.visible = false;
        this.dialogBox.setInteractive();
        
        
        //CREA IMG D NPCs
        this.thumbNails = this.add.group();     

        this.imagePLR = this.add.image(90, 112, "Player").setOrigin(0.5, 0.5);
        this.imagePLR.visible = false;
        this.imagePLR.setScale(9, 9);
        this.thumbNails.add(this.imagePLR);

        data.NPCs.getChildren();
        for (const npc of data.NPCs.getChildren()) {
            this.imageNPC = this.add.image(500, 102, npc.name).setOrigin(0.5, 0.5);
            this.imageNPC.visible = false;
            this.imageNPC.setScale(-8, 8);
            this.thumbNails.add(this.imageNPC);
        };


        // Al pulsar el e, se pasa al siguiente mensaje si ya estamos hablando o llama al talk      
        this.e = this.input.keyboard.addKey('E');
        this.e.on('down', pointer => {
            if (this.onDialog) this.NextMessage();
            else this.talk();
        });

        
        WebFont.load({
            google: {
                families: ['VT323', 'Roboto', 'Freckle Face']
            },
            loading: function () {
                console.log("Fonts are being loaded");
            },
            active: function () {
                console.log("Fonts have been rendered")
            }
        });
    }

    // Sisema de pausa
    initPauseSystem() {
        // Tecla p
        this.pauseInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.pauseInput.on('down', pointer => { 
            this.pauseGame();
        });
                
        this.isOnPauseMenu = false;        
    }
    
    update(t, dt){
        //console.log(t, dt);
        if (this.choice == "noSabe"){ //si todavía no ha decidido mira si se ha clicado alguno de los botones
            if (this.A.pulsadoBoolean){
                this.chooseA();
            }
            else if (this.B.pulsadoBoolean){
                this.chooseB();
            }
        }
    };

    talk() {
        dialogEvents.emit("wantToTalk");
    }

    /*PROBANDO ESTE CODIGO ¡WIP!*/
    // Inicia el diálogo
    initDialog(conversation, who, text, a = "opcA", b = "opcB") {
        // Si no está en un diálogo, lo inicia
        if(!this.onDialog) {
            this.conversation = conversation;

            this.onDialog=true;

            // Reproduce un sonido
            //this.soundManager = this.scene.get('soundManager');
            //this.soundManager.play("dialogPop");
            
            this.text = text;       //array de strings 

            if (who == "Player"){
                this.dialogBox.setScale(-this.dialogScaleX, this.dialogScaleY);
                this.textMessage = new TextMessage(this, 210, 46, 414, this.text);
            }
            else {      //cambia la posición del texto y la caja del dialogo
                this.dialogBox.setScale(this.dialogScaleX, this.dialogScaleY);
                this.textMessage = new TextMessage(this, 50, 46, 414, this.text);
            }

            // Aparece el cuadro de texto y la imagen del que hable
            this.thumbNails.getChildren();
            for (const img of this.thumbNails.getChildren()) {
                if (img.texture.key == who){
                    console.log(img.texture.key);
                    img.visible = true;
                    this.actThumbNail = img;
                }
            };
            this.dialogBox.visible = true; 

            if (a == "opcA"){
                this.choice = "noHay";
            }
            else {
                this.choice = "noSabe";
                this.opcA = a;
                this.opcB = b;
                this.A = new Button(this, 200, 180, 'choiceButton');
                this.B = new Button(this, 400, 180, 'choiceButton');
                
            }

            //para pausar el juego
            this.onDialogStarted();
        }
    }

    chooseA(){
        this.choice = this.opcA;
    }
    
    chooseB(){
        this.choice = this.opcB;
    }

    // Pasa el siguiente mensaje al contenedor
    NextMessage() {
        if (this.choice == "noHay"){
            this.endDialog(); //cerramos esta frase
            this.conversation.next(); //miramos a ver si hay next
        }
        else if (this.choice == "noSabe"){
            this.textMessage.setNewMessage("Tienes que tomar una decisión antes d avanzar.")
        }
        else{
            this.conversation.next(this.choice);
        }

    }

    endDialog(){ 
        this.dialogBox.visible = false; //hacer invisible el cuadro de texto
        this.actThumbNail.visible = false;
        this.onDialogFinished();
        this.textMessage.onMessageFinished();
        this.onDialog=false;
    } 
    
    /////////////////////////////////////////////////MÉTODOS PARA PAUSA
    // Menú de pausa 
    pauseGame() {
        this.isOnPauseMenu = !this.isOnPauseMenu;
        console.log("isPaused: " + this.isOnPauseMenu);
        this.ScenePlanta.onPause();
    }
    
    // Pausa el juego al iniciar un diálogo
    onDialogStarted() {
        this.onDialog = true;
        this.pauseGame();
    }

    // Reanuda el juego tras acabar el diálogo
    onDialogFinished() {
        this.onDialog = false;            
        this.pauseGame();
        dialogEvents.emit('dialogFinished');             
    }
}