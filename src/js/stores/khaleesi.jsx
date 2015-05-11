'use strict';

var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    utils = require('utils');

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

    nextPage() {
        this.movePage(this.monthCount);
    }

    previousPage() {
        this.movePage(this.monthCount * -1);
    }

    movePage(months) {
        let [year, month] = utils.normalizeYearMonth(this.startYear, this.startMonth + months);
        this.startYear = year;
        this.startMonth = month;
        this.emit('change');
    }
}

module.exports = Store;