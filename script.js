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
pokeSelector.apiUrl = "https://pokeapi.co/api/v2/pokemon/";

const button = document.querySelector('button');
const typeInput = document.querySelector('option');
let imageEl = document.querySelector('img');
let pokeNumber = document.querySelector('.pokeNumber');
let pokeName = document.querySelector('.pokeName');
let pokeInfo = document.querySelector('.pokeInfo');
let pokeWeight = document.querySelector('.pokeWeight');
let pokeHeight = document.querySelector('.pokeHeight');

pokeSelector.randomPokemon = Math.floor(Math.random() * 898);


// getPokeData when user submits selection
// button.addEventListener('click', (event) => {
//     pokeInfo.innerHTML = "";
//     event.preventDefault();
//     pokeSelector.getPokeData();
//     // Method used to get sprite data from pokeAPI
// })

// Function for obtaining user input from search
pokeSelector.getUserChoice = () => {
    pokeSearch.textContent = "";
    const pokemonSearch = document.getElementById('pokeSearch');
    pokemonSearch.addEventListener('keyup', (event) => {
        console.log(event.target.value);
        const userChoice = event.target.value;

        pokeSelector.getPokeData(userChoice);
        console.log(userChoice);

        // showImages();
        // showName();
        // showType();
    })
}

pokeSelector.getPokeData = (userChoice = randomPokemon) => {
    // Use the URL Constructor to specify the parameters we wish to include in our API endpoint. 
    // NEED URL Constructor with Vanilla JavaScript vs. jQuery which uses the ajax function.
    // Additional query parameters included to compensate for the default 20 results per page limit noramlly imposed by the API.
    const url = new URL(`${pokeSelector.apiUrl}${userChoice}`);
    url.search = new URLSearchParams({
        // offset: 0,
        // limit: 898,
        name: userChoice,
    })


    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse)
            // new fetch
            fetch(jsonResponse.results.url) 
                .then((data) => {
                    return data.json();
                }).then((pokeData) => {
                    console.log(pokeData);
                    pokemonSprite = pokeData.sprites.other["official-artwork"].front_default;
                    showImages();
                    pokemonNumber = pokeData.id;
                    showNumber();
                    pokemonName = pokeData.name;
                    showName();
                    pokeData.types.forEach((type) => {
                        showType(type.type.name);
                    });
                    pokemonWeight = pokeData.weight;
                    showWeight();
                    pokemonHeight = pokeData.height;
                    showHeight();
                    })
                // Used to catch errors if 2nd API fetch request fails.    
                    .catch ( (error) => {
                        alert('2nd fetch API request has failed', error);
                    });    
            // new fetch end
        })
        // Used to catch errors if 1st API fetch request fails
        .catch( (error) => {
            alert('1st fetch API request has failed', error);
        });     
}
        

// CREATE FUNCTION FOR DISPLAY ****
let pokemonNumber;
// create a variable that will hold the pokemon name
let pokemonName;
//create a variable that will hold that pokemon sprite
let pokemonSprite;
//create a variable that will hold that pokemon description
let pokemonType;
// create a variable that will hold that pokemon weight
let pokemonWeight;
// Create a variable that will hold that pokemon's height
let pokemonHeight;


function showNumber() {
    pokeNumber.textContent = `National Pokédex #${pokemonNumber}`;
}

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

// Function to display weight on page. Weight API is in Hectograms (Hg) so divided by 10 as 1 kg = 10 Hg and fixed to 1 decimal place.
function showWeight(){
    pokeWeight.textContent = `Weight: ${(pokemonWeight / 10).toFixed(1)} kilograms`; 
}

// Function to display height. Height data was in decimetres so converted to centimetres by multiplying.
function showHeight(){
    pokeHeight.textContent = `Height: ${pokemonHeight * 10} centimetres`;
}

// efa8e4





// Initialization method for pokeSelector application
pokeSelector.init = () => {
    pokeSelector.getUserChoice();
    // pokeSelector.getPokeData();
}
//Call the init method to start the app when page loads:
pokeSelector.init();