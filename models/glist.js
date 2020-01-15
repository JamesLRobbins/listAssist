const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groceryListSchema = new Schema ({
    
    title: { type: String, required: true },
    _owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: { type: Array }

});


const GList = mongoose.model("GList", groceryListSchema);
module.exports = GList;