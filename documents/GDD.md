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
   - [Minjuegos](#minijuegos)
   - [Personajes](#personajes)
4. [Referencias](#referencias) 
## Descripción
Se trata de una aventura gráfica narrativa en vista frontal en la que nuestro protagonista, un simple y amargado oficinista, llega un dia a la oficina y todo es un caos porque el jefe no responde. ¿Que le habrá pasado? Se verá obligado a avanzar por el edificio conociendo a sus compañeros,descubriendo los secretos de la empresa, completando misiones y minijuegos para finalmente averiguar el motivo de la desaparición de su jefe.

## Jugabilidad
### Mecánica
  - **Dentro del edificio:**
    - Moverse a la izquierda (tecla A o ←)
    - Moverse a la derecha (tecla D o →) 
    - Interactuar con objetos y personajes y pasar de frase durante los diálogos(tecla E)
    - *Drag and drop*, pulsar (click izquierdo)
    - Menú de pausa (tecla ESC)
  - **En los minijuegos:** 
    - Moverse a la izquierda (tecla A o ← )
    - Moverse a la derecha (tecla D o →) 
    - Moverse hacia arriba (tecla W o ↑)
    - Moverse hacia abajo (tecla S o ↓)
    - Lanzar, *drag and drop* (click izquierdo) 
    - Disparar: tecla X
    - Menú de pausa (tecla ESC)
  - **Cámara**
    - La cámara sigue al jugador y muestra la planta o minijuego donde se encuentra.

### Dinámica
Al inicio del juego uno de los trabajadores contacta con nuestro protagonista para comunicarle que el jefe ha desaparecido y no se sabe nada de él. Por tanto, requieren de la ayuda del jugador para sacar la empresa a flote con el proviniente caos. Cada planta representa a cada uno de los grupos principales de las personalidad MBTI: analistas, centinelas, diplomáticos y exploradores. En cada piso habrá un empleado, un animador y un jefe con los cuales el jugador irá interactuando, enfrentándose a distintos retos y descubriendo los secretos de la empresa. La relación que tenga el jugador con estos personajes estará influenciada por las distintas personalidades de cada uno y las elecciones del jugador serán determinantes para el final del juego. 

### Estética
El edificio se verá lateralmente, sin pared, como si se tratara de una casa de muñecas. Los assets, los personajes y el espacio serán 2D y no contarán con profundidad, a modo pixelart. En cuanto a los colores, usaremos una escala de grises para representar la monotonía de la vida adulta Además, utilizaremos los colores azul, amarillo, morado y verde para representar cada tipo de personalidad y darle ambientación a los detalles más representativos y/o estéticos de las habitaciones.

<div align="center">
  
<sub>*Referencias de la estética*</sub>
</div>

## Menús y modos de juego
El juego tendrá un menú principal desde el cual se podrá iniciar la partida.
Además contará con un menú de pausa que podrá ser accedido en medio de un nivel. En este menú se podrá reanudar la partida o salir.

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
Cada planta, de la 1ª a la 4ª representa uno de los 4 grupos de personalidad, todas estarán ambientadas en base al color del grupo y su orden será amarillo, verde, azul y morado. En estas el jugador se encontrará con personajes que representan distintas personalidades del grupo, interactuando con ellos/as pasará por tres fases en cada una. Al principio tendremos una pequeña misión en el espacio de la planta, ya sea interactuando con los objetos o a través de conversaciones interactivas con los otros personajes; esta determinará la insignia que se le dé al jugador en esa planta, las insignias representan cada una de las 4 letras o dualidades del tipo de personalidad ( I-E / S-N / T-F / P-J ). Seguidamente, se cruzará con algún personaje en la planta con el que tendrá una pequeña conversación, en la que nuestro jugador interactúa o simplemente escucha lo que digan estos. Al llegar al final de la planta, el jugador se encontrará con un último personaje que le presentará un minijuego; este se llevará a cabo en una escena distinta a la de la planta, y al superarlo se podrá avanzar a la siguiente.

- **Planta 1 - Exploradores**
  - Al comenzar, el jugador se encontrará con Victoria, la secretaria, que le dirá que el jefe, cuya oficina se encuentra en la última planta del edificio, tiene la puerta cerrada y no contesta al teléfono. Le dirá que la mayoría de empleados se han ido a sus casas y que él mismo podría hacerlo. Para ello tendrá dos opciones: 
    - E = Hablar con su compañero de recursos humanos, Álvaro.
    - I = Encontrar una carpeta para pasar por delante de Álvaro sin ser visto.

  - De esta manera el jugador no sólo entenderá las mecánicas básicas del juego, sino que también conseguirá su primera insignia.
  - Así, una vez entendido el juego, empieza la dinámica en la que en cualquier momento nuestro jugador puede abandonar la partida e irse a casa o seguir en el edificio ayudando a sus compañeros y descubriendo el misterio de la actitud del jefe. Para incentivarlo a seguir, Alma, que el próximo personaje con el que se cruza, le dará mensajes de ánimo.
  - Si nuestro jugador ha decidido quedarse en la empresa, se dirigirá al ascensor para subir a la siguiente planta. En la puerta se encontrará con Emilio, con el que tendrá una conversación sobre el juego que ha descubierto al caerse la red, nuestra versión del dinosaurio de google, el ajolote.
    - El minijuego consiste en superar el high score de Emilio en este juego de plataformas en el que, conforme estas van apareciendo, el ajolote tiene que tratar de rebotar para alcanzar la siguiente plataforma e ir subiendo. Si se cae de las plataformas, se reinicia el minijuego.
<div align="center">
  
<sub>*Minijuego planta 1.*</sub>
</div>

- **Planta 2 - Diplomaticos**
  - La siguiente sala no tiene casi luz y está todo patas arriba, según dice Andrea, parece que se ha roto alguna bombilla. Para arreglar la luz hay que entrar a la sala de manenimiento pero está cerrada. Hay que adivinar la clave para entrar, pero siempre tienen un post-it en la pared con la contraseña. El jugador tiene dos opciones.
    - S = Una persona con este tipo de personalidad es muy paciente y metódica a la hora de tomar decisiones y querría estar segura de la clave antes de hacer nada, por lo que buscará el post-it con la contraseña y luego la introducirá.
    - N = Estas personas son más espontáneas y se guían por la intuición, por lo que intentaría intuir los números y probar a abrir la puerta hasta encontrar la clave correcta.

  - Al encenderse la luz el jugador podrá ver que, como le venían advirtiendo, esta planta es un caos; no queda prácticamente nadie y todo está tirado por los suelos, casi como si alguien hubiera perdido los papeles. Melisa le cuenta a nuestro jugador que Pedro ha tenido una discusión con el jefe. 
  - Al acercarse a él se iniciará un diálogo en el que Pedro explica que al parecer el jefe le ha llamado diciendo que hay que reducir plantilla, sin dar muchas explicaciones. Al enterarse de la mala noticia no ha podido contener su ira ya que estos últimos meses han estado todos metiendo horas extra y tener que despedir a tanta gente de la nada será duro para todos.
  - Hace unos años Pedro y el jefe solían dirigir la empresa juntos; pues todo empezó con una idea en el pequeño salón del piso que compartían en la universidad. Conforme crecía la empresa, las gestiones empresariales por hacer se acumulaban, por lo que decidieron que Pedro se quedaría en las líneas de producción y el jefe pasaría a formar parte de la junta directiva, cada vez alejándose más de los trabajadores. Pedro le pedirá al jugador ayuda para recoger.
    - En este minijuego la papelera se moverá en el eje horizontal y la bola de papel , que se podrá cambiar su posición también en el eje horizontal, se tendrá que ir lanzando y encestando en la papelera hasta llegar a 10.
<div align="center">
  
<sub>*Minijuego planta 2.*</sub>
</div>

- **Planta 3 - Centinelas**
  - Esta es la planta de los economistas. Al entrar, el jugador le contará al primer personaje, Lola, lo que ha pasado; ella argumentará que la empresa necesita despedir a esos empleados y que no hay nada de malo en ello. De esta manera empezará un diálogo en el que podremos analizar la siguiente característica de la personalidad del jugador.
    - T = Un thinker estaría de acuerdo con nuestro logista. Si los hechos nos llevan a una conclusión, ¿por qué habría que dudar de ello?
    - F = Un feeler, poniéndose en el lugar de sus compañeros de la planta anterior, le llevaría la contraria e intentaría hacer que Lola empatizara con lxs trabajadorxs que van a ser despedidos.

  - Después de esa pequeña discusión seguiremos adelante en la oficina en la que iremos escuchando conversaciones de los trabajadores que nos dan alguna pista de lo que puede estar pasando. La empresa está creciendo y hay mucho cambio, se escuchan hipótesis sobre salir al mercado internacional y se está empezando a poner en duda la capacidad de liderazgo del jefe.
  - Al final de esta planta vemos a Jesús, el cual tiene cara de llevar varios días sin dormir y está claramente sobrepasado por la situación. Este le contará al jugador que lleva un año complicado; efectivamente la empresa está creciendo mucho, y entre la carga de trabajo, las nuevas tecnologías y que cada vez hay más documentos que llegan en otros idiomas, siente que se está quedando atrás. Él lleva en la empresa prácticamente desde que empezó; de ser un amigo de la familia entendido en finanzas echando una mano, a convertirse en el CFO de la empresa intentando gestionar su crecimiento.  En esta situación de caos en la que los nervios están a flor de piel, Jesus se abrirá al jugador, contándole su situación personal en un pequeño e irónicamente dramático diálogo en el que finalmente, nuestro jugador le ayudará con sus tareas.
    - Este minijuego consta de  dos partes; por un lado, el jugador tendrá que ordenar las carpetas por orden alfabético mediante un drag and drop y por otro, resolverá el puzzle en el que sólo puede mover las fichas a su posición contigua si esta está vacía.
<div align="center">
  
<sub>*Minijuego planta 3.*</sub>
</div>

- **Planta 4 - Analistas**
   - Conforme avanzas en el edificio, la seguridad de las plantas va en aumento. Al llegar a esta, entrarás en una pequeña sala en la que Archie te dirá que la siguiente puerta está cerrada. Así que para poder pasar barajareis dos opciones:
      - J = Estas personas son organizadas y les gusta enfrentarse a los retos con gran preparación, siguen las reglas y se ciñen a los planes. Por lo que si nuestro jugador es un judger intentará encontrar las llaves en esta sala para poder abrir la puerta.
      - P = Los perceivers son más espontáneos y flexibles, por lo que al jugador se le dará también la opción de tirar la puerta abajo para pasar, esto se hará mediante varios clics seguidos en la puerta.

   - Al pasar la puerta, nuestro jugador escuchará a una última conversación entre Charlotte e Inma con la que llegará a entender del todo el drama de la empresa. Entre teorías y debate de ambos personajes podrá discernir lo que está pasando: Al parecer, conforme la empresa ha ido creciendo las demandas de los accionistas también lo han hecho; por lo tanto, estas últimas semanas se ha estado planteando que la única manera de mantenerse competitivos en el mercado internacional es trasladar la producción a una fábrica externa y reducir así los gastos. El jefe ha estado retrasando tomar la decisión, y hoy era el día en el que venía la junta directiva para firmar los últimos documentos, por lo que se ha encerrado en su oficina evitando la confrontación.
   - Finalmente en esta planta el jugador se encontrará con Conrad, que está apunto de conseguir abrir la puerta.
      - Podrás ayudarle disparando a los virus que caigan hasta coger la clave.
<div align="center">
  
<sub>*Minijuego planta 4.*</sub>
</div>

- **Planta 5 - Jefe**
   - La escena final dependerá de las elecciones del jugador y las insignias que haya conseguido:
      - Por un lado, el jugador ha podido abandonar la partida antes de llegar a esta planta. Esta elección le llevará a ver una cinemática en la que se le ve abandonando el edificio y acabará el juego.
      - Por otro lado, si llega a esta planta se encontrará con el jefe y tendrá un diálogo con él, en el que la actitud del jefe representará el tipo de personalidad asignado al jugador mediante las insignias.

### Minijuegos
- **Planta 1 - ¡Supera el highscore de Emilio!**
   - Consiste en superar el high score de Emilio en este juego de plataformas en el que el jugador deberá mover al personaje de lado a lado aprovechando los rebotes. Es decir, el jugador va rebotando en las plataformas y solo controla el movimiento horizontalmente. Si el jugador supera el límite de una de los extremos laterales de la pantalla, aparece por el contrario. Las plataformas están dispuestas verticalmente. Tenemos 3 tipos de plataformas:
      -  Estáticas.
      -  Dinámicas: se mueven de un lado a otro.
      -  Frágiles: Cuando el jugador rebota 2 veces en esta plataforma, se rompe.
   - Si el jugador se cae, se renicia el juego. Una vez superas el highscore de Emilio, el juego finaliza y se vuelve a la escena principal.     
 
- **Planta 2 - Ayuda a Pedro**
   - En este minijuego el jugador tendrá que encestar 10 bolas de papel en la basura para poder superarlo. La basura se moverá de lado a lado por la pantalla suponiendo una dificultad para el jugador. Este podrá mover la bola de papel con el cursor horizontalmente para apuntar. Una vez esté listo para lanzar la bola le dará al click izquierdo. La bola subirá y bajará, simulando una parábola vista de frente. Cuando baje y choque con la parte superior de la basura, se encestará.
   
- **Planta 3 - Ordena las carpetas de Jesus**
   - Jesus se ha dejado las gafas en casa no es capaz de ordenar unas carpetas. El jugador deberá ordenadarlas alfabeticamente. Haciendo click sobre una carpeta podrá arrastrarla por la escena. La carpeta se colocará en su sitio cuando pase sobre él. 
- **Planta 4 - Desbloquea la puerta del jefe**
   - El jefe ha cerrado la puerta de su despacho desde dentro. El jugador tendrá que hackear el sistema para abrirla. Para ello tendrá que eliminar unos virus del ordenador principal de la planta. El jugador controlá una nave que se puede mover en las 4 direcciones y rota sobre ella misma. La nave disparará con la tecla 'x' y, gracias a su movimiento, será capaz de apuntar a sus enemigos. Estos simularan ser virus. Se generan en la pantalla con cierta velocidad y se irán desplazando por ella, apareciendo al otro lado de la pantalla si superan los límites. El jugador no será capaz de esto, chocará con los límites deñ juego. Una vez se hayan generado cierta cantidad de virus, aparecerá un candado. Este, al ser destruido por una de las balas de la nave, finalizará el juego y desbloqueará la puerta del jefe.

### Personajes
- **Personaje principal:** El jugador controla al protagonista de la historia quien irá interactuando con los demás personajes. En un principio, se trata de un personaje simple y plano.
- **Planta 1 - Exploradores:**
  - Victoria, virtuosa; las personas con este tipo de personalidad son amables pero reservadas y tranquilas, asimismo disfrutan de echar una mano y aprenden de su entorno a medida que avanzan. Por lo tanto, si bien Victoria no le dará a nuestro jugador más que un titular de lo que está pasando en la empresa, si que le ayudará contándole lo que ha ido viendo hacer a sus compañeros (las dos opciones de la misión: irse a casa o hablar con Álvaro).
  - Álvaro, aventurero; estas personas disfrutan mucho relacionándose con los demás, es por eso que este será el encargado de recursos humanos. Asimismo, al ser espontáneos e imprevisibles oscilan entre la generosidad y una actitud más egoísta, por lo que nuestro personaje tendrá que navegar una conversación llena de altibajos para poder escaquearse de este día del trabajo.
  - Alma, animadora; esta personalidad se caracteriza por su voluntad de ayudar y ofrecer su apoyo a las personas que les rodean, siempre pueden ver el lado positivo de las cosas e intentan hacérselo ver al resto, pero también son buenos observadores muy capaces de leer las emociones de los demás. Es por eso que si bien Alma animará a nuestro jugador a seguir adelante, entenderá también que quiera irse a casa, dándole la opción de abandonar la partida en cualquier momento.
  - Emilio, emprendedor; directos, inteligentes, graciosos y competitivos, así son las personas de este grupo. Es por eso que Emilio intentará retar al jugador al juego que está jugando, en una conversación llena de chascarrillos y chistes malos.

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
   - Archie, arquitecto; este tipo de personalidad destaca por su capacidad de esfuerzo e inteligencia, gracias a esto son capaces de irradiar confianza y tienen una actitud de que “nada es imposible”. Con su mente imaginativa y curiosa, Archie instará a nuestro jugador a encontrar alguna manera de abrir la puerta.
   - Inma, innovadora; su capacidad de debatir puede resultar irritante, ya que estas personas suelen coger el papel de defensor del diablo. Tienen un agudo sentido del humor basado en su rápido ingenio, y aunque son honestos, son capaces de discutir incansablemente sobre algo en lo que en realidad no creen e incluso hacerse las víctimas. Veremos estas cualidades en su conversación con Charlotte.
   - Charlotte, lógica; expertos en hacer teorías y detectar patrones y  discrepancias, esta tendencia puede llevarles al miedo generalizado al fracaso. Muchas veces están debatiendo con sus propias mentes, aunque en este caso lo estará haciendo con Inma, y por su manera de ser, no tendrá una perspectiva demasiado positiva.
   - Conrad, comandante; estas personas son capaces de proyectar su autoridad, logrando que todo el mundo se una en la búsqueda de un objetivo común, es por eso que conrad es el responsable de la última planta. Utilizan su inteligencia para lograr cualquier objetivo y disfrutan con estos desafíos, por lo que su actitud hacía la tarea de abrir la puerta del jefe será muy energica e implacable. Si bien tienen una habilidad especial a la hora de identificar los talentos de los demás, son muy dados a señalar los fracasos de los demás de una manera fría e insensible, por lo que a la hora de superar este último minijuego será muy duro con el jugador.

- **Planta 5 - Jefe:**
   - Las actitudes posibles del Jefe en base a cada insignia:
      - Insignia S / N :
         - S = El jugador se encontrará al jefe en crisis; el empezó la empresa lleno de ilusión como un proyecto al lado de Pedro, y ahora de pronto se ve teniendo que elegir entre la ética y el dinero, sus relaciones personales y el éxito de la empresa, y con más ansiedad que nunca.
         - N = El jefe estará en un estado zen, e incluso apático. Él sabía que este momento se acercaba y ya no está preocupado por lo que vaya a pasar con la empresa.
      - Insignia E / I :
         - E = El jugador cogerá la iniciativa y le preguntará al jefe si de verdad quiere seguir en el puesto. A lo que él, obviamente, responderá que no, dejando la empresa en manos de nuestro jugador.
         - I = El jefe abandona su cargo y lo deja todo en manos de nuestro jugador, no dándole opción para rechazarla.
      - Insignia T / F :
         - T = Nuestro jugador aceptará la posición, ya que se ve capacitado para gestionar el desastre y llevar adelante a la empresa.
         - F = Recordando la conversación que mantuvo con Pedro, el jugador volverá a él a ofrecerle las riendas de la empresa.
      - Insignia J / P :
         - J = Jefe/Pedro responderán positivos, con esperanza de que se pueda redirigir y salvar la empresa. 
         - P = Lo contrario.

## Referencias
- Estilo cámara y salas: <ins>Plunder Pack</ins>, <ins>Sound Shapes</ins>
- Minijuegos: <ins>Space Invaders</ins>, <ins>A Little to the Left</ins>, <ins>Juego del 15</ins>, <ins>Among Us</ins>, <ins>Pou</ins> 

