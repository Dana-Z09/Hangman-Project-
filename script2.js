var vidas=6;
var turnos=0;
var puntos=0;
var listaPalabras=["Abetos", "Abriga", "Abuela", "Acceso", "Bromas", "Barniz", "Basado", "Brutal", "Cabeza", "Casita", "Cascos", "Celosa", "Dulces", "Dotado", "Discos", "Dureza", "Entera", "Exacto", "Encima", "Enfado", "Famosa", "Fresas", "Filtro", "Flecha", "Helado", "Herida", "Hierro", "Huevos", "Infiel", "Inflar", "Inerte", "Imagen", "Jardín", "Juicio", "Jarrón", "Juzgar", "Labios", "Llorar", "Lluvia", "Locura", "Música", "Morado", "Modelo", "Madera", "Nervio", "Ninfas", "Número", "Nombre", "Omitir", "Opinar", "Olfato", "Objeto", "Pensar", "Parque", "Pierna", "Pelota", "Riesgo", "Romper", "Rutina", "Ranura", "Sabios", "Simple", "Sirven", "Soplar", "Tienda", "Torres", "Tesoro", "Trueno", "Unidad", "Unirse", "Umbral", "Usando", "Verano", "Vicios", "Viejas", "Visual"];

var lose=false;

var palabraPrincipal;

var letrasCorrectas=[];

//la primera letra de la palabra no se muestra

const lineas= document.querySelector('.linealetra');
const divTeclado= document.querySelector('.teclado');
const imagen= document.querySelector('.imagenahorcado');
const puntosLocales= document.querySelector('.puntos');

function resetGame(){
    vidas=6;
    turnos=0;
    puntos=0;
    letrasCorrectas=[];
    //lineas de la palabras
    palabraPrincipal=seleccionarPalabra();
    letrasPrincipales=palabraPrincipal.split('');
    lineas.innerHTML=palabraPrincipal.split('').map(() => `<li class="letra"></li>`).join('');
    imagen.scr='imagenes\\6vidas.png';
    divTeclado.querySelectorAll("button").forEach(btn => btn.disabled=false);
    
}
crearTeclado();



function jugar(boton,letraSeleccionada){
    console.log(palabraPrincipal); 
    turnos++;
    if (palabraPrincipal.includes(letraSeleccionada)){

    [...palabraPrincipal].forEach((letra, indice) => {
        console.log(indice)
        if(letra===letraSeleccionada){
            letrasCorrectas.push(letra);
            lineas.querySelectorAll("li")[indice].innerHTML=letra;
            lineas.querySelectorAll("li")[indice].classList.add("letrasCorrectas");
            puntos+=calculoPuntos(cantidadLetra(letra));
        }
    });
    } else {
        vidas--;
        console.log(vidas);
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
     /*
    cambiar la muestra en pantalla
    vidas
    puntos
    nombre
    turnos
    */
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
}
function crearTeclado(){
for (let index=97; index<=122; index++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index);
    divTeclado.appendChild(button);
    button.addEventListener("click", (e) => jugar(e.target, String.fromCharCode(index)));
resetGame();
}}