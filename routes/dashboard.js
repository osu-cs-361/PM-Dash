// Routing for /dashboard
const express = require('express');
const router = express.Router();
const mysql = require('../services/dbcon.js');    // dbcon.js hold credientials for mySQL

const getBudget = (res, context, complete) => {
    let sqlCommand = 'SELECT budget FROM Projects WHERE projectName = ' + "'" + context.projectName + "';";
    mysql.pool.query(sqlCommand, (err, results) => {
        if (err) {
            next(err);
            return;
        }
        context.budget = results[0];
        complete();
    });
}

const getSummaryData = (res, context, complete) => {
    let sqlCommand = 'SELECT SUM(plannedProgress) AS total_planned_progress,' +
        'SUM(actualProgress) AS total_actual_progress,' +
        'SUM(plannedSpend) AS total_planned_spend, ' +
        'SUM(actualSpend) AS total_actual_spend FROM ' + context.projectName + 'DailyLog;';

    mysql.pool.query(sqlCommand, (err, results) => {
        if (err) {
            next(err);
            return;
        }
        context.summary = results[0];
        complete();
    });
}

const getDailyDataLog = (res, context, complete) => {
    let sqlCommand = 'SELECT logID, date, plannedProgress, actualProgress, plannedSpend, actualSpend FROM ' + context.projectName + 'DailyLog;';
    mysql.pool.query(sqlCommand, (err, results) => {
        if (err) {
            next(err);
            return;
        }
        context.results = results;
        complete();
    });
}

const budgetCalcs = (context) => {
    context.plannedBudget = (context.summary.total_planned_spend / context.budget.budget) * 100;
    context.actualBudget = context.summary.total_actual_spend / context.budget.budget * 100;
}

// GET /:projectName
router.get('/:projectName', (req, res) => {
    const context = {};
    let callbackCount = 0;
    context.projectName = req.params.projectName;
    getDailyDataLog(res, context, complete);
    getSummaryData(res, context, complete);
    getBudget(res, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            budgetCalcs(context);
            res.render('dashboard', context);
        }
    }
})

module.exports = router;