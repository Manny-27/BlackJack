/*
2C = two of Clubs (treboles)
3D = two of Diamonds (diamantes)
3H = two of Hearts (Corazones)
3S = two of spades (espadas)
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'k'];

const crearDeck = () =>{

    for(let i = 2; i < 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    console.log(deck);
    deck = _.shuffle(deck);//esto es para ramdomisar el arreglo
    console.log(deck);
    return deck;
}

crearDeck();
