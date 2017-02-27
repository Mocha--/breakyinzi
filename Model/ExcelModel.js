const excelbuilder = require('msexcel-builder');
const moment = require('moment');

class Excel {
    constructor({ dirPath, fileName, sheetName, totalWidth, totalHeight}) {
        this.workbook = excelbuilder.createWorkbook(dirPath, fileName);
        this.sheet = this.workbook.createSheet(sheetName, totalWidth, totalHeight);
    }

    setCell(row, col, content, {horizontallyAlign, verticallyAlign, wrap, font, border, mergeTo} = {}) {
        this.sheet.set(col, row, content);
        horizontallyAlign && this.sheet.align(col, row, horizontallyAlign);
        verticallyAlign && this.sheet.valign(col, row, verticallyAlign);
        wrap && this.sheet.wrap(col, row, 'true');
        font && this.sheet.font(col, row, font);
        border && this.sheet.border(col, row, border);
        mergeTo && this.sheet.merge({row, col}, {row: mergeTo.row, col: mergeTo.col});
    }

    setColWidth(col, width) {
        this.sheet.width(col, width);
    }

    setRowHeight(row, height) {
        this.sheet.height(row, height);
    }

    save() {
        return new Promise((resolve, reject) => {
            this.workbook.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Excel;
