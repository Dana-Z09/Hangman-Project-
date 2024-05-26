var vidas, turnos, puntos,nombrePrincipal;
var listaPalabras=[   "Abandonar", "Abanico", "Abominar", "Abril", "Abrojo", "Academia", "Accidente", "Aceite", "Acelga", "Acera", "Acero", "Aciago", "Acolito", "Acordeon", "Acosar", "Acrostico", "Acuarela", "Adiccion", "Adivinar", "Adonis", "Adrede", "Aduana", "Adulterio", "Aforismo", "Afrodisiaco", "Agasajar", "Agencia", "Agiotista", "Agnosticismo", "Agosto", "Agregar", "Ahorrar", "Ajedrez", "Ajiaco", "Ajetreo", "Aji", "Alabarda", "Alacran", "Alarma", "Albumina", "Alcalde", "Alcancia", "Alcantarilla", "Alcatraz", "Alcohol", "Alegoria", "Alferez", "Alfombra", "Algoritmo", "Alguacil","Abetos", "Abriga", "Abuela", "Acceso", "Bromas", "Barniz", "Basado", "Brutal", "Cabeza", "Casita", "Cascos", "Celosa", "Dulces", "Dotado", "Discos", "Dureza", "Entera", "Exacto", "Encima", "Enfado", "Famosa", "Fresas", "Filtro", "Flecha", "Helado", "Herida", "Hierro", "Huevos", "Infiel", "Inflar", "Inerte", "Imagen", "Jardin", "Juicio", "Jarron", "Juzgar", "Labios", "Llorar", "Lluvia", "Locura", "Musica", "Morado", "Modelo", "Madera", "Nervio", "Ninfas", "Numero", "Nombre", "Omitir", "Opinar", "Olfato", "Objeto", "Pensar", "Parque", "Pierna", "Pelota", "Riesgo", "Romper", "Rutina", "Ranura", "Sabios", "Simple", "Sirven", "Soplar", "Tienda", "Torres", "Tesoro", "Trueno", "Unidad", "Unirse", "Umbral", "Usando", "Verano", "Vicios", "Viejas", "Visual"];

var lose=false;

var palabraPrincipal;

var letrasCorrectas=[];

//la primera letra de la palabra no se muestra

const lineas= document.querySelector('.linealetra');
const divTeclado= document.querySelector('.teclado');
const imagen= document.querySelector('.imagen');
const puntosPantalla= document.querySelector('.puntos');
const nombrePantalla= document.querySelector('.nombrePrincipal');
const turnosPantalla= document.querySelector('.turno');
const vidasPantalla= document.querySelector('.vidas');

function resetGame(){
    vidas=6;
    turnos=0;
    puntos=0;
      //FALTA EL JUGADOR 
    ///nombrePrincipal=jugador.nombre; 
    letrasCorrectas=[];
    //imagenes no se ven
    //imagen.scr="imagenes\\0vidas.png";
    
    vidasPantalla.innerText=`${vidas}`;
    turnosPantalla.innerText=`${turnos}`;
    puntosPantalla.innerText=`${puntos}`;
    nombrePantalla.innerText=`${nombrePrincipal}`;

    //lineas de la palabras
    palabraPrincipal=seleccionarPalabra().toLowerCase();
    letrasPrincipales=palabraPrincipal.split('');
    lineas.innerHTML=palabraPrincipal.split('').map(() => `<li class="letra"></li>`).join('');
    divTeclado.querySelectorAll("button").forEach(btn => btn.disabled=false);
    
}

crearTeclado();



function jugar(boton,letraSeleccionada){
    console.log(palabraPrincipal); 
    turnos++;
    if (palabraPrincipal.includes(letraSeleccionada)){

    [...palabraPrincipal].forEach((letra, indice) => {
        if(letra===letraSeleccionada){
            letrasCorrectas.push(letra);
            lineas.querySelectorAll("li")[indice].innerText=letra;
            console.log(letra);
            console.log(indice);
            lineas.querySelectorAll("li")[indice].classList.add("letrasCorrectas");
            puntos+=calculoPuntos(cantidadLetra(letra));
        }
    });
    } else {
        vidas--;
        console.log(vidas);
        //imagenes no se ven
        switch (vidas){

        case 1:{

                imagen.scr='imagenes\\1vidas.png';
                break;
        }
        case 2:{
                imagen.scr='imagenes\\2vidas.png';
                break;
        }
        case 3:{
                imagen.scr='imagenes\\3vidas.png';
                break;
        }
        case 4:{
                imagen.scr='imagenes\\4vidas.png';
                break;
        }
        case 5:{
                imagen.scr='imagenes\\5vidas.png';
                break;
        }
        case 0:{
            lose=true
            imagen.scr='imagenes\\0vidas.png';
            break;
        }
        }
    }
    
    

    boton.disabled=true;

    vidasPantalla.innerText=`${vidas}`;

    turnosPantalla.innerText=`${turnos}`;

    puntosPantalla.innerText=`${puntos}`;

    nombrePantalla.innerText=`${nombrePrincipal}`;
    
    if (lose==true){
        swal({

            title:'Perdiste 😣',
            icon:'error',
            button: 'Aceptar',
            closeOnEsc: false,
            closeOnClickOutside: false,
            })
            .then((isOkay) => {
              if(isOkay){
                resetGame();
                location.href="index1.html";}
});}
    if (letrasCorrectas.length === palabraPrincipal.length) {
        swal({

            title:'¡Ganaste! 😁',
            icon:'success',
            button: 'Aceptar',
            closeOnEsc: false,
            closeOnClickOutside: false,
            })
            .then((isOkay) => {
              if(isOkay){
                resetGame();
                location.href="index1.html";}

                //modficar el objeto
                //guardar la nueva lista en local storage
});}
} 




function calculoPuntos(cantidadLetra){
    return vidas*cantidadLetra;
}
function cantidadLetra(letra){
    return letrasPrincipales.filter(letraPrincipal => letraPrincipal===letra).length;
}
//Funcion que regresa una palabra aleatoria
function seleccionarPalabra(){
    var palabra=listaPalabras[Math.floor(Math.random()*listaPalabras.length)];
    return palabra;

    //aqui va reser
}
function crearTeclado(){
    for (let index=97; index<=122; index++) {
        const boton = document.createElement("button");
        boton.innerText = String.fromCharCode(index);
        divTeclado.appendChild(boton);
        boton.addEventListener("click", (e) => jugar(e.target, String.fromCharCode(index)));
        resetGame()
    }}