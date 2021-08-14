// Routing for /projects
const express = require('express');
const router = express.Router();
const mysql = require('../services/dbcon.js');    // dbcon.js hold credientials for mySQL

const createNewProject = (res, mysql, sqlInputs, complete) => {
    let sqlCommand = 'INSERT INTO Projects (projectName, budget, startDate, endDate, duration) VALUES (?,?,?,?,?);'
    mysql.pool.query(sqlCommand, sqlInputs, (err) => {
        if (err) {
            next(err);
            return;
        }
        complete();
    });
}

const createNewDailyLog = (res, mysql, projectName, complete) => {
    let sqlCommand = "CREATE TABLE " + projectName + "DailyLog (" +
        "`logID` int(11) NOT NULL AUTO_INCREMENT," +
        "`date` date NOT NULL," +
        "`plannedProgress` decimal(5, 2) NOT NULL," +
        "`actualProgress` decimal(5, 2) NOT NULL," +
        "`plannedSpend` decimal(20, 2) NOT NULL," +
        "`actualSpend` decimal(20, 2) NOT NULL," +
        "PRIMARY KEY(`logID`)" +
        ") ENGINE = InnoDB;"

    mysql.pool.query(sqlCommand, (err) => {
        if (err) {
            next(err);
            return;
        }
        complete();
    });
}

// GET /
router.get('/', (req, res, next) => {
    const context = {};
    let sql = 'SELECT projectID, projectName, budget, startDate, endDate, duration FROM Projects;'
    mysql.pool.query(sql, function (err, results, fields) {
        if (err) {
            next(err);
            return;
        }
        context.results = results;
        res.render('projects', context);
    })
})

// GET /new
router.get('/new', (req, res, next) => {
    res.render('projectsForm')
})

// POST /new
router.post('/new', (req, res, next) => {
    const context = {}
    let callbackCount = 0;
    let sqlInputs = [req.body.projectName, req.body.budget, req.body.startDate, req.body.endDate, req.body.duration]
    createNewProject(res, mysql, sqlInputs, complete)
    createNewDailyLog(res, mysql, req.body.projectName, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 2) {
            context.results = "New project was added!";
            res.send(context);
        }
    }
})

// GET /edit/:id
router.get('/edit/:id', (req, res, next) => {
    const context = {};
    let sql = 'SELECT projectID, projectName, budget, startDate, endDate FROM Projects WHERE projectID = ?;'
    mysql.pool.query(sql, [req.params.id], function (err, results, fields) {
        if (err) {
            next(err);
            return;
        }
        context.results = results[0];
        res.render('editProject', context);
    })
})

// POST /edit
router.post('/edit', (req, res, next) => {
    const context = {}
    let sql = 'UPDATE Projects SET projectName = ?, budget = ?, startDate = ?, endDate = ? WHERE projectID = ?; '
    mysql.pool.query(sql, [req.body.projectName, req.body.budget, req.body.startDate, req.body.endDate, req.body.projectID], function (err, results, fields) {
        if (err) {
            next(err);
            return;
        }
        // Prepare response message
        context.results = "Project data was modified!";
        res.send(context);
    })
})

// DELETE /edit
router.post('/delete/:name&:id', (req, res) => {
    context = {}
    let sql = 'DELETE FROM Projects WHERE projectID = ?;'
    mysql.pool.query(sql, [req.params.id], function (err, results, fields) {
        if (err) {
            next(err);
            return;
        }
        // Prepare response message
        context.result = "You deleted the project: " + req.params.name;
        res.render('delete', context)
    })
})

module.exports = router;