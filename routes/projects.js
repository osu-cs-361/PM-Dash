// Routing for /projects
const express = require('express');
const router = express.Router();
const mysql = require('../services/dbcon.js');    // dbcon.js hold credientials for mySQL

// GET /
router.get('/', (req, res, next) => {
    const context = {};
    let sql = 'SELECT projectID, projectName, budget, startDate, endDate FROM Projects;'
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
    let sql = 'INSERT INTO Projects (projectName, budget, startDate, endDate) VALUES (?,?,?,?);'
    mysql.pool.query(sql, [req.body.projectName, req.body.budget, req.body.startDate, req.body.endDate], function (err, results, fields) {
        if (err) {
            next(err);
            return;
        }
        // Prepare response message
        context.results = "New project was added!";
        res.send(context);
    })
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
    let sql = 'INSERT INTO Projects (projectName, budget, startDate, endDate) VALUES (?,?,?,?);'
    mysql.pool.query(sql, [req.body.projectName, req.body.budget, req.body.startDate, req.body.endDate], function (err, results, fields) {
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