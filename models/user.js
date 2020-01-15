const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require("passport-local-mongoose");

//var recipeSchema = require("./recipe");
// new Schema({ name: 'string' });

//TODO: Define passport schema

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    recipes: Array,
    grocerieLists: Array
});

/* ----- Relational model implementation
recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }],
    grocerieLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "GList"
    }]
----------*/

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10) //The second argument is the number of rounds to use when generating a salt.
	}
}

// Define pre hooks for the mongoose save method
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;