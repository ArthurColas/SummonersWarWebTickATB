import { createMonsters } from './createMonsters.js';

export function load(numberMonstersInput) {

    const storedNumberMonsters = localStorage.getItem('numberMonsters');
    if (storedNumberMonsters !== null && !isNaN(storedNumberMonsters)) {
        const numberMonstersInput = document.getElementById('numberMonsters');
        numberMonstersInput.value = storedNumberMonsters;
    }

    createMonsters(
        document.getElementById("numberMonsters").value,
        document.getElementById("monsters-container"),
        document.getElementById("speed-container")
    );

    /*const event = new Event('input', { bubbles: true });
    numberMonstersInput.dispatchEvent(event);*/

    // Set up event listeners after the DOM has loaded
    setTimeout(() => {
        // Retrieve input fields
    const inputFields = document.querySelectorAll('input');
    // Get all items from local storage
    const localStorageItems = { ...localStorage };

    // Display the content of local storage as a table in the console
    //console.table(localStorageItems);

// Loop through each input field
    inputFields.forEach(input => {
        // Get the stored value for the input field from localStorage
        const storedValue = localStorage.getItem(input.id);

        // Check if the stored value exists and is not null
        if (storedValue !== null) {
            // Update the input field's value with the stored value from localStorage
            input.value = storedValue;
        }
    });
    }, 200); // Adjust the delay as needed

    // Get all elements whose ID contains 'baseSpeed'
    const baseSpeedInputs = document.querySelectorAll('input[id*="baseSpeed"]');

    // Increment the value of each baseSpeed input by 1
    baseSpeedInputs.forEach(input => {
        if (!isNaN(input.value)) {
            const incrementedValue = parseInt(input.value) + 1;
            input.value = incrementedValue.toString();
        }
    });

    // Decrement the value of each baseSpeed input by 1
    baseSpeedInputs.forEach(input => {
        if (!isNaN(input.value)) {
            const decrementedValue = parseInt(input.value) - 1;
            input.value = decrementedValue.toString();
        }
    });
}