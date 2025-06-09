const express = require('express');
const app = express(); // call express() and assign to const
const path = require('path');

// Serve static content from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Import functions from p3-module.js
const { coinCombo, coinValue } = require('./p3-module');

// GET route: /coincombo
app.get('/coincombo', (req, res) => {
    const amount = parseInt(req.query.amount, 10);

    if (isNaN(amount) || amount < 0) {
        return res.json({ error: 'Invalid or missing amount parameter' });
    }

    res.json(coinCombo(amount));
});

// GET route: /coinvalue
app.get('/coinvalue', (req, res) => {
    const {
        pennies = 0,
        nickels = 0,
        dimes = 0,
        quarters = 0,
        halves = 0,
        dollars = 0
    } = req.query;

    const coinCounts = {
        pennies: parseInt(pennies, 10) || 0,
        nickels: parseInt(nickels, 10) || 0,
        dimes: parseInt(dimes, 10) || 0,
        quarters: parseInt(quarters, 10) || 0,
        halves: parseInt(halves, 10) || 0,
        dollars: parseInt(dollars, 10) || 0
    };

    res.json(coinValue(coinCounts));
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Server constants and startup
const HOST = 'localhost';
const PORT = 8080;

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
