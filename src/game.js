import Planta1 from './Plantas/planta1.js';

	// Configuracion phaser
    var config = {
        parent: "canvas", // Para que el canvas no aparezca abajo del todo en la página
	    type: Phaser.WEBGL,
	    pixelArt: true, 
        backgroundColor: '#4888aa',
	    scene:[Planta1], // Metodos que queremos en nuestros scripts
        scale:{
            autoCenter: Phaser.Scale.CENTER_BOTH, // Centra horizontalmente
            mode: Phaser.Scale.FIT, // Para que sirva para cualquier resolucion
            width: 600,
            height: 440
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 150},
                // Visibilidad de las colisiones 
                debug: true
            },
            checkCollision: {
                up: true,
                down: true,
                left: true,
                right: true
            }
        }
    }


    // Pasamos como parametro la configuracion
    new Phaser.Game(config);
    
    // pa instanciar con objetos de phaser esas imagenes,videos,etc
    function create(){
        //this.add.image(300,300, "ajolotito").setOrigin(0,0).setScale(0.5,0.5);
    }
    
    // pa cargar imagenes videos, audio etc (informacion)
    function preload(){
        //this.load.image("ajolotito", "./assets/images/AjoloteTrajeado.png" );
    }