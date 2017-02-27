const Excel = require('./ExcelModel.js');

const ROW_HEIGHT = 40;
const TITLE_ROW_NUMBER = 1;
const HEADER_ROW_NUMBER = 2;
const TABLE_TITLE = 'MEL 每日进店团表';

const COMPUTER_ID_STRING = '电脑号';
const TOUR_ID_STRING = '团号';
const TOURIST_NUMBER_STRING = '人数';
const TOUR_GUIDE_STRING = '导游';
const TIME_STRING = '时间';
const STOPS_STRING = '站';
const TOUR_PLAN_STRING = '行程';
const TOUR_LEADER_STRING = '领队';
const PRICE_STRING = '报价';
const COMMENT_STRING = '备注';
const DATE_STRING = '日期';
const WEEKDAY_STRING = '星期';

const CENTER = 'center';

class ShopEnteringExcel extends Excel {
    constructor({ dirPath, fileName, sheetName, totalWidth, totalHeight }) {
        super({ dirPath, fileName, sheetName, totalWidth, totalHeight });
        this.totalHeight = totalHeight;
        this.colWidths = [4, 23, 4, 12, 8, 8, 12, 8, 8, 8];
        this.setColsWidth();
        this.setRowsHeight();
        this.setHeader();
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

    setTitle(date, weekday) {
        this.setCell(TITLE_ROW_NUMBER, 2, TABLE_TITLE);
        this.setCell(TITLE_ROW_NUMBER, 6, DATE_STRING);
        this.setCell(TITLE_ROW_NUMBER, 7, date);
        this.setCell(TITLE_ROW_NUMBER, 8, weekday);
    }

    setHeader() {
        this.setCell(HEADER_ROW_NUMBER, 1, COMPUTER_ID_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 2, TOUR_ID_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 3, TOURIST_NUMBER_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 4, TOUR_GUIDE_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 5, TIME_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 6, STOPS_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 7, TOUR_PLAN_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 8, TOUR_LEADER_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 9, PRICE_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        this.setCell(HEADER_ROW_NUMBER, 10, COMMENT_STRING, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
    }

    load(tours) {
        tours.forEach((tour, idx) => {
            const {
                groupNumber: tourId,
                touristNum,
                tourGuide
            } = tour;

            this.setCell(3 + idx, 1, '', {horizontallyAlign: CENTER, verticallyAlign: CENTER});
            this.setCell(3 + idx, 2, tourId, {
                horizontallyAlign: CENTER,
                verticallyAlign: CENTER,
                font: {bold: true},
                wrap: true
            });
            this.setCell(3 + idx, 3, touristNum, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
            this.setCell(3 + idx, 4, tourGuide, {horizontallyAlign: CENTER, verticallyAlign: CENTER});
            this.setCell(3 + idx, 5, '', {horizontallyAlign: CENTER, verticallyAlign: CENTER});
            this.setCell(3 + idx, 6, '', {horizontallyAlign: CENTER, verticallyAlign: CENTER});
            this.setCell(3 + idx, 7, '', {horizontallyAlign: CENTER, verticallyAlign: CENTER});
            this.setCell(3 + idx, 8, '', {horizontallyAlign: CENTER, verticallyAlign: CENTER});
            this.setCell(3 + idx, 9, '', {horizontallyAlign: CENTER, verticallyAlign: CENTER});
            this.setCell(3 + idx, 10, '', {horizontallyAlign: CENTER, verticallyAlign: CENTER});
        })
    }
}

module.exports = ShopEnteringExcel;
