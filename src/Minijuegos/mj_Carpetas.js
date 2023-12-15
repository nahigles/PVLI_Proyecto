import MinijuegoBase from '../escenas/minijuegoBase.js';
import Button from '../UI/Button.js';
import PauseMenu from '../UI/PauseMenu.js';
import Archivo from '../Minijuegos/archivo.js'
export default class MJ_Carpetas extends MinijuegoBase{

    constructor(){
        super('mj_Carpetas', 'Planta3');
    }
    init(){
        super.init();
    }
    preload(){
       super.preload();

       // BG
       this.load.image('background3', './assets/images/Backgrounds/bg_mj_carpetas.png');
       // TILE MAP
       this.load.tilemapTiledJSON('tile_mj_carpetas', './assets/Prueba_Mapa/tile_mj_carpetas.json');

       // ARCHIVOS
       this.load.image('folder', 'assets/images/Objetos/Carpeta.png');
       this.load.bitmapFont('atari', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');

    }
    create(){
        super.create();
        
        // TILEMAP
        this.map = this.make.tilemap({ 
            key: 'tile_mj_carpetas', 
            tileWidth: 16, 
            tileHeight: 16
        });
        
        // BACKGROUND
        const bgImgTilemap = this.map.addTilesetImage('bg_mj_carpetas', 'background3');  
        this.backgroundLayer = this.map.createLayer('Fondo', bgImgTilemap);
        
        // CAMERA
        //this.cameras.main.setZoom(2.2);
        //this.cameras.main.setBounds(1,1, this.map.height, this.map.width, true);
        
        // ARCHIVOS
        this.archivo = new Archivo(this, 250, 200, 'AB');
        console.log(this.archivo);
        
        const imgFolder = this.add.image(0, 0, 'folder');
        const text = this.add.bitmapText(0, 0, 'atari', 'A-B').setFontSize(32);
        
        this.archivo = this.add.container(230, 240, [ imgFolder, text ]).setScale(0.1,0.1);
        //this.container.body.onOverlap = true;
        this.archivo.setSize(imgFolder.width, imgFolder.height);
        
        this.archivo.setInteractive();
        this.input.setDraggable(this);
        
        this.archivo.on('pointerover', () =>
        {
            
            imgFolder.setTint(0x44ff44);
            
        });

        this.archivo.on('pointerout', () =>
        {
            
            imgFolder.clearTint();
            
        });
        
        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            
            gameObject.x = dragX;
            gameObject.y = dragY;
            
        });

        // BotonPause
       this.pauseButton = new Button(this, 232, 208, 'pauseButton', ()=>{this.scene.launch(new PauseMenu('Planta3', 'mj_Carpetas', 'MenuPause_P3'));}, ()=>{this.scene.pause();}, ()=>{}, ()=>{} ).setScrollFactor(0);
       //this.pauseButton.setScale(0.1,0.1); 

       //console.log("CONTAINER: ", this.container.x, this.container.y);
       //console.log("BOTON PAUSA: ", this.pauseButton.x, this.pauseButton.y);
        
    }
    update(){
        super.update();
        

    }
}
