let database = require("../database");
const session = require("express-session")

let dashControllers = {
    list: (req, res) => {
        const sessions = req.sessionStore.sessions
        const sessionInfo = Object.keys(sessions).map((sessionId) => {
          const sessionData = JSON.parse(sessions[sessionId]);
          return {
            sessionId: sessionId,
            user: sessionData.passport ? sessionData.passport.user : "Guest",
          };
        });
        console.log(sessionInfo);
        res.render("dashboard/index", { test: sessionInfo });
    }
}

module.exports = dashControllers;