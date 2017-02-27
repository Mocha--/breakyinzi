const moment = require('moment');

class Tour {
    constructor({guild, groupNumber, arriveFlightNum, arriveFlightTime, depatureFlightNum, depatureFlightTime, depatureDate, touristNum}) {
        this.guild = guild;
        this.groupNumber = groupNumber;
        this.arriveFlightNum = arriveFlightNum;
        this.arriveFlightTime = arriveFlightTime;
        this.depatureFlightNum = depatureFlightNum;
        this.depatureFlightTime = depatureFlightTime;
        this.depatureDate = depatureDate;
        this.touristNum = touristNum;
    }

    get shopEnteringDate() {
        if (parseInt(this.depatureFlightTime.trim().slice(0, 2)) <= 12) {
            return moment(this.depatureDate).subtract(1, 'd').format('YYYY-MM-DD');
        } else {
            return moment(this.depatureDate).format('YYYY-MM-DD');
        }
    }

    get busSize() {
        return this.touristNum <= 12 ? 14
            : this.touristNum <= 18 ?  21
            : this.touristNum <= 21 ?  25
            :  '';
    }
}

module.exports = Tour;
