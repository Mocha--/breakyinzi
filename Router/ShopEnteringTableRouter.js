const express = require('express');
const moment = require('moment');
const path = require('path');
const shopEnteringTableRouter = express.Router();
const client = require('../Model/Client.js');
const ShopEnteringExcel = require('../Model/ShopEnteringExcelModel.js');
const { LOGIN_URL, TOURS_URL, USERNAME, PASSWORD, DAYS_BEFORE_ENTERING_SHOP } = require('../Config.js');

shopEnteringTableRouter
    .route('/shopEnteringTables')
    .get((req, res) => {
        const { date = moment().add(1, 'd').format('YYYY-MM-DD') } = req.query;
        const relativeDirPath = './.tmp';
        const fileName = `ShopEnteringTable-${date}.xlsx`;

        client
            .getCookie(LOGIN_URL, {
                username: USERNAME,
                password: PASSWORD
            })
            .then((cookie) => {
                return client.getTours(TOURS_URL, cookie, {
                    start: moment(date).subtract(DAYS_BEFORE_ENTERING_SHOP, 'd').format('YYYY-MM-DD'),
                    end: date
                });
            })
            .then((tours) => {
                const filteredTours = tours.filter(tour => tour.shopEnteringDate === date);
                const shopEnteringExcel = new ShopEnteringExcel({
                    fileName,
                    dirPath: relativeDirPath,
                    sheetName: 'ShopEntering',
                    totalWidth: 10,
                    totalHeight: 2 + filteredTours.length
                });
                shopEnteringExcel.setTitle(date, moment(date).format('dddd'));
                shopEnteringExcel.load(filteredTours);
                return shopEnteringExcel.save();
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

module.exports = shopEnteringTableRouter;
