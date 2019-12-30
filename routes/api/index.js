const router = require("express").Router();
const route1Routes = require("./route1");
const route2Routes = require("./route2");

router.use("/endpoint1",route1Routes);
router.use("/endpoint2",route2Routes);


module.exports = router;

