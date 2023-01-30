// if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) { 
//     resolve(); 
/*
2C = two of Clubs (treboles)
3D = two of Diamonds (diamantes)
3H = two of Hearts (Corazones)
3S = two of spades (espadas)
*/

// ahora estaremos trabajando con el patron modulo que es muy importante para prevenir que usuarios exterernos este manipulando nuestro codigo

const miModulo = (() => {
    'use strict'
        // Function para crear el maso y ponerlo ramdon

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'k'];
    let puntosJugadores = [];

    //Referecnia del html
    const btnPedir = document.querySelector('#btn-Pedir'),
        btnDetener = document.querySelector('#btn-Detener'),
        btnNuevo = document.querySelector('#btn-Nuevo');

    const divCartasJugadores = document.querySelectorAll('.div-Cartas'),
        puntosHTML = document.querySelectorAll('small');

        //esta function inicializa el juego
        const inizializarJuego = (numJugadores = 2) => {
            deck = crearDeck();
            puntosJugadores = [];
            for (let i = 0; i < numJugadores; i++){
                puntosJugadores.push(0);
            }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        }

        //esta funcion crea un nuevo deck
    const crearDeck = () =>{

        deck = [];
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
        return _.shuffle(deck);//esto es para ramdomisar el arreglo
    }

    //function me permite tomar una carta

    const perdirCarta = () => {
        if (deck.length === 0){
            throw 'No hay cartas';
        }
        return deck.pop();
    }

    //valor carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); //el substring es para eliminar la letra y solo dejar los numeros, pero ojo porque aun siguen siendo string
        //2 =2, 10 = 10 etc
        // haceindolo con una condicion ternaria
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10
                : (valor * 1); // el valor * 1, es para convertir el string a numero
    }

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`; //agregando la carta en especifico
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = perdirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
            
        }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    //eventos
    btnPedir.addEventListener('click', () => {

        const carta = perdirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

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

        turnoComputadora(puntosJugadores[0]);
    });

    // Juego Nuevo
    btnNuevo.addEventListener('click', () => {
        inizializarJuego();       
    });

    return {
        nuevoJuego: inizializarJuego
    };

})();// asi es como se ve, es una funcion de flecha anonima que se auto invoca


