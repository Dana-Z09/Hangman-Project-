var nombreJugadorHTML=document.getElementById("NombreJugador");
var nombreJugador;
var listaJugadores=[]; //aqui se guardan todos los jugadores del local storge
var jugadorPrincipal;


/*Funciones
en el otro archivo tengo que guardar el jugador en el local storage y actualizar sus datos
*/



// Prepara la pagina
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("HistorialJugadores"==null)){
  localStorage.setItem("HistorialJugadores", JSON.stringify(listaJugadores))}
  else{
    tablaLocalStorage();
  }
});

//Funcion que llena la tabla con los datos del local storage
function tablaLocalStorage(){
    // Obtener referencia a la tabla
  var tabla = document.querySelector("table tbody");
  // Paso 1: Obtener todas las claves del localStorage

  listaJugadores=JSON.parse(localStorage.getItem("HistorialJugadores"));

  //Paso 2: Obtener la informacion de cada jugador y colocar en la tabla

  listaJugadores.forEach(function (jugador) {
      var row = tabla.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.textContent = jugador.nombre; // Nombre
      cell2.textContent = jugador.victorias;//victorias
      cell3.textContent = jugador.puntos;// Puntaje
    });
  }
//funcion principal
function comenzarJuego(){
  //Validacion de nombre
  if(validarNombreJugador()){
    nombreJugador=strTitulo(nombreJugadorHTML.value);
    jugadorPrincipal=busquedaPorNombre(listaJugadores,nombreJugador);
    if (jugadorPrincipal==null){
      jugadorPrincipal = new Jugador(nombreJugador);
      listaJugadores.push(jugadorPrincipal);
      localStorage.setItem("HistorialJugadores", JSON.stringify(listaJugadores));
    }
    localStorage.setItem("Jugador-Principal", JSON.stringify(jugadorPrincipal));
  }
      alertaVerificacion()
}

//Funcion que busca a un jugador en la lista por su nombre, si esta te retorna el objeto, si no esta retorna null
function busquedaPorNombre(listaJugadores, nombreJugador){
  for(var i=0;i<listaJugadores.length;i++){
    if(listaJugadores[i].nombre==nombreJugador){
      return listaJugadores[i];
    }
  }
  return null;
}
// La siguiente funcion valida el elemento input
function validarNombreJugador() {
    // Variable que usaremos para determinar si el input es valido
    let isValid = false;

    // El input que queremos validar
    const input = nombreJugadorHTML;

    input.willValidate = false;

    // El tamaño maximo y minimo del nombre
    const max = 14;
    const min=3;

    // El pattern que vamos a comprobar
    const pattern = new RegExp('^[A-Z]+$', 'i');

    // Primera validacion, input vacio -> no es valido
    if(!input.value) {
      isValid = false;
    } else {
      // Segunda validacion, input mayor a 14 o menor a 3 -> no es valido
      if(input.value.length > max || input.value.length<min) {
        isValid = false;
      } else {
        // Tercera validacion, validacion de caracteres
        if(!pattern.test(input.value)){ 
        // Si queremos agregar letras acentuadas y/o letra ñ debemos usar
        // codigos de Unicode (ejemplo: Ñ: \u00D1  ñ: \u00F1)
          isValid = false;
        } else {
          // Si pasamos todas la validaciones anteriores, entonces el input es valido
          isValid = true;
        }
      }
    }
    // devolvemos el valor de isValid
    return isValid;
}
//Funcion que muestra un mensaje emergente relacionado con la validación para pasar al juego
function alertaVerificacion() {
        const valido = validarNombreJugador();
        if (!valido) {
            swal("Ingreso Inválido", "El nombre solo puede contener letras, entre 3 a 14 letras. Signos, números o espacios no están permitidos por el programa.", "error");
        } else {


          swal({

          title:'Ingreso válido',
          text: `¡Disfruta el juego ${nombreJugador}!`,
          icon:'success',
          button: 'Aceptar',
          })
          .then((isOkay) => {
            if(isOkay){
              location.href="index2.html";
            }

          });}
}
//Funcion string en formato titulo
function strTitulo(str) {
    str=str.toLowerCase();
    const capitalized =  str.charAt(0).toUpperCase()+ str.slice(1);
    return capitalized;
}

//Clase Jugador
function Jugador(nombre) {
  this.nombre=nombre;
  this.puntos=0;
  this.victorias=0;

  this.getVictorias=function(){
    return this.victorias;
  };
  this.setVictorias=function(victorias){
    this.victorias=victorias;
  };
  this.getPuntos=function(){
    return this.puntos;
  };
  this.setPuntos=function(puntos){
    this.puntos=puntos;
  };
  this.getNombre=function(){
    return this.nombre;
  };
}


