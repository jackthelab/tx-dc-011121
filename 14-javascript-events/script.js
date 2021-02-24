
// console.log("First");
// setTimeout(function(){console.log("Second")}, 1100)

// // could replace inline function with an abstracted function like..
// // function saySomething() {
// //     console.log("second");
// // }
// // and then write setTimeout(saySomething(), 1100)

// console.log("Third ");

// document.addEventListener('click', function() {
//     console.log("Hey I am clicking")
// })

document.addEventListener('DOMContentLoaded', init)

function init() {
    // document.querySelector("#poke-table").addEventListener('click', function() {
    //     console.log("I'm clicking on the table.");
    // }) 
    clickingOnTable();

    // document.addEventListener('click', function() {
    //         console.log("Hey I am clicking")
    //     })
    // clickingOnPage();

    hoveringOnTitle();

    // addPokemon("Phoenix", "Fire", "25lbs");

    handleFormSubmission();

}

function clickingOnTable() {
    document.querySelector("#poke-table").addEventListener('click', function(event) {
        console.log(event.path[0].innerText);
        console.log(event.target)
        console.log(event.currentTarget)
    }) 
}

function clickingOnPage() {
    document.addEventListener('click', function() {
        console.log("Hey I am clicking")
    })
}

function hoveringOnTitle() {
    document.querySelector("#title").addEventListener('mouseover', function() {
        console.log("I'm hovering on the title.");
    })
}

function addPokemon(pokeName, pokeType, pokeWeight, pokeImg) {
    let newRow = document.createElement('tr')

    let tHead = document.createElement('th')
        tHead.innerText = pokeName
    
    let pokeTypeTd = document.createElement('td')
        pokeTypeTd.innerText = pokeType
    
    let pokeWeightTd = document.createElement('td')
        pokeWeightTd.innerText = pokeWeight

    let pokeImgTd = document.createElement('td')
    let img = document.createElement('img')
        img.src = pokeImg
        pokeImgTd.appendChild(img)

    newRow.append(tHead, pokeTypeTd, pokeWeightTd, pokeImgTd);

    document.getElementById("poke-table").appendChild(newRow);
}

function handleFormSubmission() {
    let form = document.getElementById("poke-form")
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        // console.log(event.target);
        // console.log(event.target);
        const newName = event.target.pokeName.value
        const newType = event.target.pokeType.value
        const newWeight = event.target.pokeWeight.value
        const newImage = event.target.pokeImg.value

        addPokemon(newName, newType, newWeight, newImage);

        form.reset()
    })
}

//Add a new pokemon review
//DOMContentLoaded
//Read Click Event
//Delete Click Event
//Sumbit (create) Event
//Bubble listener