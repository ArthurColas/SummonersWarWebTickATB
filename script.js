const numberMonstersInput = document.getElementById("numberMonsters");
const monstersContainer = document.getElementById("monsters-container");

numberMonstersInput.addEventListener("input", () => {
    const numMonsters = parseInt(numberMonstersInput.value);

    // Clear existing monsters
    monstersContainer.innerHTML = "";

    for (let i = 1; i <= numMonsters; i++) {
        const label = document.createElement("label");
        label.setAttribute("for", `speed_M${i}`);
        label.textContent = `Monster ${i} :`;

        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("id", `speed_M${i}`);
        input.setAttribute("name", `speed_M${i}`);
        input.setAttribute("placeholder", "_______");

        // Append label and input to the container
        monstersContainer.appendChild(label);
        monstersContainer.appendChild(input);

        // Create a rectangle for each monster
        const rectangle = document.createElement("div");
        rectangle.classList.add("speed-container");
        speedContainer.appendChild(rectangle);
    }
});
