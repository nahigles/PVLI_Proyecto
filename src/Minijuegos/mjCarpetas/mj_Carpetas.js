import MinijuegoBase from '../../escenasBase/minijuegoBase.js';
import Button from '../../UI/Button.js';
import PauseMenu from '../../UI/PauseMenu.js';
import Archivo from './archivo.js'
import PointArchivo from './point_archivo.js'
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
        this.backgroundLayer.setDepth(5);
        
        // CAMERA
        this.cameras.main.setZoom(3.2);
        this.cameras.main.setBounds(1,1, this.map.height, this.map.width, true);
        
        // ARCHIVOS
        this.archivosGroup = this.add.group();
        // Bucle de creación de ARCHIVOS
		for (const objeto of this.map.getObjectLayer('Carpetas').objects) {
            // `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'Archivo') {
                this.archivo = new Archivo(this, objeto.x, objeto.y, objeto.properties[0].value, objeto.properties[1].value, 'folder', 'atari');
                this.input.setDraggable(this.archivo);
                this.archivosGroup.add(this.archivo);

            }
		}
        this.numArchivos = this.archivosGroup.getLength();
        this.cont = 0;

        this.pointsGroup = [];
        // Bucle de creación de LUGARES ARCHIVOS (puntos/coordenadas)
		for (const objeto of this.map.getObjectLayer('Puntos').objects) {
			// `objeto.name` u `objeto.type` nos llegan de las propiedades del
			// objeto en Tiled
			if (objeto.type === 'Point') {
                this.point = new PointArchivo(this, objeto.x, objeto.y, objeto.name);
                this.pointsGroup.push(this.point);
            }
		}
        
        // DRAG
        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        
        // BotonPause
        //
       //this.pauseButton.setScale(0.1,0.1); 
       for (const objeto of this.map.getObjectLayer('BotonPausa').objects) {
        // `objeto.name` u `objeto.type` nos llegan de las propiedades del
        // objeto en Tiled
        if (objeto.type === 'Button') {
           // console.log('botoon');
           // console.log(this.pauseButton.x, this.pauseButton.y);
            this.pauseButton.x = objeto.x;
            this.pauseButton.y = objeto.y;
           // console.log(this.pauseButton.x, this.pauseButton.y);
            this.pauseButton.setScale(0.1,0.1);

        }
    }
       
    }
    update(t,dt){
        super.update(t,dt);
        // COMPROBACIÓN DE COORDENADAS
         this.archivosGroup.getChildren();
         for (const Archivo of this.archivosGroup.getChildren())
         {
            Archivo.depth = Archivo.y;
             for(const Point of this.pointsGroup)
             {
                     if(!Archivo.locate && Archivo.id == Point.key && 
                        ((Archivo.x >= Point.x || Archivo.x < Point.x + 10) && (Archivo.y >= Point.y && Archivo.y < Point.y + 5)))
                    {
                        Archivo.imgFolder.clearTint();
                        //Archivo.imgFolder.setTint(0x0000ff);
                        Archivo.x = Point.x;
                        Archivo.y = Point.y;
                        Archivo.disableInteractive();
                        Archivo.locate = true;
                        this.cont = this.cont + 1;
                    }
             }
         }

         if(this.cont == this.numArchivos)
         {
           this.win();
         }


    }
    
    win()
    {
        this.scene.get("Planta3").minijuegoCompletado();
        //para que no cambie de repente
        setTimeout(()=>{
            //console.log('no me va el metodo aaa');
            this.scene.resume("Planta3"); //volvemos a planta
            this.scene.remove();
        },1500);
    }
}

