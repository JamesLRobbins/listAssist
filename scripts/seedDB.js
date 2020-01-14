const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/listAssist"
);

const userSeed = [
  {
  username: "test@test.com",
  password: "123",
  recipes: [
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
      "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
      ingredients: ["Cheese", "Sauce", "Pepperoni"],
      date: new Date(Date.now())
    },
    {
      title: "Spaghetti",
      instructions:
      "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
      ingredients: ["Cheese", "Sauce", "Noodles"],
      date: new Date(Date.now())
    }
  ]
},
{
  username: "test2@test2.com",
  password: "123",
  recipes: [
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
      "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
      ingredients: ["Cheese", "Sauce", "Pepperoni"],
      date: new Date(Date.now())
    },
    {
      title: "Spaghetti",
      instructions:
      "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
      ingredients: ["Cheese", "Sauce", "Noodles"],
      date: new Date(Date.now())
    }
  ]
},
{
  username: "test3@test3.com",
  password: "123",
  recipes: [
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
      "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
      ingredients: ["Cheese", "Sauce", "Pepperoni"],
      date: new Date(Date.now())
    },
    {
      title: "Spaghetti",
      instructions:
      "Cook chicken. Put tomato sauce on it. Put the parm parm on it.",
      ingredients: ["Cheese", "Sauce", "Noodles"],
      date: new Date(Date.now())
    }
  ]
}
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted into users collection!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
