const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groceryListSchema = new Schema ({
    item: { type: String, required: true },


});


const GList = mongoose.model("GList", groceryListSchema);
module.exports = GList;