const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('../views/links/add.hbs');
})

router.post('/add', (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    pool.query('INSERT INTO link set ?')
    res.send('received');
})

module.exports = router;