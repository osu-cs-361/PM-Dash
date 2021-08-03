// Routing for /dashboard
const express = require('express');
const router = express.Router();
const mysql = require('../services/dbcon.js');    // dbcon.js hold credientials for mySQL

router.get('/:projectName', (req, res, next) => {
    const context = {}
    context.projectName = req.params.projectName;
    let sql = 'SELECT logID, date, scope, production, units, spend FROM DailyLog;'
    mysql.pool.query(sql, function (err, results, fields) {
        if (err) {
            next(err);
            return;
        }
        context.results = results;
        console.log(context.results)
        res.render('dashboard', context);
    })

})

module.exports = router;