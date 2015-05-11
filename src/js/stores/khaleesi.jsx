var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

class Store extends EventEmitter {
    constructor(options) {
        assign(
            this,
            {
                startYear: null,
                startMonth: null,
                monthCount: 1,
                dayHover: null,
                arrival: null,
                departure: null,
                next: 'arrival'
            },
            options
        );
    }

    setDayHover(data) {
        this.dayHover = data;
        this.emit('change');
    }

    getDayHover() {
        return this.dayHover;
    }

    select(data) {
        if (this.next == 'arrival') {
            this.arrival = data;
            this.departure = null;
            this.next = 'departure';
        } else {
            this.departure = data;
            this.next = 'arrival';
        }

        this.emit('change');
    }

    getArrival() {
        return this.arrival;
    }

    getDeparture() {
        return this.departure;
    }
}

module.exports = Store;