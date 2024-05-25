var nombreJugadorHTML=document.getElementById("NombreJugador");
var nombreJugador;
//funcion principal
function comenzarJuego(){
    if(validarNombreJugador()){
        console.log("selogro");
        nombreJugador=strTitulo(nombreJugadorHTML.value);
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