const express = require('express');
const router = express.Router();
const mysql = require('../services/dbcon.js');

const getDailyDataLog = (res, context, complete) => {
    let sqlCommand = 'SELECT logID, date, plannedProgress, actualProgress, plannedSpend, actualSpend FROM ' +
        context.projectName + 'DailyLog;';
    mysql.pool.query(sqlCommand, (err, results) => {
        if (err) {
            next(err);
            return;
        }
        context.results = results;
        complete();
    });
}

const deleteDataLogEntry = (res, projectName, logID, context, complete) => {
    let sqlCommand = 'DELETE FROM ' + projectName + 'DailyLog WHERE logID = ?;';
    mysql.pool.query(sqlCommand, logID, (err) => {
        if (err) {
            next(err);
            return;
        }
        context.message = "Entry successfully deleted.";
        complete();
    });
}

const insertDataLogEntry = (res, sqlInputs, context, complete) => {
    let sqlCommand = 'INSERT INTO ' + context.projectName + 'DailyLog (date, plannedProgress, actualProgress, plannedSpend, actualSpend) VALUES (?,?,?,?,?);'
    mysql.pool.query(sqlCommand, sqlInputs, (err) => {
        if (err) {
            next(err);
            return;
        }
        context.message = "Entry successfully added.";
        complete();
    })
}


// GET /:projectName
router.get('/:projectName', (req, res) => {
    const context = {};
    let callbackCount = 0;
    context.projectName = req.params.projectName;
    getDailyDataLog(res, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('dataLog', context);
        }
    }
})

// GET /:projectname/:logID
router.get('/:projectName/:logID', (req, res) => {
    const context = {};
    let callbackCount = 0;
    projectName = req.params.projectName;
    logID = req.params.logID;
    context.projectName = req.params.projectName;
    deleteDataLogEntry(res, projectName, logID, context, complete);
    getDailyDataLog(res, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 2) {
            res.send(context);
        }
    }
})

// POST /:projectName
router.post('/:projectName', (req, res) => {
    const context = {};
    let callbackCount = 0;
    context.projectName = req.params.projectName;
    let sqlInputs = [req.body.data, req.body.plannedProgress, req.body.actualProgress, req.body.plannedSpend, req.body.actualSpend];
    insertDataLogEntry(res, sqlInputs, context, complete);
    getDailyDataLog(res, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 2) {
            res.send(context);
        }
    }
})

module.exports = router;