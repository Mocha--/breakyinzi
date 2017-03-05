const express = require('express');
const moment = require('moment');
const { LOGIN_URL, USERNAME, PASSWORD, TOURS_URL } = require('../Config.js');
const client = require('../Model/Client.js');
const toursRouter = express.Router();

toursRouter
    .route('/tours')
    .get((req, res) => {
        const {
            startdate = moment().subtract(3, 'd').format('YYYY-MM-DD'),
            enddate = moment().add(3, 'd').format('YYYY-MM-DD')
        } = req.query;

        client
            .getCookie(LOGIN_URL, {
                username: USERNAME,
                password: PASSWORD
            })
            .then((cookie) => {
                return client.getTours(TOURS_URL, cookie, {
                    start: startdate,
                    end: enddate
                });
            })
            .then((tours) => {
                res.send(tours);
            })
            .catch((err) => {
                console.info(err);
            });
    });

module.exports = toursRouter;
