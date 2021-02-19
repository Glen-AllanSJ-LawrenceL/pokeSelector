// Pseudo Code:
// Create a Pokemon selector application where users selects or inputs their preferred Pokemon type.
// Once selected, the code will take that input and save it into a variable. The application will then call the API data returning a Pokemon that fits with the user's selected type.
// The API will also be called to return other information on the Pokemon such as size, weight, evolutions etc.

// Stretch Goals:
// Create a filter so that Pokemon can be included or excluded based on generation and/or games (i.e. Generation: Red, Blue, Yellow). Might be possible through this endpoint: https://pokeapi.co/api/v2/generation/{id or name}/



// Create and app object (pokemonSelector)

// initialize data from the following:
// - pokeapi.io is the API we will be using for this Pokemon selector.
// - apikey is not required for data to be obtained.



// Create a method () to make API calls when the user has provided an input which is their desired pokemon type. When the API call is successful, the application will display the result by appending or changing text content to the resulting HTML tag which is likely going to be a <p> and/or <h>.

// Create an init method to begin loading of the application.
// - call the above method for a random pokemon to be displayed to give the user an idea of how the user's desired pokemon will be displayed 
// add event listeners for gallery portion so that user can cycle or move to another pokemon with the resulting picture and data.  