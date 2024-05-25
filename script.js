var nombreJugadorHTML=document.getElementById("NombreJugador");
var nombreJugador;
var listaJugadores; //aqui se guardan todos los jugadores del local storge
var jugadorPrincipal;

/*Funciones

buscador de jugador (nombreJugador){
    for(var i=0;i<listaJugadores.length;i++){
        if(listaJugadores[i].nombre==nombreJugador){
            return listaJugadores[i];
        }
    }
    return null;
}


si el jugador esta entonces se asigna a jugador principal con todos sus datos

si el jugador no esta entonces se crea un nuevo jugador con todos sus datos



en el otro archivo tengo que guardar el jugador en el local storage y actualizar sus datos
*/

//funcion principal
function comenzarJuego(){
    if(validarNombreJugador()){
        nombreJugador=strTitulo(nombreJugadorHTML.value);


        location.href="index2.html";
        /*
        buscar jugador
        si esta 
            te lleva a la otra pagina
        si no esta
            creas uno
            te lleva a la otra pagina
        */
    }
    alertaVerificacion();
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
//Funcion que muestra un mensaje emergente relacionado con la validación
    function alertaVerificacion() {
        const valido = validarNombreJugador();
        if (!valido) {
            swal("Ingreso Inválido", "El nombre solo puede contener letras, entre 3 a 14 letras. Signos, números o espacios no están permitidos por el programa.", "error");
        } else {
          swal('Ingreso válido', `¡Disfruta el juego ${nombreJugador}!`, "success");
        }
}
//Funcion string en formato titulo
function strTitulo(str) {
    str=str.toLowerCase();
    const capitalized =  str.charAt(0).toUpperCase()+ str.slice(1);
    return capitalized;
}

// Prepara la pagina
document.addEventListener("DOMContentLoaded", function () {
    tablaLocalStorage();
});



























//Funcion que llena la tabla con los datos del local storage
/*function tablaLocalStorage(){
    // Obtener referencia a la tabla
  var tabla = document.querySelector("table tbody");
  // Paso 1: Obtener todas las claves del localStorage
  var clave = Object.keys(localStorage);

  // Paso 2: Iterar sobre las claves y obtener los valores correspondientes
  var listaJugadores = [];

  clave.forEach(function (key) {
    var valor = localStorage.getItem(key);
    // Paso 3: Almacenar la clave y el valor en un objeto
    localStorageData.push({ key: key, value: valor });
  });
  // Verificar si hay datos en el almacenamiento local
  if (localStorageData.length > 0) {
    // Limpiar el contenido existente de la tabla
    table.innerHTML = "";

    localStorageData.sort(function (a, b) {
      var valueA = parseInt(a.value);
      var valueB = parseInt(b.value);
      return valueB - valueA;
    });

    localStorageData.forEach(function (item) {
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.textContent = item.key; // Clave
      cell2.textContent = item.value;
    });
  }
}*/