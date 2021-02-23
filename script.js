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
        limit: 898,
    })

    // Using the built-in fetch API to make a request to the PokeAPI endpoint
    // This is used to obtain the API data and then parse it into JSON format so that it is useable for the application. 
    
    // const promisesArray = [];
    // for (let i = 0; i <=50; i++){
    //     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    //     promisesArray.push()
    const randomPokemon = Math.floor(Math.random() * 898);

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
                        pokeData.types.forEach((type) => {
                            showType(type.type.name);
                        })
                    })
            // new fetch end
            })
            
            

            // Pass the data into the displayPhotos method
            // AKA call the displayPhotos within getPhotos
            // galleryApp.displayPhotos(jsonResponse);

    
        }

// CREATE FUNCTION FOR DISPLAY ****
// create a variable that will hold the pokemon name
let pokemonName;
//create a variable that will hold that pokemon sprite
let pokemonSprite;
//create a variable that will hold that pokemon description
let pokemonType;

function showImages() {
    imageEl.src = `${pokemonSprite}`;
}

function showName() {
    pokeName.textContent = `${pokemonName}`;
}

function showType(type) {
    const pokeType = document.createElement('p');
    pokeType.innerText = type;
    if (type === 'grass') {
        pokeType.style.backgroundColor = '#729d39';
    } else if (type === 'normal') {
        pokeType.style.backgroundColor = '#e3e3e3';
    } else if (type === 'fire') {
        pokeType.style.backgroundColor = '#f33535';
    } else if (type === 'water') {
        pokeType.style.backgroundColor = '#3490de';
    } else if (type === 'fighting') {
        pokeType.style.backgroundColor = '#903749';
    } else if (type === 'flying') {
        pokeType.style.backgroundColor = '#80d6ff';
    } else if (type === 'poison') {
        pokeType.style.backgroundColor = '#6639a6';
    } else if (type === 'ground') {
        pokeType.style.backgroundColor = '#ffebbb';
    } else if (type === 'rock') {
        pokeType.style.backgroundColor = '#c7b198';
    } else if (type === 'bug') {
        pokeType.style.backgroundColor = '#a7d129';
    } else if (type === 'ghost') {
        pokeType.style.backgroundColor = '#916dd5';
    } else if (type === 'electric') {
        pokeType.style.backgroundColor = '#f9d56e';
    } else if (type === 'psychic') {
        pokeType.style.backgroundColor = '#ff6699';
    } else if (type === 'ice') {
        pokeType.style.backgroundColor = '#88e1f2';
    } else if (type === 'dragon') {
        pokeType.style.backgroundColor = '#848ccf';
    } else if (type === 'dark') {
        pokeType.style.backgroundColor = '#543a3a';
    } else if (type === 'steel') {
        pokeType.style.backgroundColor = '#dbedf3';
    } else if (type === 'fairy') {
        pokeType.style.backgroundColor = '#fca3cc';
    }
    pokeInfo.appendChild(pokeType);
    // changing the pokeName background color based on the pokemon type
}

// efa8e4
// Function for obtaining user input from search
pokeSelector.getUserChoice = () => {
    document.querySelector('pokeSearch').addEventListener('search', (event) => {
        const userChoice = event.target.value;
        console.log(userChoice);
        })
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