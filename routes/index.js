const path = require("path");
const router = require("express").Router();
//use if API needed
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.post("/logout", (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out...' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

/* router.route("/login")
    .get(() => {console.log("login get route called")})
    .post((req, res, next)=> {
        console.log('server post username: ');
        console.log(req.body.username)
        res.end()
    });
 */

// DO NOT ADD UNTIL REACT
// If no API ROUTES are hit, send the react app
router.use(function (req, res)
{
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});


module.exports = router;