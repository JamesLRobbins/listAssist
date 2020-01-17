const db = require("../models");

// STANDARD CREATE READ UPDATE DELETE
// YOU CAN ALMOST COPY THIS VERBATIM
// READ
// READ ALL
// READ ONE
// CREATE 
// UPDATE
// DELETE

// ** make sure you change the model name after db.
// ** watch for the sort function it depends on the date column

module.exports = {

  getSessionUser: function (req, res, next) {
    console.log('===== getSessionUser in userController======');
    console.log(req.user);
    if (req.user) {
      res.json({ user: req.user })
    } else {
      res.json({ user: null })
    }
  },
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function (req, res) {
    console.log("req.body in findOne is: ");
    console.log(req.body);

    //Set the username for the session
    req.session.username = req.body.username;

    db.User
      .findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          console.log('User.js post error: ', err)
        } else if (user) {
          res.json({
            error: `Sorry, already a user with the username: ${req.body.username}`
          })
        }
        else {
          const newUser = new db.User({
            username: req.body.username,
            password: req.body.password
          })

          newUser.save((err, savedUser) => {
            console.log("user saved callback");
            if (err) return res.json(err)
            res.json(savedUser)
          })
        }
      })
  },
  findById: function (req, res) {
    console.log("req in userController.js findbyID is: " + JSON.stringify(req.params));
          //.findById(req.params.id)  --Does not work even though exactly like documentation
    db.User
      .findById(req.params.id)
      .then(dbModel => {
        console.log("dbModel username in findbyID is: " + dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("create in userController called");
    //console.log(db);
    //console.log(db.Movie);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getRecipes: function () {
    //TODO: Complete function with embedded model
		db.collection('users').aggregate([
			{ $lookup:
			   {
				 from: 'recipes',
				 localField: 'product_id',
				 foreignField: '_id',
				 as: 'orderdetails'
			   }
			 }
			]).toArray(function(err, res) {
			if (err) throw err;
			console.log(JSON.stringify(res));
			});
	}


};