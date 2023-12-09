/* IMPORTS */
import { createMonsters } from './createMonsters.js';
import { load } from './onLoad.js';


/* MAIN CODE */

const numberMonstersInput=document.getElementById("numberMonsters");

numberMonstersInput.addEventListener("input", handleNumberMonstersChange);
numberMonstersInput.addEventListener("change", handleNumberMonstersChange);

function handleNumberMonstersChange() {
    createMonsters(
        document.getElementById("numberMonsters").value,
        document.getElementById("monsters-container"),
        document.getElementById("speed-container")
    );
}
window.addEventListener('load', 
    () => load(document.getElementById("numberMonsters")) 
);

/*
window.addEventListener('beforeunload', function(event) {
    const inputFields = document.querySelectorAll('input'); // Get all input fields
    
    inputFields.forEach(input => {
        // Save each input's value to localStorage with a unique key
        localStorage.setItem(input.id, input.value);
    });
    
    // Save data for number of monsters (assuming 'numberMonsters' is the ID of the input field)
    const numberMonstersInput = document.getElementById('numberMonsters');
    localStorage.setItem('numberMonsters', numberMonstersInput.value);
    
    // Display console message
    console.log('Data saved successfully to localStorage!');
    
    // The following line is optional and displays a confirmation dialog
    event.returnValue = ''; // This is required for some browsers
});
*/
