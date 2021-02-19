const express = require('express')
const { check, validationResult} = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router()

const usercontroller = require('../controllers/usercontroller')
const User = require('../models/usermodel')

router.post('/register',[
    check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
], usercontroller.register)
router.post('/login',[
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ], usercontroller.login)

router.get("/dashboard", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

router.get("/dashboard/profile/:userid", auth, async (req, res) => {
  try {
    const userid = req.params.userid;
    // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(userid);
      res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.post('/dashboard/search',usercontroller.search)


module.exports = router