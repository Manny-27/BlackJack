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

    console.log(deck);
    console.log(carta);
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

const valor = valorCarta( perdirCarta() );
console.log({valor});
