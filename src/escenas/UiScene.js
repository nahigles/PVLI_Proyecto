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

    init(){
        console.log("UI INIT");
    }

    preload(){
        this.load.spritesheet("choiceButton", "./assets/images/UI/Dialogs/choice.png", {frameWidth: 80, frameHeight: 80});
        this.load.spritesheet("houseButton", "./assets/images/UI/house.png", {frameWidth: 80, frameHeight: 80});
        this.load.image('backgroundHome', './assets/images/Backgrounds/bg_home.png');
        this.load.image('insigniaE', './assets/images/UI/Insignias/insigniaE.png');
        this.load.image('insigniaI', './assets/images/UI/Insignias/insigniaI.png');
        this.load.image('insigniaN', './assets/images/UI/Insignias/insigniaN.png');
        this.load.image('insigniaS', './assets/images/UI/Insignias/insigniaS.png');
        this.load.image('insigniaT', './assets/images/UI/Insignias/insigniaT.png');
        this.load.image('insigniaF', './assets/images/UI/Insignias/insigniaF.png');
        this.load.image('insigniaJ', './assets/images/UI/Insignias/insigniaJ.png');
        this.load.image('insigniaP', './assets/images/UI/Insignias/insigniaP.png');
    }

    create(data){    

        console.log("UI CREATE");

        this.ScenePlanta = data.home;
        this.initDialogSystem(data);
        this.initPauseSystem();
        this.initInsigniasSys(data.insignias);
         //imagen calle irese casa
         this.homeBg = this.add.image(0, 0, 'backgroundHome').setOrigin(0,0).setScale(3.8,3.8);
         this.homeBg.visible = false; 
    }

    //Sistema de dialogos
    initDialogSystem(data) {

        console.log("initDialogSys");
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
            this.pauseGame(true);
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

    // Inicia el diálogo
    initDialog(conversation, who, text) {
        console.log("initDialog();")

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
                    img.visible = true;
                    this.actThumbNail = img;
                }
            };
            this.dialogBox.visible = true; 

            if (who == "ChoiceStay" || who == "Choice"){
                this.choice = "noSabe";
                if (who == "Choice"){
                    this.A = new Button(this, 535, 77, 'choiceButton', ()=>{this.chooseA},  ()=>{},  ()=>{}, ()=>{});
                    this.A.changeScale(0.6,0.6);
                    this.B = new Button(this, 535, 130, 'choiceButton', ()=>{this.chooseA},  ()=>{},  ()=>{}, ()=>{});
                    this.B.changeScale(0.6,0.6);
                }
            }
            else {
                this.choice = "noHay";                
            }

            //para pausar el juego
            this.onDialogStarted();
        }
    }

    chooseA(){
        this.choice = "a";
        this.NextMessage();
    }
    
    chooseB(){
        this.choice = "b";        
        this.NextMessage();
    }
    goHome(){
        console.log("Go home.");
        this.homeBg.visible = true;
        this.exit.visible = false;
        setTimeout(()=>{
            this.removeUI();
            this.scene.start("MainMenu");
        },2000);
    }
    
	actions(action){
        switch (action) { 
            case "BotonExit": //EN LAS PLANTAS >1 HABRA Q LLAMAR A ESTE DIRECTAMENTE
                this.exit = new Button(this, 560, 360, 'houseButton', ()=>{this.scene.stop(this.ScenePlanta);},  ()=>{this.goHome()},  ()=>{}, ()=>{}) ;
                this.exit.changeScale(0.6,0.6);
                break;
            case "MinijuegoPlanta1":
                this.endDialog();
                this.scene.get("Planta1").startMinijuego();
                break;
            case "HablaConAlvaro" :
                this.addInsignia('E');
                this.scene.get("Planta1").hablaConAlvaro();
                this.scene.get("Planta1").finConversacionVictoria();
                break;
                
            case "FinConversacionVictoria" :  
                this.addInsignia('I');
                this.scene.get("Planta1").finConversacionVictoria();
                break;
                    
            case "FinConversacionAlvaro" :
                this.scene.get("Planta1").finConversacionAlvaro();
                break;
                
            case "postIt" :  
                this.endDialog();
                this.addInsignia('S');
                //misión y al acabar directamente se lanza las siguentes lineas
                this.scene.get("PuertaSecreta").clavMirada();
                console.log("postItAction");
                this.conversation.next();                
                break;
                
            case "adivinar" :
                this.endDialog();
                this.addInsignia('N');
                //misión y al acabar directamente se lanza las siguentes lineas
                this.scene.get("Planta2").startMision();
                console.log("adivinarAction");
                
                break;
                        
            case "MinijuegoPlanta2":
                this.scene.get("Planta2").startMinijuego();
                console.log('MinijuegoPlanta2');
                break;

            case "InsigniaT":
                this.addInsignia('T');
                break;

            case "InsigniaF":
                this.addInsignia('F');
                break;

            case "MinijuegoPlanta3":
                console.log('MinijuegoPlanta3');
                break;

            case "InsigniaP":
                this.addInsignia('P');
                break;

            case "InsigniaJ":
                this.addInsignia('J');
                break;

            case "MinijuegoPlanta4":
                console.log('MinijuegoPlanta3');
                break;

            default:
                break;
        }

	}

    // Pasa el siguiente mensaje al contenedor
    NextMessage() {
        this.endDialog(); //cerramos esta frase
        this.conversation.next(this.choice);
    }

    endDialog(){ 
        console.log("endDialog");

        this.hide();

        this.onDialogFinished();
        this.textMessage.onMessageFinished();
        this.onDialog=false;
    } 

    hide(){
        this.dialogBox.visible = false; //hacer invisible el cuadro de texto
        this.actThumbNail.visible = false;
        if (this.choice === "a" || this.choice === "b"){           
            this.A.destroy();
            this.B.destroy();
        }
    }
    
    /////////////////////////////////////////////////MÉTODOS PARA PAUSA
    // Menú de pausa 
    pauseGame(bol) {
        this.isOnPauseMenu = bol;
        this.ScenePlanta.onPause(bol);
    }
    
    // Pausa el juego al iniciar un diálogo
    onDialogStarted() {
        this.onDialog = true;
        this.pauseGame(true);
    }

    // Reanuda el juego tras acabar el diálogo
    onDialogFinished() {
        this.onDialog = false;   
        this.pauseGame(false);
        dialogEvents.emit('dialogFinished');             
    }

    /////////////////////////////////////////////////MÉTODOS PARA PAUSA
    initInsigniasSys(checkList){
        console.log(checkList);
        this.insignias = this.add.group();  
        this.insignias.add(this.add.image(30, 370, "insigniaE").setName('E').setOrigin(0.5, 0.5).setScale(2, 2).setVisible(checkList[0]));
        this.insignias.add(this.add.image(30, 370, "insigniaI").setName('I').setOrigin(0.5, 0.5).setScale(2, 2).setVisible(checkList[1]));
        this.insignias.add(this.add.image(80, 370, "insigniaN").setName('N').setOrigin(0.5, 0.5).setScale(2, 2).setVisible(checkList[2]));
        this.insignias.add(this.add.image(80, 370, "insigniaS").setName('S').setOrigin(0.5, 0.5).setScale(2, 2).setVisible(checkList[3]));
        this.insignias.add(this.add.image(130, 370, "insigniaT").setName('T').setOrigin(0.5, 0.5).setScale(2, 2).setVisible(checkList[4]));
        this.insignias.add(this.add.image(130, 370, "insigniaF").setName('F').setOrigin(0.5, 0.5).setScale(2, 2).setVisible(checkList[5]));
        this.insignias.add(this.add.image(180, 370, "insigniaJ").setName('J').setOrigin(0.5, 0.5).setScale(2, 2).setVisible(checkList[6]));
        this.insignias.add(this.add.image(180, 370, "insigniaP").setName('P').setOrigin(0.5, 0.5).setScale(2, 2).setVisible(checkList[7]));
    }

    addInsignia (type){
        switch (type) {
            case 'E':
                this.insignias.getMatching('name', 'E')[0].setVisible(true);
                break;
            case 'I':
                this.insignias.getMatching('name', 'I')[0].setVisible(true);
                break;
            case 'N':
                this.insignias.getMatching('name', 'N')[0].setVisible(true);
                break;
            case 'S':
                this.insignias.getMatching('name', 'S')[0].setVisible(true);
                break;
            case 'T':
                this.insignias.getMatching('name', 'T')[0].setVisible(true);
                break;
            case 'F':
                this.insignias.getMatching('name', 'F')[0].setVisible(true);
                break;
            case 'J':
                this.insignias.getMatching('name', 'J')[0].setVisible(true);
                break;
            case 'P':
                this.insignias.getMatching('name', 'P')[0].setVisible(true);
                break;        
            default:
                break;
        }
    }

    removeUI(){
        console.log("REMOVE UI");
        this.dialogManager.removeDM();
        this.scene.stop();
    }

    sigConver(){
        this.conversation.next();
    }
}