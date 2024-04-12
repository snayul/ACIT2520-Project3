module.exports = {
  checkAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/login");
  },
  checkNotAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/reminders");
  },
  //If not admin and auth returns to home
  checkAdminAuth: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    return res.redirect("/");
  },
};