// Routing for /projects
const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
    const context = {};
    res.render('help', context);
})

module.exports = router;