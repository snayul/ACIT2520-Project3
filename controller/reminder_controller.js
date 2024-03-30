let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
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
    indexOfReminder = database.cindy.reminders.findIndex(function(reminder){
      return reminder.id == reminderToFind
    });

    // Go into the database with the index and change the dict into the reminder/current input
    database.cindy.reminders[indexOfReminder] = reminder

    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    // Finds index of reminder
    indexOfReminder = database.cindy.reminders.findIndex(function(reminder){
      return reminder.id == reminderToFind
    });
    // Deletes it
    database.cindy.reminders.splice(indexOfReminder,1)
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
