const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({

    title: { type: String, required: true },
    instructions: { type: String },
    ingredient1: { type: String },
    ingredient2: { type: String },
    ingredient3: { type: String }

});


const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;