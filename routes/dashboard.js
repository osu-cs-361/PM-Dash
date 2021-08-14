// Routing for /dashboard
const express = require('express');
const router = express.Router();
const mysql = require('../services/dbcon.js');    // dbcon.js hold credientials for mySQL

router.get('/:projectName', (req, res) => {
    const context = {}
    context.projectName = req.params.projectName;
    let sql = 'SELECT logID, date, plannedProgress, actualProgress, plannedSpend, actualSpend FROM ' + req.params.projectName + 'DailyLog;';
    mysql.pool.query(sql, function (err, results, fields) {
        if (err) {
            next(err);
            return;
        }
        context.results = results;
        res.render('dashboard', context);
    })

})

module.exports = router;