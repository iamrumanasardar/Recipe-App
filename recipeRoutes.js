const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Create a new recipe
router.post("/", recipeController.createRecipe);

// Delete a recipe by ID
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
