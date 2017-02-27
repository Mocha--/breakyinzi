const moment = require('moment');

class Tour {
    constructor({tourGuide, groupNumber, arriveDate, arriveFlightNum, arriveFlightTime, depatureFlightNum, depatureFlightTime, depatureDate, touristNum}) {
        this.tourGuide = tourGuide;
        this.groupNumber = groupNumber;
        this.arriveDate = arriveDate;
        this.arriveFlightNum = arriveFlightNum;
        this.arriveFlightTime = arriveFlightTime;
        this.depatureFlightNum = depatureFlightNum;
        this.depatureFlightTime = depatureFlightTime;
        this.depatureDate = depatureDate;
        this.touristNum = touristNum;
    }

    get shopEnteringDate() {
        if (this.depatureFlightTime.trim().length >= 13) {
            console.info(this.arriveDate);
        }
        return this.depatureFlightTime.trim().length >= 13 ? this.arriveDate
            : parseInt(this.depatureFlightTime.trim().slice(0, 2)) <= 12 ? moment(this.depatureDate).subtract(1, 'd').format('YYYY-MM-DD')
            : moment(this.depatureDate).format('YYYY-MM-DD');
    }

    get busSize() {
        return this.touristNum <= 12 ? 14
            : this.touristNum <= 18 ?  21
            : this.touristNum <= 21 ?  25
            :  '';
    }
}

module.exports = Tour;
