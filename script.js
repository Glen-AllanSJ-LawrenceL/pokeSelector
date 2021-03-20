// Pseudo Code:
// Basic MVP:
// Create a Pokemon selector application where users select or input their preferred Pokemon type either by clicking a button or typing it into a search field.
// Once selected, the code will take that input and save it into a variable. The application will then call the API data returning a Pokemon that fits with the user's selected type and return an image of the pokemon including basic data such as name, type, pokemon number.


// Stretch Goals & Ideas for Additional Functionality in the Future:
// Creating a filter so that Pokemon can be included or excluded based on generation and/or games (i.e. Generation: Red, Blue, Yellow). Might be possible through this endpoint: https://pokeapi.co/api/v2/generation/{id or name}/
// Adding a drop down user selectable menu where the user can select their preferred pokemon type and receive a random pokemon with their desired typing.
// The API will also be called to return other information on the Pokemon such as size, weight, evolutions etc.
// - call the method for a random pokemon on page load to give the user an idea of how the user's desired pokemon will be displayed on the application.
// add additional event listeners and create gallery functionality so that user can cycle or move to another pokemon with the resulting picture and data.


// Create and app object (pokeSelector) for namespace:
const pokeSelector = {};


// Obtain Pokemon data by calling the API and saving the relevant information.
// - pokeapi.io is the API we will be using for this Pokemon selector.
// - apikey is not required for data to be obtained as per documentation: https://pokeapi.co/docs/v2.
pokeSelector.apiUrl = 'https://pokeapi.co/api/v2/pokemon';

const button = document.querySelector('button');
const typeInput = document.querySelector('option');
let imageEl = document.querySelector('img');
let pokeNumber = document.querySelector('.pokeNumber');
let pokeName = document.querySelector('.pokeName');
let pokeInfo = document.querySelector('.pokeInfo');
let pokeWeight = document.querySelector('.pokeWeight');
let pokeHeight = document.querySelector('.pokeHeight');


// Event listener for random generate button:
button.addEventListener('click', (event) => {
    // Prevents form button from refreshing the page every time it is clicked.
    event.preventDefault();
    // Calling data from pokeAPI so that it can be generated onto the page when user clicks generate button.
    pokeSelector.getPokeData();
    
})

pokeSelector.getPokeData = (userChoice) => {
    // Use the URL Constructor to specify the parameters we wish to include in our API endpoint. 
    // Additional query parameters included to compensate for the default 20 results per page limit normally imposed by the API.
    let url = new URL(pokeSelector.apiUrl);
    url.search = new URLSearchParams({
        offset: 0,
        limit: 898,
    })

    // Using the built-in fetch API to make a request to the PokeAPI endpoint.
    // This is used to obtain the API data and then parse it into JSON format so that it is useable for the application. 
    let randomPokemon;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            // New fetch API call for nested pokemon data
            // If statement used to determine if the user types in a ppokemon name. If userChoice evaluates as false then random generation of pokemon will be available. Else iterate through API data and return pokemon name result that matches userChoice.
            if (!userChoice){
                randomPokemon = Math.floor(Math.random() * 898);
            } else {
                for (let i = 0; i <= 898; i++) {
                    if (jsonResponse.results[i].name === userChoice) {
                        randomPokemon = i;
                        break;
                    }
                }
            }
            fetch(jsonResponse.results[randomPokemon].url) 
                .then((data) => {
                    return data.json();
                }).then((pokeData) => {
                    pokemonSprite = pokeData.sprites.other["official-artwork"].front_default;
                    pokemonNumber = pokeData.id;
                    pokemonName = pokeData.name;
                    pokeInfo.innerHTML = "";
                    pokeData.types.forEach((type) => {
                        showType(type.type.name);
                    });
                    pokemonWeight = pokeData.weight;
                    pokemonHeight = pokeData.height;
                    pokeSelector.pokeInput();
                    })
                // Used to catch errors if 2nd API fetch request fails.    
                .catch ( (error) => swal.fire({
                    // alert('2nd fetch API request has failed', error);
                    title: "Error",
                    icon: "error",
                    text: "2nd fetch API request has failed! Please try again later!"
                    })
                );    
            // New fetch end
        })
        // Used to catch errors if 1st API fetch request fails due to the user not typing in the FULL proper name for a Pokemon.
        // This also has the effect of informing the user that they must type in a proper pokemon name otherwise they will not get a specific result.
        .catch( (error) => swal.fire({
            // alert('That is not a full Pokemon name, please enter one and try again!', error);
            title: "Pokemon not found!",
            icon: "error",
            text: "That is not a full pokemon name, please enter one and try again!",
            timer: 4500,
            })
        );     
            
}

// Method used to call all of the important pokemon data from the API so that it can be displayed when the user types in the name of their desired pokemon.  
pokeSelector.pokeInput = () => {
    showImages();
    showNumber();
    showName();
    showWeight();
    showHeight();
}

// CREATE FUNCTION FOR DISPLAY ****
let pokemonNumber;
// create a variable that will hold the pokemon's name
let pokemonName;
// create a variable that will hold that pokemon's sprite
let pokemonSprite;
// create a variable that will hold that pokemon's type
let pokemonType;
// create a variable that will hold that pokemon's weight
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
    // changing the pokeName background color based on the pokemon type.
}

// Function to display weight on page. Weight API data is in Hectograms (Hg) so divided by 10 as 1 kg = 10 Hg and fixed to 1 decimal place.
function showWeight(){
    pokeWeight.textContent = `Weight: ${(pokemonWeight / 10).toFixed(1)} kilograms`; 
}

// Function to display height. Height data was in decimetres so converted to centimetres by multiplying by 10.
function showHeight(){
    pokeHeight.textContent = `Height: ${pokemonHeight * 10} centimetres`;
}


// Function for obtaining user input from search field which then checks to see if the user entered in the proper name of a Pokemon. If Enter is pressed and the field is completely empty, an alert will popup indicating that the user needs to enter the full proper name of a Pokemon to obtain a result:
pokeSelector.getUserChoice = () => {
    const pokemonSearch = document.getElementById('pokeSearch');
    pokemonSearch.addEventListener('keypress', (event) => {
        pokemonSearch.textContent = '';
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!event.target.value) {
                alert('Please enter in a full Pokemon name!');
            } else {
                const userInput = event.target.value;
                const userChoice = userInput.toLowerCase(); 
                pokeSelector.getPokeData(userChoice);
                // Clears the search field after user choice Pokemon is generated:
                pokemonSearch.value = '';
            }
        }
    })
}  

// Initialization method for pokeSelector application
pokeSelector.init = () => {
    pokeSelector.getUserChoice();
}
//Call the init method to start the app when page loads:
pokeSelector.init();