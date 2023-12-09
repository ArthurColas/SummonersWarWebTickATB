export function createMonsters(numMonsters, monstersContainer, speedContainer) {
    console.log("create all monsters ", numMonsters)

    const currentRectangles = speedContainer.getElementsByClassName("speed-container");

    const currentMonsterCount = monstersContainer.querySelectorAll('.monster').length;
    const existingMonsterDivs = Array.from(monstersContainer.querySelectorAll('.monster'));

    if (numMonsters > currentMonsterCount) {
        const storedValues = {};

        existingMonsterDivs.slice(numMonsters).forEach((monster) => {
            const inputs = monster.querySelectorAll('input');
            inputs.forEach((input) => {
                storedValues[input.id] = input.value;
            });
            //monster.remove();
        });

        for (let i = 1; i <= numMonsters; i++) {
            const existingMonster = existingMonsterDivs.find((div) => div.id === `monster${i}`);
            
            if (!existingMonster) {
                const monsterDiv = document.createElement("div");
                monsterDiv.classList.add("monster");
                monsterDiv.id = `monster${i}`;

                const nameLabel = document.createElement("label");
                nameLabel.textContent = `Monster ${i} Name: `;
                const nameInput = document.createElement("input");
                nameInput.setAttribute("type", "text");
                nameInput.setAttribute("pattern", "[A-Za-z]+"); // Accepts only letters
                nameInput.setAttribute("id", `nameInput${i}`);
            
                const baseSpeedLabel = document.createElement("label");
                baseSpeedLabel.textContent = `Base Speed:`;
                const baseSpeedInput = document.createElement("input");
                baseSpeedInput.setAttribute("type", "number");
                baseSpeedInput.setAttribute("id", `baseSpeedInput${i}`);
            
                const runeSpeedLabel = document.createElement("label");
                runeSpeedLabel.textContent = `Rune Speed:`;
                const runeSpeedInput = document.createElement("input");
                runeSpeedInput.setAttribute("type", "number");
                runeSpeedInput.setAttribute("id", `runeSpeedInput${i}`);
            
                const leaderSkillLabel = document.createElement("label");
                leaderSkillLabel.textContent = `Leader Skill Speed:`;
                const leaderSkillInput = document.createElement("input");
                leaderSkillInput.setAttribute("type", "number");
                leaderSkillInput.setAttribute("id", `leaderSkillInput${i}`);
            
                // Create Combat Speed label and input
                const combatSpeedLabel = document.createElement("label");
                combatSpeedLabel.textContent = `Combat Speed:`;
                const combatSpeedInput = document.createElement("input");
                combatSpeedInput.setAttribute("type", "text");
                combatSpeedInput.setAttribute("id", `combatSpeedInput${i}`);
            
                // Create Speed Tick label and input
                const speedTickLabel = document.createElement("label");
                speedTickLabel.textContent = `Speed Tick ATB:`;
                const speedTickInput = document.createElement("input");
                speedTickInput.setAttribute("type", "text");
                speedTickInput.setAttribute("readonly", "readonly");
                speedTickInput.style.pointerEvents = "none"; // Disable click events for this input
                speedTickInput.setAttribute("id", `speedTickInput${i}`);
            
                // Create Tick Number label and input
                const tickNumberLabel = document.createElement("label");
                tickNumberLabel.textContent = `Tick Number:`;
                const tickNumberInput = document.createElement("input");
                tickNumberInput.setAttribute("type", "text");
                tickNumberInput.setAttribute("readonly", "readonly");
                tickNumberInput.style.pointerEvents = "none"; // Disable click events for this input
                tickNumberInput.setAttribute("id", `tickNumberInput${i}`);


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
                
                    // Save values to localStorage using unique IDs
                    localStorage.setItem(baseSpeedInput.id, baseSpeedValue);
                    localStorage.setItem(runeSpeedInput.id, runeSpeedValue);
                    localStorage.setItem(leaderSkillInput.id, leaderSkillSpeedValue);
                
                    //console.log("field updated");
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

                nameInput.addEventListener('input', function () {
                    localStorage.setItem(nameInput.id, nameInput.value);
                }); 
            
                function runeSpeedChange() {
                    const baseSpeedValue = parseFloat(baseSpeedInput.value) || 0;
                    const combatSpeedValue = parseFloat(combatSpeedInput.value) || 0;
                    const leaderSkillSpeedValue = parseFloat(leaderSkillInput.value) || 0;
                
                    const runeSpeedValue = combatSpeedValue - baseSpeedValue * (1.15 + leaderSkillSpeedValue / 100);
                
                    runeSpeedInput.value = runeSpeedValue;
                
                    localStorage.setItem(runeSpeedInput.id, runeSpeedValue);
                
                    // console.log("rune changed");
                }

                combatSpeedInput.addEventListener('input', function (event) {
                    //console.log(event.inputType);

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
        }

        existingMonsterDivs.forEach((monster) => {
            const inputs = monster.querySelectorAll('input');
            inputs.forEach((input) => {
                if (storedValues[input.id]) {
                    input.value = storedValues[input.id];
                }
            });
        });
    } else if (numMonsters < currentMonsterCount) {
        existingMonsterDivs.slice(numMonsters).forEach((monster) => {
            monster.remove();
        });
    }
}
    /*
    // Get all monsterDiv elements
    const allMonsterDivs = document.querySelectorAll('.monster');
    console.log("all monster divs ",allMonsterDivs);

    // Loop through the existing monsterDiv elements
    allMonsterDivs.forEach(monsterDiv => {
        const id = parseInt(monsterDiv.id.replace('monster', ''));

        console.log(id,numMonsters);
        
        if (id > numMonsters) {
            console.log("va etre supprime : ",monsterDiv.id);
            monsterDiv.remove(); // Remove the div from the DOM
        }
    });
    */

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
};