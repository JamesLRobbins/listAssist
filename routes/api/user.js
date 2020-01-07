const router = require("express").Router();
//TODO: Impement login controller
const userController = require("../../controllers/userController");


// MATCHES with /api/user
router.route("/")
    .get(userController.findAll)
    .post(userController.findOne);

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