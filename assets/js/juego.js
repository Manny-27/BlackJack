// if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) { 
//     resolve(); 
/*
2C = two of Clubs (treboles)
3D = two of Diamonds (diamantes)
3H = two of Hearts (Corazones)
3S = two of spades (espadas)
*/

// Function para crear el maso y ponerlo ramdon

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'k'];
let puntosJugador = 0, puntosComputadora = 0;

//Referecnia del html
const btnPedir = document.querySelector('#btn-Pedir');
const btnDetener = document.querySelector('#btn-Detener');
const btnNuevo = document.querySelector('#btn-Nuevo');



const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

const crearDeck = () =>{

    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);//esto es para ramdomisar el arreglo
    console.log(deck);
    return deck;
}

crearDeck();

//function para pedir una carta

const perdirCarta = () => {
    if (deck.length === 0){
        throw 'No hay cartas';
    }

    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta);
    return carta;
}

// perdirCarta();

//function de valor de la carta

const valorCarta = (carta) => {
    
    const valor = carta.substring(0, carta.length - 1); //el substring es para eliminar la letra y solo dejar los numeros, pero ojo porque aun siguen siendo string
    //2 =2, 10 = 10 etc
    // haceindolo con una condicion ternaria
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : (valor * 1); // el valor * 1, es para convertir el string a numero


    // let puntos = 0;
    // if( isNaN(valor) ){
    //     puntos( valor === 'A' ) ? 11 : 10;
    // }else{
    //     puntos = valor * 1;
    // }
}

// const valor = valorCarta( perdirCarta() );
// console.log({valor});

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = perdirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);

        puntosHTML[1].innerText = puntosComputadora;
    
        // <img class="carta" src="assets/cartas/10S.png">  
        // <img class="carta" src="assets/cartas/ac.png" alt="150"></img>  
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; //agregando la carta en especifico
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if(puntosMinimos > 21){
            break;
        }

    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos ){
            alert('Nadie Gana');
        }else if (puntosMinimos > 21){
            alert('Computadira Gana');
        }else if(puntosComputadora > 21){
            alert('Gano Jugador');
        }else{
            alert('Gano Maquina');
        }
    }, 10);
}


//eventos
btnPedir.addEventListener('click', () => {
    const carta = perdirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;
    
    // <img class="carta" src="assets/cartas/10S.png">    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`; //agregando la carta en especifico
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if (puntosJugador > 21){
        console.warn('perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('que chepozo');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
});

// Juego Nuevo
btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador =0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});