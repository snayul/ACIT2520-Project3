

let adminControllers = {
  list: (req, res) => {
    const sessions = req.sessionStore.sessions
    const sessionInfo = Object.keys(sessions).map((sessionId) => {
      const sessionData = JSON.parse(sessions[sessionId]);
      return {
        sessionId: sessionId,
        userID: sessionData.passport ? sessionData.passport.user : "Guest",
      };
    });
    res.render("admin/index", { sesh: sessionInfo });
  },

// Use something like this 
  //indexOfReminder = req.user.reminders.findIndex(function(reminder){
  // return reminder.id == reminderToFind
  
  // delete: (req, res) => {
  //   // Retrieve sessionId from the request body
  //   let sessionToFind = req.params.sessionId;
  //   const sessionId = req.body.sessionId;
  //   indexOfSession = JSON.parse(sessionId).findIndex(function(sessions){
  //     return sessions.sessionId == sessionToFind
  //   })
  //   console.log(sessionId)
  //   console.log(sessionId[indexOfSession])

  //   req.sessionStore.destroy(sessionId, (err) => {
  //     if (err) {
  //       console.error("Error revoking session:", err);
  //       res.sendStatus(500); // Internal server error
  //     } else {
  //       console.log("Session revoked:", sessionId);
  //       res.redirect("/admin"); // Redirect back to the admin page
  //     }
  //   });
  // }

  delete: (req, res) => {
    // Retrieve sessionId from the request body
    const sessionId = req.body.sessionId;
    console.log(sessionId)
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.error("Error revoking session:", err);
        res.sendStatus(500); // Internal server error
      } else {
        console.log("Session revoked:", sessionId);
        res.redirect("/admin"); // Redirect back to the admin page
      }
    });
  }
  
}


module.exports = adminControllers;