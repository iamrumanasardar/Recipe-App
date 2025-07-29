const form = document.getElementById("recipeForm");
const container = document.getElementById("recipesContainer");
const API_URL = "http://localhost:5000/api/recipes";

// Fetch and show all recipes
async function fetchRecipes() {
  const res = await fetch(API_URL);
  const data = await res.json();
  container.innerHTML = "";
  data.forEach((recipe) => {
    const div = document.createElement("div");
    div.className = "recipe-card";
    div.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
    `;
    container.appendChild(div);
  });
}

// Add recipe
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, ingredients, instructions }),
  });

  form.reset();
  fetchRecipes();
});

// Delete recipe
async function deleteRecipe(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  fetchRecipes();
}

// Initial load
fetchRecipes();
