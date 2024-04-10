let Database = [
  {
    id:1,
    email:"cindy@123.com",
    password:"password123",
    name: "cindy",
    role:"user",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from Safeway",
        completed: false,
      },
      {
        id: 2,
        title: "Poop",
        description: "Poop in pants",
        completed: false,
      },
      {
        id: 3,
        title: "Pass classes",
        description: "Jump in train if fail...",
        completed: false,
      }
    ]
  },

  {
    id:2,
    email:"sam@123.com",
    password:"password123",
    name: "sam",
    role:"admin",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy beer",
        completed: false,
      },
      {
        id: 2,
        title: "Poop",
        description: "Poop in pants",
        completed: false,
      },
      {
        id: 3,
        title: "pick up the kids",
        description: "Jump in train if fail...",
        completed: false,
      }
    ]
  },
];


module.exports = Database;
