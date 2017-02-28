const Excel = require('./ExcelModel.js');
const moment = require('moment');

const TITLE_ROW_NUMBER = 1;
const HEADER_ROW_NUMBER = 2;

/**
 * title names
 */
const DATE_STRING = '日期';
const WEEKDAY_STRING = '星期';

/**
 * header names
 */
const GROUP_ID_STRING = '团队代码';
const TOURISTS_NUMBER_STRING = '人数';
const FLIGHT_INFO_STRING = '飞机时间';
const LEAVE_TIME_STRING = '离开';
const SHOP_ENTERING_TIME_STRING = '进店';
const TOUR_GUIDE_STRING = '导游';
const DRIVER_STRING = '司机';
const BUS_COMPANY_STRING = '车公司';
const BUS_SIZE_STRING = '规格';
const TOUR_PLAN_STRING = '行程';
const TOUR_LEADER_STRING = '领队';
const COMMENT_STRING = '备注/夜游/HOTEL';

/**
 * header col number
 */
const GROUP_ID_COL_NUMBER = 1;

/**
 * common used
 */
const CENTER = 'center';
const BOTTOM = 'bottom';
const TRUE = 'true';
const ROW_HEIGHT = 21;
const DRIVER_GUY_STRING = 'D/G';
const FIRST_DAY_TRIP_STRING = '1接+';

class TourExcel extends Excel {
    constructor({ dirPath, fileName, sheetName, totalWidth, totalHeight }) {
        super({ dirPath, fileName, sheetName, totalWidth, totalHeight });
        this.totalHeight = totalHeight;
        this.colWidths = [23, 4, 7, 12, 4, 4, 9, 5, 9, 5, 11, 8, 20];
        this.setColsWidth();
        this.setRowsHeight();
        this.setHeader();
        this.initBorder();
    }

    setColsWidth() {
        this.colWidths.forEach((elm, idx) => {
            this.setColWidth(idx + 1, elm);
        });
    }

    setRowsHeight() {
        [...Array(this.totalHeight).keys()].forEach((elm) => {
            this.setRowHeight(elm + 1, ROW_HEIGHT);
        });
    }

    /**
      * date in format e.g. 01/01/2017
      */
    setTitle(date, weekday) {
        this.setCell(TITLE_ROW_NUMBER, 4, DATE_STRING, {verticallyAlign: CENTER});
        this.setCell(TITLE_ROW_NUMBER, 7, date, {verticallyAlign: CENTER});
        this.setCell(TITLE_ROW_NUMBER, 10, WEEKDAY_STRING, {verticallyAlign: CENTER});
        this.setCell(TITLE_ROW_NUMBER, 11, weekday, {verticallyAlign: CENTER});
    }

    setHeader() {
        this.setCell(HEADER_ROW_NUMBER, 1, GROUP_ID_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 2, TOURISTS_NUMBER_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 3, FLIGHT_INFO_STRING, {
            horizontallyAlign: CENTER,
            verticallyAlign: CENTER,
            mergeTo: {row: HEADER_ROW_NUMBER, col: 4}});
        this.setCell(HEADER_ROW_NUMBER, 5, LEAVE_TIME_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 6, SHOP_ENTERING_TIME_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 7, TOUR_PLAN_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 8, DRIVER_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 9, BUS_COMPANY_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 10, BUS_SIZE_STRING, {horizontallyAlign: CENTER, verticallyAlign:CENTER});
        this.setCell(HEADER_ROW_NUMBER, 11, TOUR_PLAN_STRING, {horizontallyAlign:CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 12, TOUR_LEADER_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 13, COMMENT_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
    }

    load(tours) {
        tours.forEach((tour, idx) => {
            const {
                groupNumber,
                touristNum,
                arriveFlightNum,
                arriveFlightTime,
                depatureFlightNum,
                depatureFlightTime,
                depatureDate,
                busSize,
                shopEnteringDate
            } = tour;

            this.setCell(3 + 3 * idx, 1, groupNumber, {
                font: {bold: true},
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER,
                mergeTo: {row: 5 + 3 * idx, col: 1},
                wrap: true
            });
            this.setCell(3 + 3 * idx, 2, touristNum, {
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER,
                mergeTo: {row: 5 + 3 * idx, col: 2}
            });
            this.setCell(3 + 3 * idx, 3, '', {mergeTo: {row: 3 + 3 * idx, col: 4}});
            this.setCell(4 + 3 * idx, 3, arriveFlightNum);
            this.setCell(4 + 3 * idx, 4, arriveFlightTime);
            this.setCell(5 + 3 * idx, 3, depatureFlightNum);
            this.setCell(5 + 3 * idx, 4, depatureFlightTime);
            this.setCell(3 + 3 * idx, 5, moment(depatureDate, 'YYYY-MM-DD').format('DD'), {
                horizontallyAlign: CENTER,
                verticallyAlign: BOTTOM,
                mergeTo: {row: 5 + 3 * idx, col: 5}
            });
            this.setCell(3 + 3 * idx, 6, moment(shopEnteringDate, 'YYYY-MM-DD').format('DD'), {
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER,
                mergeTo: {row: 5 + 3 * idx, col: 6}
            });
            this.setCell(3 + 3 * idx, 7, '', {
                mergeTo: {row: 5 + 3 * idx, col: 7}
            });
            this.setCell(3 + 3 * idx, 8, touristNum <= 14 ? DRIVER_GUY_STRING : '', {
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER,
                mergeTo: {row: 5 + 3 * idx, col: 8}
            });
            this.setCell(3 + 3 * idx, 9, '', {
                mergeTo: {row: 5 + 3 * idx, col: 9}
            });
            this.setCell(3 + 3 * idx, 10, busSize, {
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER,
                mergeTo: {row: 5 + 3 * idx, col: 10}
            });
            this.setCell(3 + 3 * idx, 11, FIRST_DAY_TRIP_STRING, {
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER
            });
            this.setCell(3 + 3 * idx, 12, '', {
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER,
                mergeTo: {row: 5 + 3 * idx, col: 12}
            });
            this.setCell(3 + 3 * idx, 13, '', {
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER,
                mergeTo: {row: 5 + 3 * idx, col: 13}
            });
        });
    }
}

module.exports = TourExcel;
