const moment = require('moment');

class Tour {
    constructor({tourGuide, groupNumber, arriveDate, arriveFlightNum, arriveFlightTime, depatureFlightNum, depatureFlightTime, depatureDate, touristNum, phone, arriveCity, depatureCity, operator}) {
        this.tourGuide = tourGuide;
        this.groupNumber = groupNumber;
        this.arriveDate = arriveDate;
        this.arriveFlightNum = arriveFlightNum;
        this.arriveFlightTime = arriveFlightTime;
        this.depatureFlightNum = depatureFlightNum;
        this.depatureFlightTime = depatureFlightTime;
        this.depatureDate = this.arriveFlightTime.trim().length >= 13 ? arriveDate : depatureDate;
        this.touristNum = touristNum;
        this.phone = phone;
        this.arriveCity = arriveCity;
        this.depatureCity = depatureCity;
        this.operator = operator;
    }

    get shopEnteringDate() {
        return this.arriveFlightTime.trim().length >= 13 ? this.arriveDate
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
