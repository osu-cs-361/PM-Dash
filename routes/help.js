// Routing for /projects
const express = require('express');
const router = express.Router();
const mysql = require('../services/dbcon.js');

// GET /
router.get('/', (req, res) => {
    const context = {};
    res.render('help', context);
})

// POST /
router.post('/', (req, res, next) => {
    const context = {};
    let sqlCommand = 'INSERT INTO IssueLog (dateLogged, email, description, status) VALUES (?,?,?,?);';
    let sqlInputs = [req.body.dateLogged, req.body.email, req.body.description, req.body.status];
    mysql.pool.query(sqlCommand, sqlInputs, function (err, results, fields) {
        if (err) {
            next(err);
            return;
        }
        // Prepare response message
        context.results = "Your issue was successfully submitted.";
        res.send(context);
    })
})


module.exports = router;