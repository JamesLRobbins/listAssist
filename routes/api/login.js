const router = require("express").Router();
//TODO: Impement login controller
//const loginController = require("../../controllers/loginController");


// MATCHES with /api/login
router.route("/")
    .get(loginController.findAll)
    .post(loginController.create);


// MATCHES with /api/login/:id
router.route("/:id")
    .get(loginController.findById)
    .put(loginController.update)
    .delete(loginController.remove);

module.exports = router;