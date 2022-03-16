const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const data = require('./data');
const users = data.users;
const schedules = data.schedules;
const sha256 = require('js-sha256');
const app = express();
const port = 4505;

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));
app.use('/static/assets', express.static('static'));

app.get('/', (req, res) => {
    res.render('welcome', { 'Welcome': 'Welcome to our work schedule website' });
});

app.route('/users/new')
    .get((req, res, next) => {
        res.render('new-user');
    })
    .post((req, res, next) => {
        users.push(req.body)
        res.render(req.body);
    });

app.get('/users/:id/:schedules', (req, res) => {
    const userId = parseInt(req.params.id);
    const fullName = Object.values(users[userId]); 

    if (userId >= users.length) {
        res.render('schedule', { 'title': 'There is no such employee' });
        return;
    };

    const userShcedule = [];
    for (let i = 0; i < schedules.length; i++) {
        if (userId === schedules[i].user_id) {
            userShcedule.push(schedules[i]);
        };
    };

    if (userShcedule.length < 1) {
        res.render('schedule', { 'title': 'Add new schedule' });
        return;
    };
    res.render('schedule', { 'title': `${fullName[0]} ${fullName[1]} schedule`, 'schedule': userShcedule });
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    userId >= users.length
        ? res.render('user', { 'title': 'There is no such employee' })
        : res.render('user', { 'title': 'Employee information', 'user': users[userId] });
});

app.route('/users')
    .get((req, res) => {
        const usersNumbered = [...users];

        for (let i = 0; i < usersNumbered.length; i++) {
            usersNumbered[i].id = i;
        };
        res.render('users', { 'users': usersNumbered, });
    })
    .post((req, res) => {
        const newUserData = req.body;
        const newUser = {
            'firstname': newUserData.firstname,
            'lastname': newUserData.lastname,
            'email': newUserData.email,
            'password': sha256(newUserData.password)
        };
        users.push(newUser);
        res.redirect('/users');
    });

app.route('/schedules/new')
    .get((req, res, next) => {
        res.render('new-schedule');
    })
    .post((req, res, next) => {
        schedules.push(req.body)
        res.render(req.body);
    });

app.route('/schedules')
    .get((req, res) => {
        res.render('schedules', { 'schedule': schedules });
    })
    .post((req, res) => {
        const newScheduleData = req.body;
        const newSchedule = {
            'user_id': parseInt(newScheduleData.user_id),
            'day': parseInt(newScheduleData.day),
            'start_at': newScheduleData.start_at,
            'end_at': newScheduleData.end_at
        };
        schedules.push(newSchedule);
        res.redirect('/schedules');
    });

app.listen(port,
    () => {
        console.log(`http://localhost:${port}`)
    });