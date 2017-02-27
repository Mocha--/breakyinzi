const express = require('express');
const moment = require('moment');
const path = require('path');
const tableRouter = express.Router();
const client = require('../Model/Client.js');
const TourExcel = require('../Model/TourExcelModel.js');
const { LOGIN_URL, USERNAME, PASSWORD, TOURS_URL } = require('../Config.js');

tableRouter
    .route('/tourTables')
    .get((req, res) => {
        const {
            date = moment().add(1, 'd').format('YYYY-MM-DD'),
            startdate,
            enddate
        } = req.query;

        const relativeDirPath = './.tmp';
        const fileName = `ToursTables-${date || enddate}.xlsx`;

        client
            .getCookie(LOGIN_URL, {
                username: USERNAME,
                password: PASSWORD
            })
            .then((cookie) => {
                return client.getTours(TOURS_URL, cookie, {
                    start: !!startdate && !!enddate ? startdate : date,
                    end: !!startdate && !!enddate ? enddate : date
                });
            })
            .then((tours) => {
                const tourExcel = new TourExcel({
                    fileName,
                    dirPath: relativeDirPath,
                    sheetName: 'Tours',
                    totalWidth: 13,
                    totalHeight: 2 + tours.length * 3
                });
                tourExcel.setTitle(date || enddate, moment(date || enddate, 'YYYY-MM-DD').format('dddd'));
                tourExcel.load(tours);
                return tourExcel.save();
            })
            .catch((err) => {
                console.info(err);
            })
            .then(() => {
                res.sendFile(path.resolve(__dirname, '../.tmp', fileName));
            })
            .catch((err) => {
                console.info(err);
            });
    });

module.exports = tableRouter;
