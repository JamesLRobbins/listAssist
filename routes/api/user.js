const router = require("express").Router();
const passport = require("../../passport");
const userController = require("../../controllers/userController");


// MATCHES with /api/user/
router.route("/")
    .get(userController.getSessionUser);

// MATCHES with /api/user/register
router.route("/register")
    .get(userController.findAll)
    .post(userController.findOne);

// MATCHES with /api/user/login
router.route("/login")
    .post(
        function (req, res, next) {
            console.log('routes/api/user.js, login, req.body: ');
            console.log(req.body)
            next()
        },
        passport.authenticate('local'),
        (req, res) => {
            console.log('logged in', req.user);
            var userInfo = {
                username: req.user.username
            };
            res.send(userInfo);
        }
    );



// MATCHES with /api/user/new
router.route("/new")
    .get(userController.findAll)
    .post(userController.create);


// MATCHES with /api/user/:id
router.route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;