const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//Packages for user authentication
const session = require("express-session");
const passport = require("./passport");

//Not needed because used in ./passport
//const LocalStrategy = require("passport-local");

//var passportLocalMongoose = require("passport-local-mongoose");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session config
//The reason express session is used is to know if a browser has made a request to us before.
app.use(session({
  secret: "NotSoSecretSecret", //a random string to make the hash that is generated secure
  resave: false,
  saveUninitialized: false
}));

app.use( (req, res, next) => {
	console.log('Express req.session in server.js is: ', req.session);
	next()
  });

// Passport config - TODO: Check into correct use of db.User below. Need to define db!
/*
These lines of code run on every request. They call functions in
the passport/index.js called serializeUser and deserializeUser.
serializeUser stores the user id to req.session.passport.user = {id:’..’}.
deserializeUser will check to see if this user is saved in the database, and
if it is found it assigns it to the request as req.user = {user object}.
 */
app.use(passport.initialize());
app.use(passport.session());    // calls serializeUser and deserializeUser

//passport.use(new LocalStrategy(db.User.authenticate()));
//passport.serializeUser(db.User.serializeUser());
//passport.deserializeUser(db.User.deserializeUser());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view

// Use the routing folder to handle our routes
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/listAssist", { useNewUrlParser: true, useUnifiedTopology: true });



// Start the API server
app.listen(PORT, function () {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
