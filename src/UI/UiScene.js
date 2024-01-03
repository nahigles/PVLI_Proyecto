import DialogManager from "../Dialogs/DialogManager.js";
import dialogEvents from "../Dialogs/EventCenter.js";
import TextMessage from "../Dialogs/textMessage.js";
import Button from "./Button.js";
export default class UiScene extends Phaser.Scene {
  constructor() {
        super({
            key: "UiScene"
        });
    }

    init(){
    }

    preload(){
        this.load.spritesheet("choiceButton", "./assets/images/UI/Dialogs/choice.png", {frameWidth: 80, frameHeight: 80});
        this.load.image('choiceA',  "./assets/images/UI/Dialogs/choiceA.png");
        this.load.image('choiceB',  "./assets/images/UI/Dialogs/choiceB.png");
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
        this.ButtonSoundd = this.sound.add('buttonSound');  
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

        this.dialogManager = new DialogManager(
            data.home,
            this,
            data.player,
            data.NPCs,
            data.insignias
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
        this.isOnPauseMenu = false;        
    }
    
    update(t, dt){
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

        // Si no está en un diálogo, lo inicia
        if(!this.onDialog) {
            this.conversation = conversation;

            this.onDialog=true;
            
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
                    this.A = new Button(this, 535, 77, 'choiceA', ()=>{this.chooseA},  ()=>{},  ()=>{}, ()=>{}, this.ButtonSoundd);
                    this.A.changeScale(3,3);
                    this.B = new Button(this, 535, 130, 'choiceB', ()=>{this.chooseA},  ()=>{},  ()=>{}, ()=>{}, this.ButtonSoundd);
                    this.B.changeScale(3,3);
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
        this.homeBg.visible = true;
        this.exit.visible = false;
        
        this.dialogBox.setPosition(360,80);
        this.dialogBox.setScale(0.48, 0.5);
        this.dialogBox.visible = true;
        this.dialogBox.setDepth(1);

        this.textMessage = new TextMessage(this, 150, 28, 440, "¡Bn hecho! Las inevitables consecuencias del capitalismo no deberían rayarte. Disfruta de tu vida <3");

        setTimeout(()=>{
            this.removeUI();
            this.scene.start("MainMenu");
        },10000);
    }
    
	actions(action){
        switch (action) {
            case "BotonExit": //EN LAS PLANTAS >1 HABRA Q LLAMAR A ESTE DIRECTAMENTE
                this.exit = new Button(this, 560, 360, 'houseButton', ()=>{},  ()=>{this.goHome()},  ()=>{}, ()=>{}, this.ButtonSoundd) ;
                this.exit.changeScale(0.6,0.6);
                break;
            case "MinijuegoPlanta1":
                this.endDialog();
                let plantita1 = this.scene.get("Planta1");
                plantita1.startMinijuego();
                plantita1.music(false);
                break;
            case "HablaConAlvaro" :
                this.scene.get("Planta1").hablaConAlvaro();
                this.scene.get("Planta1").finConversacionVictoria();
                break;
                
            case "FinConversacionVictoria" :  
                this.scene.get("Planta1").finConversacionVictoria();
                break;
                    
            case "FinConversacionAlvaro" :
                this.scene.get("Planta1").finConversacionAlvaro();
                break;
                
            case "postIt" :  
                //this.endDialog();
                this.addInsignia('S');
                //misión y al acabar directamente se lanza las siguentes lineas
                this.scene.get("puertaSecreta").clavMirada();
                this.scene.get("Planta2").jugadorSensitivo();
                break;
                
            case "adivinar" :
                this.addInsignia('N');
                //misión y al acabar directamente se lanza las siguentes lineas
                this.scene.get("Planta2").startMision();
                this.scene.get("Planta2").jugadorIntuitivo();
                
                break;
                        
            case "MinijuegoPlanta2":
                let plantica2 = this.scene.get("Planta2");
                plantica2.startMinijuego();
                plantica2.music(false);
                break;

            case "InsigniaT":
                this.addInsignia('T');
                this.scene.get("Planta3").jugadorThinker();
                this.scene.get("Planta3").misionCompleta();
                break;

            case "InsigniaF":
                this.addInsignia('F');
                this.scene.get("Planta3").jugadorFeeler();
                this.scene.get("Planta3").misionCompleta();
                break;

            case "MinijuegoPlanta3":
                let plantica3 = this.scene.get("Planta3");
                plantica3.startMinijuego();
                plantica3.music(false);
                break;

            case "InsigniaP":
                this.addInsignia('P');
                this.scene.get("Planta4").jugadorPerceptivo();
                break;

            case "InsigniaJ":
                this.addInsignia('J');
                this.scene.get("Planta4").jugadorJuzgador();
                break;

            case "MinijuegoPlanta4":
                let plantica4_2 = this.scene.get("Planta4_2");
                plantica4_2.music(false);
                plantica4_2.startMinijuegoP4();
                break;

            case "Final":
                setTimeout(()=>{
                    this.scene.start("MainMenu");
                },100);
                this.removeUI();
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
        this.dialogManager.removeDM();
        this.scene.stop();
    }

    sigConver(){
        this.conversation.next();
    }
}