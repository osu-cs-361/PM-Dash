// Routing for /dashboard
const express = require('express');
const router = express.Router();
const mysql = require('../services/dbcon.js');    // dbcon.js hold credientials for mySQL

router.get('/:projectName', (req, res, next) => {
    const context = {}
    context.projectName = req.params.projectName;
    res.render('dashboard', context);
})

module.exports = router;