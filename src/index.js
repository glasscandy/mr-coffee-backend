const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');
const users = data.users;
const schedules = data.schedules;
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json('Welcome to our schedule website');
});

app.get('/users', (req, res) => {
  const usersNumbered = [...users];

  for (let i = 0; i < usersNumbered.length; i++) {
    usersNumbered[i].id = i;
    delete usersNumbered[i].password;
    delete usersNumbered[i].id;
  };
  res.json(usersNumbered);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  return userId >= users.length ? res.json('No such user') : res.json(users[userId]);
});

app.get('/users/:id/:schedules', (req, res) => {
  const userId = parseInt(req.params.id);

  if (userId >= users.length) {
    res.json('No such user');
    return;
  };

  const userShcedule = [];
  for (let i = 0; i < schedules.length; i++) {
    if (userId == schedules[i].user_id) {
      userShcedule.push(schedules[i]);
    };
  };

  if (userShcedule.length < 1) {
    res.json('Make an appointemnt');
    return;
  };

  res.json(userShcedule);
});

app.get('/schedules', (req, res) => {
  res.json(schedules);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  const newUserData = {
    'firstname': newUser.firstname,
    'lastname': newUser.lastname,
    'email': newUser.email,
    'password': sha256(newUser.password)
  };
  users.push(newUserData);
  res.json(newUserData);
})

app.post('/schedules', (req, res) => {
  const newSchedule = req.body;
  const newScheduleData = {
    'user_id': parseInt(newSchedule.user_id),
    'day': parseInt(newSchedule.day),
    'start_at': newSchedule.start_at,
    'end_at': newSchedule.end_at
  }
  schedules.push(newSchedulerData);
  res.json(newScheduleData);
})

app.listen(port);