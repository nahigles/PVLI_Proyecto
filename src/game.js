
	// Configuracion phaser
    var config = {
        parent: "canvas", // Para que el canvas no aparezca abajo del todo en la página
	    type: Phaser.AUTO,
	    width: 1000,
	    height: 560,
	    pixelArt: true, 
        backgroundColor: '#4488aa',
	    //scene:[{create:create, preload:preload}] // Metodos que queremos en nuestros scripts
        scale:{
            autocenter: Phaser.Scale.CENTER_HORIZONTALLY, // Centra horizontalmente
            mode: Phaser.Scale.FIT, // Para que sirva para cualquier resolucion
            zoom: 1,
            min: { width : 336, height: 188},
            max: { width: 1000, height: 560}
    
        },
    
        // La escena podemos poner directamente otoro script e importarlo de el
        scene:{
            preload: preload,
            create: create
        }
    }



    // Pasamos como parametro la configuracion
    new Phaser.Game(config);
    
    // pa instanciar con objetos de phaser esas imagenes,videos,etc
    function create(){
        this.add.image(300,300, "ajolotito").setOrigin(0,0).setScale(0.5,0.5);
    }
    
    // pa cargar imagenes videos, audio etc (informacion)
    function preload(){
        this.load.image("ajolotito", "./Images/AjoloteTrajeado.png" );
    }