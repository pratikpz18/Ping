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

// router.get("/login",function (req, res) { 
//     res.render("login"); 
// });

// router.get("/register", function (req, res) { 
//     res.render("register"); 
// });

router.get("/dashboard", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

// router.get('/logout', (req, res) => {
//     req.session.destroy(function(err){  
//       if(err){  
//           console.log(err);  
//       }  
//       else  
//       {  
//           res.redirect('/users/login');  
//       }  
//   });
// });  

module.exports = router