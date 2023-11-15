

import Planta1 from './Plantas/planta1.js';
import UiScene from './escenas/UiScene.js';
import MainMenu from './UI/MainMenu.js';

	// Configuracion phaser
    var config = {
        parent: "canvas", // Para que el canvas no aparezca abajo del todo en la página
	    type: Phaser.AUTO, //type: Phaser.WEBGL
	    pixelArt: true, 
        backgroundColor: '#4888aa',
	    scene:[MainMenu,Planta1, UiScene], // Metodos que queremos en nuestros scripts
        scale:{
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, // Centra horizontalmente // autoCenter: Phaser.Scale.CENTER_BOTH
            mode: Phaser.Scale.FIT, // Para que sirva para cualquier resolucion
            width: 600,
            height: 440
    
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 1},
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
    
    
   