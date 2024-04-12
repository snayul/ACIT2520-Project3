// Ni howdy - Ray
const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const adminController = require("./controller/admin_controller")
const authController = require("./controller/auth_controller");
const initializePassport = require("./middleware/passport");
const database = require("./database");
const passport = require("passport");
const session = require("express-session");

const {
  checkAuthenticated,
  checkNotAuthenticated,
  checkAdminAuth,
} = require("./middleware/checkAuth");
// error msg handling (wrong pass/email/user not found/etc)
const flash = require("express-flash");
// this for the logout function
const methodOverride = require("method-override")

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

//error msg display
app.use(flash())

// Initalizing passoprt
initializePassport(
  passport,
  email => database.find(user => user.email === email),
  id => database.find(user => user.id === id),
)

// Session configuration
app.use(
  session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
      },
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.use(methodOverride("_method"))

//user avalible in all templates for the logout function to work
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Routes start here
app.get("/reminders",checkAuthenticated, reminderController.list);
app.get("/reminder/new",checkAuthenticated, reminderController.new);
app.get("/reminder/:id",checkAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit",checkAuthenticated, reminderController.edit);
app.post("/reminder/",checkAuthenticated, reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id",checkAuthenticated, reminderController.update);
app.post("/reminder/delete/:id",checkAuthenticated, reminderController.delete);

// Login / Registration
app.get("/register",checkNotAuthenticated, authController.register);
app.get("/login",checkNotAuthenticated, authController.login);
app.post("/register",checkNotAuthenticated, authController.registerSubmit);
app.post("/login",checkNotAuthenticated, authController.loginSubmit);

//Admin controls
app.get("/admin", checkAdminAuth, adminController.list);
app.post("/admin", checkAdminAuth, adminController.delete);


// LOGOUT
app.delete('/logout', (req, res) => {
  req.logout(function(err) {
      if (err) {
          console.error("Error logging out:", err);
          return res.redirect("/reminders");
      }
      res.redirect("/");
  });
});

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
