import DialogManager from "../Dialogs/DialogManager.js";
import dialogEvents from "../Dialogs/EventCenter.js";
import TextMessage from "../Dialogs/textMessage.js";

export default class UiScene extends Phaser.Scene {
  constructor() {
        super({
            key: "UiScene"
        });
    }

    init(){}

    preload(){}

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

    
        /*PROBANDO ESTE CODIGO ¡WIP!*/

        //numeros magicos blabla cambiar!!!!!!
        this.dialogPosX = 300;
        this.dialogPosY = 360;
        this.dialogScaleX = 0.55;
        this.dialogScaleY = 0.44;
        //CREA CAJA D DIALOGO
        this.dialogBox = this.add.image(this.dialogPosX, this.dialogPosY, 'dialogBox').setOrigin(0.5, 0.5);
        this.dialogBox.setScale(this.dialogScaleX, this.dialogScaleY);
        this.dialogBox.visible = false;
        this.dialogBox.setInteractive();
        
        // Al pulsar el e, se pasa al siguiente mensaje si ya estamos hablando o llama al talk      
        this.e = this.input.keyboard.addKey('E');
        this.e.on('down', pointer => {
            if (this.dialogBox.visible) this.NextMessage();
            else this.talk();
        });

        this.n = this.input.keyboard.addKey('N');
        this.n.on('down', pointer => {
            this.choose();
        });

        this.m = this.input.keyboard.addKey('M');
        this.m.on('down', pointer => {
            this.choose(); //POR AHORA NO DISTINGUIMOS N D M
        });
    
        ''
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

        /*PROBANDO ESTE CODIGO ¡WIP!*/
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
    
    update(){};

    talk() {
        console.log("talk");
        dialogEvents.emit("wantToTalk");
    }

    //////////////////////////////////////////////////////////////////////MÉTODOS PARA DIALOGO
    /*PROBANDO ESTE CODIGO ¡WIP!*/
    // Inicia el diálogo
    initDialog(text) {
        // Si no está en un diálogo, lo inicia
        if(!this.onDialog) {
            this.onDialog=true;

            // Reproduce un sonido
            //this.soundManager = this.scene.get('soundManager');
            //this.soundManager.play("dialogPop");
            
            this.text = text;       //array de strings
            this.mesCount = 0;      //contador para contar los mensajes ya imprimidos
            // Contenedor del texto al que se le pasa el primer mensaje
            this.textMessage = new TextMessage(this, 60, this.dialogPosY-40, 500, this.text[this.mesCount].frase);

            // Aparece el cuadro de texto y se pausa el juego
            this.dialogBox.visible = true; 
            this.onDialogStarted();
        }
    }

    // Pasa el siguiente mensaje al contenedor
    NextMessage() {
        if (this.text[this.mesCount].chosen){ //la deciisión se ha tomado ya o no había decisión

            this.mesCount++;
            //this.soundManager.play("dialogJump");
    
            // Si sigue habiendo mensajes, sigue escribiéndolos
            if (/*this.mesCount < this.text.length*/!this.text[this.mesCount].isLast) { //nuestro vector representa un arbol así q no nos vale con q sea la última
                this.textMessage.setNewMessage(this.text[this.mesCount].frase);
            }
            // Si no, desactiva el cuadro de texto y reanuda el juego
            else {
                this.mesCount = 0;
                this.dialogBox.visible = false; //hacer invisible el cuadro de texto
                this.onDialogFinished();
                this.textMessage.onMessageFinished();
                this.onDialog=false;
                return false;
            }

        }
        else{
            this.choices();
        }        
    }

    choices(){
        this.escribir = "No puedes avanzar sin haber tomado una decision. ";
        this.escribir += "Pulsa n para decir: ";
        this.escribir += this.text[this.mesCount].a;
        this.escribir += " ...o pulsa m para decir: ";
        this.escribir += this.text[this.mesCount].b;

        this.textMessage.setNewMessage(this.escribir);
    }

    choose(){
        this.text[this.mesCount].chosen = true;
    }

    /*PROBANDO ESTE CODIGO ¡WIP!*/

    //////////////////////////////////////////////////////////////////////MÉTODOS PARA PAUSA
    // Menú de pausa 
    pauseGame() {
        this.isOnPauseMenu = !this.isOnPauseMenu;
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