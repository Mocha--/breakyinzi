'use strict';

let express = require('express');
let request = require('superagent');
let cheerio = require('cheerio');
let async = require('async');
let GroupExcel = require('./excel');
let moment = require('moment');

let loginUrl = 'http://nzsystem.yinzisoft.com/aus/web/login.asp';
let reportUrl = 'http://nzsystem.yinzisoft.com/aus/report/tourguild.asp';

let app = express();

class Tour {
    constructor(obj) {
        this.guild = obj.guild;
        this.groupNumber = obj.groupNumber;
        this.arriveFlightNum = obj.arriveFlightNum;
        this.arriveFlightTime = obj.arriveFlightTime;
        this.depatureFlightNum = obj.depatureFlightNum;
        this.depatureFlightTime = obj.depatureFlightTime;
        this.depatureDate = obj.depatureDate;
        this.touristNum = obj.touristNum;
    }
}

app.get('/groupTable', function(req, res) {
    console.log(req.query.startdate);
    console.log(req.query.enddate);
    let tours = [];
    let startDate = req.query.startdate || moment().add(1, 'd').format('YYYY-MM-DD');
    let endDate = req.query.enddate || moment().add(1, 'd').format('YYYY-MM-DD');

    async.waterfall([
        function(cb) {
            request
                .post(loginUrl)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    userid: 'Aumel',
                    userpass: 'mel123456'
                })
                .end(function(err, res) {
                    // console.log(res.header['set-cookie']);
                    cb(null, res.header['set-cookie'])
                })
        },
        function(cookie, cb) {
            // console.log(cookie);
            request
                .post(reportUrl)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Cookie', cookie)
                .send({
                    city: 'mel',
                    guilddate1: startDate,
                    guilddate2: endDate
                })
                .end(function(err, res) {
                    let html = res.text;
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    $('tr[bgcolor="#F8F8F8"]').each(function() {
                        let rowData = [];
                        $(this).children('td').each(function() {
                            rowData.push($(this).html());
                        })

                        tours.push(new Tour({
                            guild: rowData[0],
                            groupNumber: $(rowData[2]).html(),
                            arriveFlightNum: rowData[6],
                            arriveFlightTime: rowData[7],
                            depatureFlightNum: rowData[10],
                            depatureFlightTime: rowData[11],
                            depatureDate: moment(rowData[9]).format('DD'),
                            touristNum: parseInt(rowData[12]) - 1
                        }))
                    });
                    console.log(tours);
                    cb(null, tours)
                })
        },
        function(tours, cb) {
            let excel = new GroupExcel(tours);
            excel.save(function() {
                res.sendFile('groupExcel.xlsx', {
                        root: __dirname,
                        // dotfiles: 'allow'
                    },
                    function(err) {
                        console.log('sent');
                    })
            });
        }
    ])
})

app.listen(8000, function() {
    console.log('listening');
})
