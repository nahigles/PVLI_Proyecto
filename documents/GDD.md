<div align="center">
   
# Work To The Top - Game Design Document

</div>

## Índice
1. [Descripción](#descripción)
2. [Jugabilidad](#jugabilidad)
   - [Mecánica](#mecánica)
   - [Dinámica](#dinámica)
   - [Estética](#estética)
3. [Contenido](#contenido)
   - [Niveles](#niveles)
   - [Personajes](#personajes)
4. [Referencias](#referencias) 
## Descripción
Se trata de una aventura gráfica narrativa en vista frontal en la que nuestro protagonista, un simple y amargado oficinista se verá obligado a avanzar por el edificio conocinedo así más a la empresa, sus compañeros y descubrir el secreto tras la desaparición de su jefe.

## Jugabilidad
### Mecánica
  - **Dentro del edificio:**
    - Moverse a la izquierda (tecla A)
    - Moverse a la derecha (tecla D)
    - Interactuar con objetos (tecla E)
    - Diálogos, *drag and drop*, pulsar (click izquierdo)
  - **En los minijuegos:**
    - Movimiento hacia la izquierda (tecla A)
    - Movimiento hacia la derecha (tecla D)
    - Saltar (espacio)
    - Lanzar, *drag and drop* (click izquierdo) 

  - **Cámara**
    - Cámara estática en la sala/planta en la que se encuentre el jugador.

### Dinámica
Al inicio del juego uno de los trabajadores contacta con nuestro protagonista para comunicarle que el jefe ha desaparecido y no se sabe nada de él. Por tanto, requieren de la ayuda del jugador para sacar la empresa a flote con el proviniente caos. Cada planta representa a cada uno de los grupos principales de las personalidad MBTI: analistas, centinelas, diplomáticos y exploradores. En cada piso habrá un empleado, un animador y un jefe con los cuales el jugador irá interactuando, enfrentándose a dsitintos retos y descubriendo los secretos de la empresa. La relación que tenga el jugador con estos personajes estará influenciada por las distintas personalidades de cada uno y las elecciones del jugador serán determinantes para el final del juego. 

### Estética
El edificio se verá lateralmente, sin pared, como si se tratara de una casa de muñecas. Los assets, los personajes y el espacio serán 2D y no contarán con profundidad, a modo pixelart. En cuanto a los colores, usaremos una escala de grises para representar la monotonía de la vida adulta Además, utilizaremos los colores azul, amarillo, morado y verde para representar cada tipo de personalidad y darle ambientación a los detalles más representativos y/o estéticos de las habitaciones.

<div align="center">
  
<sub>*Referencias de la estética*</sub>
</div>

## Menús y modos de juego
El juego tendrá un menú principal desde el cual se podrá iniciar la partida y configurar algunos aspectos de esta como el volumen. 
Además contará con un menú de pausa que podrá ser accedido en medio de un nivel. En este menú se podrá acceder a la configuración del juego (volumen) y reanudar la partida.

<div align="center">
  
<sub>*Menú de juego.*</sub>
</div>

### Configuración
El juego tiene un único modo de juego y por ello no es configurable la dificultad.

### Interfaz y control
- **HUD principal del juego**
<div align="center">
</div>

- **Menú de pausa** 
<div align="center">
</div>

## Contenido
Precisaremos de recursos de arte en *pixel art* de los personajes, fondo y objetos interaccionables, además de música de ambiente para el juego.

### Niveles 
La escena inicial será una pequeña cinemática en la que se mostrarán todas las plantas del edificio, desde la última planta a la más baja. 

Cada planta, de la 1ª a la 4ª representa uno de los 4 grupos de personalidad, todas estarán ambientadas en base al color del grupo y su orden será amarillo, verde, azul y morado. En estas el jugador se encontrará con personajes que representan distintas personalidades del grupo, interactuando con ellos/as pasará por tres fases en cada una. Al principio tendremos una pequeña misión en el espacio de la planta, ya sea interactuando con los objetos o a través de conversaciones interactivas con los otros personajes; esta determinará la insignia que se le dé al jugador en esa planta, las insignias representan cada una de las 4 letras o dualidades del tipo de personalidad ( I-E / S-N / T-F / P-J ). Seguidamente, se cruzará con algún personaje en la planta con el que tendrá una pequeña conversación, en la que nuestro jugador interactúa o simplemente escucha lo que digan estos. Al llegar al final de la planta, el jugador se encontrará con un último personaje que le presentará un minijuego; este se llevará a cabo en una escena distinta a la de la planta, y al superarlo se podrá avanzar a la siguiente.

- **Planta 1 - Exploradores**
  - Al llegar abajo, el jugador entrará al hall del edificio en el que Victoria de secretaría le dirá que el jefe, cuya oficina se encuentra en la última planta del edificio, tiene la puerta cerrada y no contesta al teléfono. Le dirá que la mayoría de empleados se han ido a sus casas y que él mismo podría hacerlo. Para ello tendrá dos opciones: 
    - E = Hablar con su compañero de recursos humanos, Álvaro.
    - I = Encontrar un objeto lo suficientemente grande (archivador) para pasar por delante de Álvaro sin ser visto...

  - De esta manera el jugador no sólo entenderá las mecánicas básicas del juego, sino que también conseguirá su primera insignia.
  - Así, una vez entendido el juego, empieza la dinámica en la que en cualquier momento nuestro jugador puede abandonar la partida e irse a casa o seguir en el edificio ayudando a sus compañeros y descubriendo el misterio de la actitud del jefe. Para incentivarlo a seguir Alma, el próximo personaje con el que se cruce, le dará mensajes de ánimo.
  - Si nuestro jugador ha decidido quedarse en la empresa, se dirigirá a la siguiente planta. En la puerta se encontrará con Emilio, con el que tendrá una conversación sobre el juego que ha descubierto al caerse la red, nuestra versión del dinosaurio de google, el ajolote.
    - El minijuego consiste en superar el high score de Emilio en este juego de plataformas en el que, conforme estas van cayendo, el jugador tiene que mantener al ajolote en el espacio de la pantalla delimitado; para ello tendrá que saltar entre las plataformas.
<div align="center">
  
<sub>*Minijuego planta 1.*</sub>
</div>

- **Planta 2 - Diplomaticos**
  - La siguiente sala no tiene casi luz y está todo patas arriba, según dice Andrea, personaje colocado al principio de la planta, parece que se ha roto alguna bombilla. Por protocolo, el encargado de mantenimiento las guarda bajo llave en su almacén en esta misma planta. En todas hay un cartel al lado del teclado numérico de la puerta en el que aparece la clave, asimismo en la pantalla van apareciendo los números de la clave uno por uno. Tal es el desastre en esta planta que el cartel está medio roto y las cifras no se leen del todo bien. Por lo tanto nuestro jugador tendrá dos opciones:
    - S = Una persona con este tipo de personalidad es muy paciente y metódica a la hora de tomar decisiones y querría estar segura de la clave antes de hacer nada, por lo que esperará hasta que aparezcan todos los números en pantalla.
    - N = Estas personas son más espontáneas y se guían por la intuición, por lo que intentaría intuir los números y probar a abrir la puerta hasta encontrar la clave correcta.

  - Al encenderse la luz el jugador podrá ver que, como le venían advirtiendo, esta planta es un caos; no queda prácticamente nadie y todo está tirado por los suelos, casi como si alguien hubiera perdido los papeles… pero por qué? Melisa le cuenta a nuestro jugador que Pedro (próximo personaje) ha tenido una discusión con el jefe. 
  - Al acercarse a él se iniciará un diálogo en el que Pedro explica que al parecer el jefe le ha llamado diciendo que hay que reducir plantilla, sin dar muchas explicaciones. Al enterarse de la mala noticia no ha podido contener su ira ya que estos últimos meses han estado todos metiendo horas extra y tener que despedir a tanta gente de la nada será duro para todos.
  - Hace unos años Pedro y el jefe solían dirigir la empresa juntos; pues todo empezó con una idea en el pequeño salón del piso que compartían en la universidad. Conforme crecía la empresa, las gestiones empresariales por hacer se acumulaban, por lo que decidieron que Pedro se quedaría en las líneas de producción y el jefe pasaría a formar parte de la junta directiva, cada vez alejándose más de los trabajadores. Pedro le pedirá al jugador ayuda para recoger.
    - Este minijuego consiste en lanzar bolas de papel a alguna de las papeleras que irán apareciendo en pantalla. Tanto las papeleras como la mano solo podrán moverse en el eje horizontal.
<div align="center">
  
<sub>*Minijuego planta 2.*</sub>
</div>

- **Planta 3 - Centinelas**
  - Esta es la planta de los economistas. Al entrar el jugador le contará al primer personaje, Lola, lo que ha pasado; ella argumentará que la empresa necesita despedir a esos empleados y que no hay nada de malo en ello. De esta manera empezará un diálogo en el que podremos analizar la siguiente característica de la personalidad del jugador.
    - T = Un thinker estaría de acuerdo con nuestro logista. Si los hechos nos llevan a una conclusión, ¿por qué habría que dudar de ello?
    - F = Un feeler, poniéndose en el lugar de sus compañeros de la planta anterior, le llevaría la contraria e intentaría hacer que Lola empatizara con lxs trabajadorxs que van a ser despedidos.

  - Después de esa pequeña discusión seguiremos adelante en la oficina en la que iremos escuchando conversaciones de los trabajadores que nos dan alguna pista de lo que puede estar pasando. La empresa está creciendo y hay mucho cambio, se escuchan hipótesis sobre salir al mercado internacional, se pone en duda la capacidad de liderazgo del jefe y etc.
  - Al final de esta planta vemos a Jesús, el cual tiene cara de llevar varios días sin dormir y está claramente sobrepasado por la situación. Este le contará al jugador que lleva un año complicado; efectivamente la empresa está creciendo mucho, y entre la carga de trabajo, las nuevas tecnologías y que cada vez hay más documentos que llegan en otros idiomas, siente que se está quedando atrás. Él lleva en la empresa prácticamente desde que empezó; de ser un amigo de la familia entendido en finanzas echando una mano, a convertirse en el CFO de la empresa intentando gestionar su crecimiento.  En esta situación de caos en la que los nervios están a flor de piel, Jesus se abrirá al jugador, contándole su situación personal en un pequeño e irónicamente dramático diálogo en el que finalmente, nuestro jugador le ayudará con sus tareas.
    - Este minijuego consta de  dos partes; por un lado, el jugador tendrá que ordenar las carpetas mediante un drag and drop y por otro, resolverá el puzzle en el que sólo puede mover las fichas a su posición contigua si esta está vacía.
<div align="center">
  
<sub>*Minijuego planta 3.*</sub>
</div>

- **Planta 4 - Analistas**

<div align="center">
  
<sub>*Minijuego planta 4.*</sub>
</div>

- **Planta 5 - Jefe**


### Personajes
- **Personaje principal:** El jugador controla al protagonista de la historia quien irá interactuando con los demás personajes. En un principio, se trata de un personaje simple y plano.
- **Planta 1 - Exploradores:**
  - Victoria, virtuosa; las personas con este tipo de personalidad son amables pero reservadas y tranquilas, asimismo disfrutan de echar una mano y aprenden de su entorno a medida que avanzan. Por lo tanto, si bien Victoria no le dará a nuestro jugador más que un titular de lo que está pasando en la empresa, si que le ayudará contándole lo que ha ido viendo hacer a sus compañeros (las dos opciones de la misión).
  - Alvaro, aventurero; estas personas disfrutan mucho relacionándose con los demás, es por eso que este será el encargado de recursos humanos. Asimismo, al ser espontáneos e imprevisibles oscilan entre la generosidad y una actitud más egoísta, por lo que nuestro personaje tendrá que navegar una conversación llena de altibajos para poder escaquearse de este día del trabajo.
  - Alma, animadora; esta personalidad se caracteriza por su voluntad de ayudar y ofrecer su apoyo a las personas que les rodean, siempre pueden ver el lado positivo de las cosas e intentan hacérselo ver al resto, pero también son buenos observadores muy capaces de leer las emociones de los demás. Es por eso que si bien Alma animará a nuestro jugador a seguir adelante, entenderá también que quiera irse a casa, dándole la opción de abandonar la partida en cualquier momento.
  - Emilio, emprendedor; directos, inteligentes, graciosos y competitivos, así son las personas de este grupo. Es por eso que Emilio intentará retar al jugador, en una conversación llena de chascarrillos y chistes malos.

- **Planta 2 - Diplomáticos:**
  - Andrea, activista; estas personas suelen ver la vida como un complejo rompecabezas, se valen de su gran creatividad e imaginación para encontrar soluciones originales a sus problemas, no perdiendo nunca la sonrisa. De tal manera que al llegar a esta planta, a pesar de estar todo un poco patas arriba, Andrea le presentará a nuestro jugador varias maneras de seguir adelante con gran entusiasmo.
  - Melisa, mediadora; saben escuchar y se valen de ello para entender todos los puntos de vista y así encontrar la bondad incluso en las peores personas. Son reservados y grandes defensores de la moral, por lo que presentará el conflicto de manera objetiva y presentando ambas caras de la moneda.
  - Pedro, protagonista; amantes de la comunidad y líderes natos, las personas con esta personalidad suelen ser carismáticos y altruistas, motivando siempre a los que les rodean a dar lo mejor de sí y predicando esto con el ejemplo. Aunque a veces pueden excederse y llevar estas intenciones demasiado lejos, empatizan profundamente con los problemas ajenos, incluso hasta padecerlos ellos mismos. Todas estas cualidades hacen de Pedro el mejor supervisor de producción. Muy preocupado por el bienestar de sus trabajadores, la noticia de los despidos después de ir más allá de sus capacidades durante los últimos meses ha podido con él.

- **Planta 3 - Centinelas:**
  - Lola, logista; estas personas se aferran a las normas y reglas establecidas sin importarles lo que cueste, basándose siempre en los hechos y en nombre de la honestidad y la tradición. Por lo tanto, este personaje respetará las decisiones tomadas en la junta directiva de la empresa y no tendrá ningún reparo en decírselo a nuestro jugador; ya que su frialdad juega también un papel estabilizador con el objetivo de formar parte de un sistema que funciona, en este caso la empresa. 
  - Fede, defensor; siempre listos para defender a sus seres queridos se comprometen con el trabajo y con las personas en las que creen. Son receptivos a los cambios siempre y cuando sientan que se les comprende y respeta. Predispuestos al trabajo en grupo, a veces pueden sentirse culpables de ponerse las medallas de los esfuerzos del equipo. Estas cualidades se verán reflejadas en sus intervenciones en la conversación con Conchi.
  - Conchi, consul; siempre en busca de ayudar, dirigen a sus equipos hacia el triunfo. Procuran estar al tanto de todo lo que pasa a su alrededor, y hacen todo lo posible para utilizar sus poderes para el bien. Suelen respetar la autoridad y las reglas, ya que les encanta ser serviciales siempre y cuando sepan que son valorados y apreciados, cosa que pondrá en duda en su conversación con Fede.
  - Jesús, ejecutivo; estas personas son representantes de la tradición y el orden. Son estrictos con su trabajo, pero no trabajan solos, es más, esperan que su fiabilidad y ética en el trabajo sean recíprocas, de lo contrario no tardarán en mostrar su enfado. Suelen ofrecerse voluntariamente como líderes en momentos difíciles, aunque su perfeccionismo hace que acaben sobrepasados. Así se encuentra Jesús en la situación de la empresa, y por su personalidad irascible no podrá evitar contárselo todo a nuestro jugador.

- **Planta 4 - Analistas:**

- **Planta 5 - Jefe:**
  

## Referencias
- Estilo cámara y salas: <ins>Plunder Pack</ins>, <ins>Sound Shapes</ins>
- Minijuegos: <ins>Space Invaders</ins>, <ins>A Little to the Left</ins>, <ins>Chrome Dino</ins>, <ins>Juego del 15</ins>, <ins>Among Us</ins>, <ins>Pou</ins> 

