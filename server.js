const express = require("express");
const mongoose = require("mongoose");
// SAVE THIS STEP UNTIL ROUTES
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//Packages for user authentication
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
//var passportLocalMongoose = require("passport-local-mongoose");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session config
app.use(session({
  secret: "NotSoSecretSecret",
  resave: false,
  saveUninitialized: false
}));

// Passport config - TODO: Check into correct use of db.User below. Need to define db!
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view

// Use the routing folder to handle our routes
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/listAssist", { useNewUrlParser: true, useUnifiedTopology: true });



// Start the API server
app.listen(PORT, function () {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
