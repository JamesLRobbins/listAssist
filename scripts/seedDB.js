const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/listAssist"
);

const recipeSeed = [
  {
    title: "Chicken Parmesan",
    instructions:
    "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",

    ingredient1: "1 Chicken",
    ingredient2: "1 Parmesan",
    ingredient3: "2 Tomatoes",
    date: new Date(Date.now())
  },
  {
    title: "Chicken Parmesan",
    instructions:
    "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",

    ingredient1: "1 Chicken",
    ingredient2: "1 Parmesan",
    ingredient3: "2 Tomatoes",
    date: new Date(Date.now())
  },
  {
    title: "Chicken Parmesan",
    instructions:
    "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",

    ingredient1: "1 Chicken",
    ingredient2: "1 Parmesan",
    ingredient3: "2 Tomatoes",
    date: new Date(Date.now())
  }
];

db.Recipe
  .remove({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
