// Load from localStorage or start empty
let foods = JSON.parse(localStorage.getItem("foods")) || [];

const form = document.getElementById("foodForm");
const foodList = document.getElementById("foodList");
const totalEl = document.getElementById("total");
const resetBtn = document.getElementById("resetBtn");

// Render function
function renderFoods() {
    foodList.innerHTML = "";

    let total = 0;

    foods.forEach((food, index) => {
        total = Number(food.calories);

        const li = document.createElement("li");
        li.className = "flex justify-between bg-gray-200 p-2 rounded";

        li.innerHTML = `
            <span>${food.name} - ${food.calories} kcal</span>
            <button onclick="removeFood(${index})" class="text-red-600">X</button>
        `;

        foodList.appendChild(li);
    });

    totalEl.textContent = total;

    localStorage.setItem("foods", JSON.stringify(foods));
}

// Add food
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("foodName").value;
    const calories = document.getElementById("calories").value;

    foods.push({ name, calories });

    form.reset();
    renderFoods();

    // Fetch API
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(res => res.json())
        .then(data => console.log("Fetched:", data));
});

// Remove food
function removeFood(index) {
    foods.splice(index, 1);
    renderFoods();
}

// Reset
resetBtn.addEventListener("click", () => {
    foods = [];
    renderFoods();
});

// Initial render
renderFoods();