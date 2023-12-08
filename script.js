const numberMonstersInput = document.getElementById("numberMonsters");
const monstersContainer = document.getElementById("monsters-container");
const speedContainer = document.getElementById("speed-container");

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

window.addEventListener('load', function() {
    console.log("load event starts");
    const storedNumberMonsters = localStorage.getItem('numberMonsters');
    if (storedNumberMonsters !== null && !isNaN(storedNumberMonsters)) {
        const numberMonstersInput = document.getElementById('numberMonsters');
        numberMonstersInput.value = storedNumberMonsters;
    }
    setTimeout(() => {
        const inputFields = document.querySelectorAll('input');
        inputFields.forEach(input => {
            console.log(input);
            const storedValue = localStorage.getItem(input.id);
            if (storedValue !== null) {
                input.value = storedValue;
            }
        });
    }, 100); // Adjust the delay as needed
    console.log("load event ends");
});

numberMonstersInput.addEventListener("input", () => {

    console.log("create all monsters")
    const numMonsters = parseInt(numberMonstersInput.value);

    // Clear existing monsters
    monstersContainer.innerHTML = "";

    const currentRectangles = speedContainer.getElementsByClassName("speed-container");
    
    for (let i = 1; i <= numMonsters; i++) {
        const monsterDiv = document.createElement("div");
        monsterDiv.classList.add("monster");

        const nameLabel = document.createElement("label");
        nameLabel.textContent = `Monster ${i} Name: `;
        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("pattern", "[A-Za-z]+"); // Accepts only letters

        const baseSpeedLabel = document.createElement("label");
        baseSpeedLabel.textContent = `Base Speed:`;
        const baseSpeedInput = document.createElement("input");
        baseSpeedInput.setAttribute("type", "number");

        const runeSpeedLabel = document.createElement("label");
        runeSpeedLabel.textContent = `Rune Speed:`;
        const runeSpeedInput = document.createElement("input");
        runeSpeedInput.setAttribute("type", "number");

        const leaderSkillLabel = document.createElement("label");
        leaderSkillLabel.textContent = `Leader Skill Speed:`;
        const leaderSkillInput = document.createElement("input");
        leaderSkillInput.setAttribute("type", "number");

        // Create Combat Speed label and input
        const combatSpeedLabel = document.createElement("label");
        combatSpeedLabel.textContent = `Combat Speed:`;
        const combatSpeedInput = document.createElement("input");
        combatSpeedInput.setAttribute("type", "text");

        // Create Speed Tick label and input
        const speedTickLabel = document.createElement("label");
        speedTickLabel.textContent = `Speed Tick ATB:`;
        const speedTickInput = document.createElement("input");
        speedTickInput.setAttribute("type", "text");
        speedTickInput.setAttribute("readonly", "readonly");
        speedTickInput.style.pointerEvents = "none"; // Disable click events for this input

        // Create Tick Number label and input
        const tickNumberLabel = document.createElement("label");
        tickNumberLabel.textContent = `Tick Number:`;
        const tickNumberInput = document.createElement("input");
        tickNumberInput.setAttribute("type", "text");
        tickNumberInput.setAttribute("readonly", "readonly");
        tickNumberInput.style.pointerEvents = "none"; // Disable click events for this input

        function updateFields() {
                const baseSpeedValue = parseFloat(baseSpeedInput.value) || 0;
                const runeSpeedValue = parseFloat(runeSpeedInput.value) || 0;
                const leaderSkillSpeedValue = parseFloat(leaderSkillInput.value) || 0;
        
                // Calculate Combat Speed based on the formula
                const combatSpeedValue = Math.ceil( baseSpeedValue * (1.15 + leaderSkillSpeedValue / 100) + runeSpeedValue );
                // Update Combat Speed input field
                combatSpeedInput.value = combatSpeedValue.toFixed(0);
        
                // Calculate Speed Tick based on the formula
                const speedTickValue = combatSpeedValue * 0.07;
                // Update Speed Tick input field
                speedTickInput.value = speedTickValue.toFixed(2) + "%";
        
                // Calculate Tick Number
                const tickNumber = Math.ceil(100 / speedTickValue);
                // Update Tick Number input field
                tickNumberInput.value = tickNumber;

                console.log("field updated");
        }
        
        // Event listeners for input fields
        baseSpeedInput.addEventListener('input', function () {
            updateFields();
        });
        runeSpeedInput.addEventListener('input', function () {
            updateFields();
        });
        leaderSkillInput.addEventListener('input', function () {
            updateFields();
        });
        
        function runeSpeedChange() {
                const baseSpeedValue = parseFloat(baseSpeedInput.value) || 0;
                const combatSpeedValue = parseFloat(combatSpeedInput.value) || 0;
                const leaderSkillSpeedValue = parseFloat(leaderSkillInput.value) || 0;
        
                const runeSpeedValue = combatSpeedValue - baseSpeedValue * (1.15 + leaderSkillSpeedValue / 100);
        
                runeSpeedInput.value = runeSpeedValue;
                console.log("rune changed");
        }
        
        combatSpeedInput.addEventListener('input', function (event) {
            console.log(event.inputType);
            if (event.inputType === 'insertText' || event.inputType === 'insertCompositionText') {
                runeSpeedChange();
            } else {
                ;
            }
        });
        
    
        monsterDiv.appendChild(nameLabel);
        monsterDiv.appendChild(nameInput);
        monsterDiv.appendChild(baseSpeedLabel);
        monsterDiv.appendChild(baseSpeedInput);
        monsterDiv.appendChild(runeSpeedLabel);
        monsterDiv.appendChild(runeSpeedInput);
        monsterDiv.appendChild(leaderSkillLabel);
        monsterDiv.appendChild(leaderSkillInput);

        monsterDiv.appendChild(combatSpeedLabel);
        monsterDiv.appendChild(combatSpeedInput);
        monsterDiv.appendChild(speedTickLabel);
        monsterDiv.appendChild(speedTickInput);
        monsterDiv.appendChild(tickNumberLabel);
        monsterDiv.appendChild(tickNumberInput);

        monstersContainer.appendChild(monsterDiv);
    }

    // Remove excess rectangles if the number of monsters decreases
    while (currentRectangles.length > numMonsters) {
        currentRectangles[currentRectangles.length - 1].remove();
    }

    // Add new rectangles if the number of monsters exceeds the existing count
    for (let i = currentRectangles.length + 1; i <= numMonsters; i++) {
        const rectangle = document.createElement("div");
        rectangle.classList.add("speed-container");
        speedContainer.appendChild(rectangle);
    }
});
