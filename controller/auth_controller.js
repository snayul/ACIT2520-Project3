let database = require("../database");
const passport = require("passport");



let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/reminders",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
  },

  registerSubmit: (req, res) => {
    try{
      database.push({
        id: database.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        reminders: []
      })
      console.log("Updated database:", database);

      res.redirect('/login')
    }
    catch{
      res.redirect('/register')
    }
    
  },
};

module.exports = authController;
