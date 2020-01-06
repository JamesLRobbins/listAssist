const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//TODO: Define passport schema

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    recipe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }],
    grocerieList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "GList"
    }]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;