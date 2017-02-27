const express = require('express');
const moment = require('moment');
const shopEnteringTableRouter = express.Router();
const client = require('../Model/Client.js');
const { TOURS_URL, COOKIE, DAYS_BEFORE_ENTERING_SHOP } = require('../Config.js');

shopEnteringTableRouter
    .route('/shopEnteringTables')
    .get((req, res) => {
        const date = req.query.date || moment().add(1, 'd').format('YYYY-MM-DD');
        client
            .getTours(TOURS_URL, COOKIE, {start: moment(date).subtract(DAYS_BEFORE_ENTERING_SHOP, 'd').format('YYYY-MM-DD'), end: date})
            .then((tours) => {
                res.send(tours.filter(elm => elm.shopEnteringDate === date));
            })
            .catch((err) => {
                res.send(err);
            })
    });

module.exports = shopEnteringTableRouter;
