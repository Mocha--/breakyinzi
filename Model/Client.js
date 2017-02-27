const moment = require('moment');
const axios = require('axios');
const querystring = require('querystring');
const cheerio = require('cheerio');
const Tour = require('./TourModel.js');

const CITY = 'mel';
const TABLE_ROWS_SELECTOR = 'tr[bgcolor="#F8F8F8"]';

class Client {
    getCookie(loginUrl, {username, password}) {
        return axios
            .request({
                url: loginUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: querystring.stringify({
                    userid: username,
                    userpass: password
                })
            })
            .then(({ headers }) => {
                return headers['set-cookie'];
            })
            .catch((err) => {
                console.info(err);
            });
    }

    getTours(toursUrl, cookie, {start, end}) {
        return axios
            .request({
                url: toursUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookie
                },
                data: querystring.stringify({
                    city: CITY,
                    guilddate1: start,
                    guilddate2: end
                })
            })
            .then(({ data: html }) => {
                const $ = cheerio.load(html, {decodeEntities: false});
                return Array.from($(TABLE_ROWS_SELECTOR).map((idx, row) => {
                    const rowData = Array.from($(row).children('td').map((idx, cell) => {
                        return $(cell).html();
                    }));

                    return new Tour({
                        guild: rowData[0],
                        groupNumber: $(rowData[2]).html(),
                        arriveFlightNum: rowData[6],
                        arriveFlightTime: rowData[7],
                        depatureFlightNum: rowData[10],
                        depatureFlightTime: rowData[11],
                        depatureDate: rowData[9],
                        touristNum: parseInt(rowData[12]) - 1
                    });
                }));
            })
            .catch((err) => {
                console.info(err);
            });
    }
}

module.exports = new Client();
