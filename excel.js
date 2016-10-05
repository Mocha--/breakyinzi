'use strict';

let excelbuilder = require('msexcel-builder');
let moment = require('moment');

class GroupExcel {
    constructor(groups, startDate) {
        let sheetWidth = 13;
        let sheetHeight = groups.length * 3 + 2;
        this.workbook = excelbuilder.createWorkbook('./', moment().format('DD-MM-YYYY') + '.xlsx');
        this.sheet = this.workbook.createSheet('groups', sheetWidth, sheetHeight);
        this.groups = groups;
        this.sheet.set(4, 1, '日期');
        this.sheet.set(7, 1, startDate);
        this.sheet.set(10, 1, '星期');
        this.sheet.set(1, 2, '团队代码');
        this.sheet.align(1, 2, 'center');
        this.sheet.valign(1, 2, 'center');
        this.sheet.set(2, 2, '人数');
        this.sheet.valign(2, 2, 'center');
        this.sheet.set(3, 2, '飞机时间');
        this.sheet.merge({
            col: 3,
            row: 2
        }, {
            col: 4,
            row: 2
        })
        this.sheet.align(3, 2, 'center');
        this.sheet.valign(3, 2, 'center');
        this.sheet.set(5, 2, '离开');
        this.sheet.valign(5, 2, 'center');
        this.sheet.set(6, 2, '进店');
        this.sheet.valign(6, 2, 'center');
        this.sheet.set(7, 2, '导游');
        this.sheet.align(7, 2, 'center');
        this.sheet.valign(7, 2, 'center');
        this.sheet.set(8, 2, '司机');
        this.sheet.valign(8, 2, 'center');
        this.sheet.set(9, 2, '车公司');
        this.sheet.valign(9, 2, 'center');
        this.sheet.set(10, 2, '规格');
        this.sheet.valign(10, 2, 'center');
        this.sheet.set(11, 2, '行程');
        this.sheet.valign(11, 2, 'center');
        this.sheet.align(11, 2, 'center');
        this.sheet.valign(11, 2, 'center');
        this.sheet.set(12, 2, '领队');
        this.sheet.align(12, 2, 'center');
        this.sheet.valign(12, 2, 'center');
        this.sheet.set(13, 2, '备注/夜游/HOTEL');
        this.sheet.align(13, 2, 'center');
        this.sheet.valign(13, 2, 'center');
        this.sheet.width(1, 23);
        this.sheet.width(2, 4);
        this.sheet.width(3, 7);
        this.sheet.width(4, 12);
        this.sheet.width(5, 4);
        this.sheet.width(6, 4);
        this.sheet.width(7, 9);
        this.sheet.width(8, 5);
        this.sheet.width(9, 9);
        this.sheet.width(10, 5);
        this.sheet.width(11, 11);
        this.sheet.width(12, 8);
        this.sheet.width(13, 20);

        for (let i = 1; i <= sheetHeight - 1; i++) {
            for (let j = 0; j <= sheetWidth - 1; j++) {
                this.sheet.border(j + 1, i + 1, {
                    left: 'thin',
                    top: 'thin',
                    right: 'thin',
                    bottom: 'thin'
                })
                this.sheet.height(i + 1, 21);
            }
        }

        this.fillData();
    }

    fillData() {
        for (let i = 0; i <= this.groups.length - 1; i++) {
            let group = this.groups[i];
            this.sheet.set(1, 3 + 3 * i, group.groupNumber);
            this.sheet.font(1, 3 + 3 * i, {
                bold: true
            });
            this.sheet.align(1, 3 + 3 * i, 'center');
            this.sheet.wrap(1, 3 + 3 * i, 'true');
            this.sheet.set(2, 3 + 3 * i, group.touristNum);
            this.sheet.align(2, 3 + 3 * i, 'center');
            this.sheet.merge({
                col: 3,
                row: 3 + 3 * i
            }, {
                col: 4,
                row: 3 + 3 * i
            });
            this.sheet.set(3, 4 + 3 * i, group.arriveFlightNum);
            this.sheet.set(4, 4 + 3 * i, group.arriveFlightTime);
            this.sheet.set(3, 5 + 3 * i, group.depatureFlightNum);
            this.sheet.set(4, 5 + 3 * i, group.depatureFlightTime);

            if (group.touristNum <= 14) {
                this.sheet.set(8, 3 + 3 * i, 'D/G');
            }

            let busSize = 0;
            if (group.touristNum + 1 <= 13) {
                busSize = 14;
            } else if (group.touristNum + 1 <= 19 && group.touristNum + 1 > 13) {
                busSize = 21;
            } else if (group.touristNum + 1 > 19 && group.touristNum + 1 <= 22) {
                busSize = 25;
            } else {
                busSize = '';
            }

            this.sheet.set(10, 3 + 3 * i, busSize);
            this.sheet.set(11, 3 + 3 * i, '1接+');

            if (parseInt(group.depatureFlightTime.trim().slice(0, 2)) <= 12) {
                this.sheet.set(6, 3 + 3 * i, parseInt(group.depatureDate) - 1);
            } else {
                this.sheet.set(6, 3 + 3 * i, parseInt(group.depatureDate));
            }
            let colsToBeMerged = [1, 2, 6, 7, 8, 9, 10, 12, 13];
            for (let col of colsToBeMerged) {
                this.sheet.merge({
                    col: col,
                    row: 3 + 3 * i
                }, {
                    col: col,
                    row: 5 + 3 * i
                });
                this.sheet.valign(col, 3 + 3 * i, 'center');
            }

            this.sheet.merge({
                col: 5,
                row: 4 + 3 * i
            }, {
                col: 5,
                row: 5 + 3 * i
            });
            this.sheet.border(5, 4 + 3 * i, {
                left: 'thin',
                right: 'thin',
                top: 'none',
                bottom: 'none'
            });
            this.sheet.border(5, 3 + 3 * i, {
                bottom: 'none'
            });
            this.sheet.set(5, 4 + 3 * i, group.depatureDate);
        }
    }

    save(done) {
        this.workbook.save(function(status) {
            done();
        });
    }
}

module.exports = GroupExcel
    // workbook.save(function(ok) {
    //     if (!ok)
    //         workbook.cancel();
    //     else
    //         console.log('congratulations, your workbook created');
    // });
