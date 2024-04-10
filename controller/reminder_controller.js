let database = require("../database");

//Implement something here that lets you pick what user is logged in
// replace the cindy string with that variable

// Searches database for user with name cindy change this so its dynamic
const user = database.find(user => user.name === "sam");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // Grabs current webpage inputs
    let reminder = {
      id: parseInt(req.params.id),
      title: req.body.title,
      description: req.body.description,
      completed: JSON.parse(req.body.completed),
    };
    let reminderToFind = req.params.id;
    //Finds the index of the reminder with the id
    indexOfReminder = user.remindersreminders.findIndex(function(reminder){
      return reminder.id == reminderToFind
    });

    // Go into the database with the index and change the dict into the reminder/current input
    user.reminders[indexOfReminder] = reminder

    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    // Finds index of reminder
    indexOfReminder = user.reminders.findIndex(function(reminder){
      return reminder.id == reminderToFind
    });
    // Deletes it
    cindy.reminders.splice(indexOfReminder,1)
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
