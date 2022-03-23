const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const logic = require('./logic')
const { Pool } = require('pg')
const data = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mrcoffee',
    password: '',
    port: 5430,
});
const app = express();
const port = 3500;

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));
app.use('/static/assets', express.static('static'));

app.route('/')
    .get(async (req, res) => {
        const joinedTables = await data.query('SELECT * FROM schedules LEFT OUTER JOIN users ON schedules.user_id = users.id');
        let tableRows = joinedTables.rows;

        for (let i = 0; i < tableRows.length; i++) {
            let dayNumber = tableRows[i].day;
            let daysStr = logic.getDayName(dayNumber);
            fullName = `${tableRows[i].firstname} ${tableRows[i].lastname}`;
            tableRows[i].day = daysStr;
            tableRows[i].user_id = fullName;
        };

        res.render('schedules', { 'schedule': tableRows });
    });

app.route('/new')
    .get(async (req, res, next) => {
        const fullNames = await data.query('SELECT firstname, lastname, id FROM users');
        let namesRows = fullNames.rows;

        res.render('form-schedule', { 'users': namesRows });
    })
    .post(async (req, res) => {
        const newScheduleData = req.body;
        const ampm = newScheduleData.ampm;
        const newSchedule =
            `INSERT INTO schedules (user_id, day, start_at, end_at) 
            VALUES ('${parseInt(newScheduleData.user_id)}', '${parseInt(newScheduleData.day)}', '${newScheduleData.start_at} ${ampm[0]}', '${newScheduleData.end_at} ${ampm[1]}') 
            RETURNING *;`;

        await data.query(newSchedule);
        res.redirect('/new');
    });

app.listen(port,
    () => {
        console.log(`http://localhost:${port}`)
    });
    