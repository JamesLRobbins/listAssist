const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/listAssist"
);

//Password is 123 generated from a running server
let encryptedPassword = "$2a$10$vFOaWY3jremqp0srLWU6H..ofaq3VTJeqcshMhlCLsqmQoiloYoGW";

const userSeed = [
  {
    username: "test@test.com",
    password: encryptedPassword,
  },
  {
    username: "test2@test2.com",
    password: encryptedPassword,
  },
  {
    username: "test3@test3.com",
    password: encryptedPassword,
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted into Users collection!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

//Seed data for our default recipes
const recipeSeed = [
  {
    title: "Fajitas",
    instructions:
      "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
    ingredients: ["Chicken", "Steak", "Onions", "Tomatoes", "Cheese"],
    date: new Date(Date.now())
  },
  {
    title: "Pizza",
    instructions:
      "Roll out the dough. Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
    ingredients: ["Cheese", "Sauce", "Pepperoni"],
    date: new Date(Date.now())
  },
  {
    title: "Spaghetti",
    instructions:
      "Boil some water. Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
    ingredients: ["Cheese", "Sauce", "Noodles"],
    date: new Date(Date.now())
  }
]

//Populate the Recipe collection with our seed data
db.Recipe
  .remove({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted into Recipes collection!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
