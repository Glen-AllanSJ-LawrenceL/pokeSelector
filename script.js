// Pseudo Code:
// Create a Pokemon selector application where users selects or inputs their preferred Pokemon type.
// Once selected, the code will take that input and save it into a variable. The application will then call the API data returning a Pokemon that fits with the user's selected type.


// Stretch Goals:
// Create a filter so that Pokemon can be included or excluded based on generation and/or games (i.e. Generation: Red, Blue, Yellow). Might be possible through this endpoint: https://pokeapi.co/api/v2/generation/{id or name}/
// The API will also be called to return other information on the Pokemon such as size, weight, evolutions etc.


// Create and app object (pokeSelector) for namespace
const pokeSelector = {};


// Obtain Pokemon data by calling the API and saving the relevant information.
// - pokeapi.io is the API we will be using for this Pokemon selector.
// - apikey is not required for data to be obtained as per documentation: https://pokeapi.co/docs/v2.
pokeSelector.apiUrl = "https://pokeapi.co/api/v2/pokemon";

const button = document.querySelector('button');
const typeInput = document.querySelector('option');
let imageEl = document.querySelector('img');
let pokeName = document.querySelector('.pokeName');
let pokeInfo = document.querySelector('.pokeInfo');

// getPokeData when user submits selection
button.addEventListener('click', (event) => {
    pokeInfo.innerHTML = "";
    event.preventDefault();
    pokeSelector.getPokeData();
    // Method used to get sprite data from pokeAPI
})

pokeSelector.getPokeData = () => {
    // Use the URL Constructor to specify the parameters we wish to include in our API endpoint. 
    // NEED URL Constructor with Vanilla JavaScript vs. jQuery which uses the ajax function.
    // Additional query parameters included to compensate for the default 20 results per page limit noramlly imposed by the API.
    const url = new URL(pokeSelector.apiUrl);
    url.search = new URLSearchParams({
        offset: 0,
        limit: 1118,
    })

    // Using the built-in fetch API to make a request to the PokeAPI endpoint
    // This is used to obtain the API data and then parse it into JSON format so that it is useable for the application. 
    
    // const promisesArray = [];
    // for (let i = 0; i <=50; i++){
    //     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    //     promisesArray.push()
    const randomPokemon = Math.floor(Math.random() * 1118);

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            // new fetch
                fetch(jsonResponse.results[randomPokemon].url) 
                .then((data) => {
                    return data.json();
                }).then((pokeData) => {
                    console.log(pokeData);
                    pokemonSprite = pokeData.sprites.other["official-artwork"].front_default;
                        showImages();
                        pokemonName = pokeData.name;
                        showName();
                            // if statement to see if the pokemon has a second type
                        // if (pokeData.types[0].type.name && pokeData.types[1].type.name) {
                        //     pokemonType = pokeData.types[0].type.name;
                        //     pokemonType2 = pokeData.types[1].type.name;
                        //     showType();
                        // } else if (pokeData.types[0].type.name) {
                        //     pokemonType = pokeData.types[0].type.name;
                        //     showType();
                        // }
                        pokemonType = pokeData.types[0].type.name;
                        showType();
                        if (typeof pokeData.types[1].type.name != undefined) {
                            pokemonType2 = pokeData.types[1].type.name;
                            showType2();
                        }
                    })
            // new fetch end

            
            

            // Pass the data into the displayPhotos method
            // AKA call the displayPhotos within getPhotos
            // galleryApp.displayPhotos(jsonResponse);
        })
    
    // create a variable that will hold the pokemon name
    let pokemonName;
    //create a variable that will hold that pokemon sprite
    let pokemonSprite;
    //create a variable that will hold that pokemon description
    let pokemonType;
    let pokemonType2;

    function showImages() {
        imageEl.src = `${pokemonSprite}`;
    }

    function showName() {
        pokeName.textContent = `${pokemonName}`;
    }

    function showType() {
        pokeInfo.appendChild(document.createTextNode(`${pokemonType}`));
    }

    function showType2() {
        pokeInfo.appendChild(document.createTextNode(`, ${pokemonType2}`));
    }
    // function showType() {
        // if statement for pokemon with multiple types
        // if (pokemonType2) {
        //     pokeInfo.textContent = `${pokemonType}, ${pokemonType2}`
        // } else {
        //     pokeInfo.textContent = `${pokemonType}`;
        // }
        // if (pokemonType === 'grass') {
        //     pokeInfo.style.color = 'green';
        // }
}
    
    // I found out through research and in the documentation that the data which is required for our application is nested and requires an additional fetch request to access the API data needed. This is why I need to use a ForEach method to go through all of the pokemon in the array and passing them to a new function:    
    // jsonResponse.results.forEach(allPokemonInfo){
    //     fetchNestedPokemonData(allPokemonInfo){
    //         let nestedApiUrl = url.search;

    //         fetch(nestedApiUrl)
    //             .then(response => response.json())

    //             .then((nestedPokemonData) => {
    //                 console.log(nestedPokemonData);
    //             })
        //     }
        // }    
    // }    

// Create a method () to make API calls when the user has provided an input which is their desired pokemon type. When the API call is successful, the application will display the result by appending or changing text content to the resulting HTML tag which is likely going to be a <p> and/or <h>.

// pokeSelector.displaySprites = (dataFromApi) => {
//     // Query the document and find the first ul
//     const spriteImages = document.querySelector('img');

//     // take the data from the API and iterate through it
//     // for EACH object in the API we will:
//     dataFromApi.forEach((datum) => {
//         // Create list elements 
//         const listElement = document.createElement('li');

//         // Create image elements
//         const image = document.createElement('img');
//         // Add content for img alt and src attributes
//         // This is where you source images and thier alt are going to live.
//         image.src = datum.urls.regular;
//         image.alt = datum.alt_description;

//         // Append the image element to its parent li
//         listElement.appendChild(image);


//         // append the li to the ul
//         ul.appendChild(listElement);
//     })
// }





// - call the above method for a random pokemon to be displayed to give the user an idea of how the user's desired pokemon will be displayed 
// add event listeners for gallery portion so that user can cycle or move to another pokemon with the resulting picture and data.

// Initialization method for pokeSelector application
pokeSelector.init = () => {
    // pokeSelector.getPokeData();
}
//Call the init method to start the app when page loads:
pokeSelector.init();