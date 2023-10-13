function devuelveTextoDeAlerta() {
  return "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH";
}

function desaparece(nombre) {
	var button = document.getElementById(nombre);
  button.style.visibility='hidden';
}

function aparece(nombre){
  var button = document.getElementById(nombre);
  button.style.visibility='visible';
}

function apareceDesaparece(nombre){
  var button = document.getElementById(nombre);
  var audio = document.getElementById("audio3");
  audio.play();

  if(button.style.visibility == 'visible'){
    button.style.visibility='hidden';
  }
  else{
    button.style.visibility='visible';
  }
}

function cosasChulas(nombre, nombre2){
  var button = document.getElementById(nombre);
  var button2 = document.getElementById(nombre2);
  var audio = document.getElementById("audio2");
  audio.play();

  if(button.style.visibility == 'visible'){
    button.style.visibility='hidden';
    button2.style.visibility='hidden';
  }
  else{
    button.style.visibility='visible';
    button2.style.visibility='visible';
  }
}

function cambioColor(nombre, nombre2, nombre3){
  var button = document.getElementById(nombre);
  var button2 = document.getElementById(nombre2);
  var button3 = document.getElementById(nombre3);
  var audio = document.getElementById("audio");
  audio.play();
  
  button3.style.color='orange';
  button2.style.color='rebeccapurple';
  button.style.color='tan';

}