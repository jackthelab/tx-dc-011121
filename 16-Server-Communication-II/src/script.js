const BASE_URL = 'http://localhost:3000/pokemon/'

// When a user clicks on the monsters button:
    // Fetch all of the monster data
    // Render a card for each monster

// When a user submits a name and img URL on the form
    // Make a POST request to /pokemon
    // Render the new pokemon on the DOM

// When a user clicks the like button on a card
    // Make a PATCH request to /pokemon/:id
    // Increment that pokemons likes on the DOM 

// When a user clicks the "LET GO" Btn
    // Make a DELETE request to /pokemon/:id
    // Remove that pokemon from the DOM

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#pokeBtn').addEventListener('click', fetchPokemon)
    document.getElementById("poke-form").addEventListener('submit', handleSubmit)
})

// function fetchPokemon(){
//     fetch(BASE_URL)
//         .then(res => res.json())
//         .then(pokeData => {
//             pokeData.forEach(pokemon => renderPokemon(pokemon));
//         })
// }

// above/below are two ways to write same function -- I like the below better, personally

async function fetchPokemon() {
    const response = await fetch(BASE_URL);
    const pokeData = await response.json();

    pokeData.forEach(pokemon => renderPokemon(pokemon));
}

function renderPokemon(pokemon) {
    // console.log(pokemon);
    let newCard = document.createElement('div');
        newCard.classList.add('card', 'm-2');

    let cardImg = document.createElement('img');
        cardImg.src = pokemon.sprite
        cardImg.className = 'card-img-top'

    let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

    let cardTitle = document.createElement('h5')
        cardTitle.innerText = pokemon.name
        cardTitle.classList.add('card-title')
    
    let likeBtn = document.createElement('button')
        likeBtn.innerText = `Likes: ${pokemon.likes}`
        likeBtn.classList.add('btn', 'btn-primary')
        likeBtn.id = pokemon.id
        likeBtn.addEventListener('click', likePokemon)
    
    let delBtn = document.createElement('button')
        delBtn.innerText = "Let Go"
        delBtn.classList.add('btn', 'btn-danger');
        delBtn.addEventListener('click', () => {
            releasePokemon(pokemon, newCard);
        })
     
    cardBody.append(cardTitle, likeBtn, delBtn);

    newCard.append(cardImg, cardBody);

    document.getElementById("pokemon-container").appendChild(newCard);
}

function handleSubmit(event) {
    event.preventDefault();
// using the event.target.*namefromHTMLelement*.value instead of traditional syntax
    // console.log(event.target.pokeName.value)
    // console.log(event.target.pokeImg.value)
    let newPokemon = {
        name: event.target.pokeName.value,
        likes: 0,
        sprite: event.target.pokeImg.value,
        comments: []
    }

    let reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(newPokemon)
    }

    // debugger

    fetch(BASE_URL, reqObj)
        .then(res => res.json())
        .then(renderPokemon);

    //Not sure if the below works right... 

    // async function addPokemon () {
    //     let response = await fetch(BASE_URL, reqObj);
    //     let pokeToAdd = await response.json()

    //     renderPokemon(pokeToAdd);
    // }
}

function likePokemon(event) {
    console.log(event.target.id)
    console.log(+event.target.innerText.split(" ")[1]);

    let newLikes = {
        likes: +event.target.innerText.split(" ")[1] + 1
    }

    // console.log(newLikes);

    let reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(newLikes)
    }

    fetch(BASE_URL+event.target.id, reqObj)
        .then(res => res.json())
        .then(updatedPokemon => {
            document.getElementById(updatedPokemon.id).innerText = `Likes: ${updatedPokemon.likes}`
        })
}

function releasePokemon(pokemon, card) {
    fetch(BASE_URL+pokemon.id, {method: "DELETE"}).then(() => card.remove());
}