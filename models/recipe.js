const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({

    title: { type: String, required: true },
    instructions: { type: String },
    ingredients: { type: Array }

});


const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;