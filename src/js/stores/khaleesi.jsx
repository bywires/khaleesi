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
                selected: [],
                arrival: null,
                departure: null
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
        if (this.selected.length < 2) {
            this.selected.push(data);
            this.selected.sort();
        } else {
            this.selected = [data];
        }

        this.arrival = this.selected[0] || null;
        this.departure = this.selected[1] || null;

        this.emit('change');
    }

    getSelected() {
        return this.selected.concat([this.dayHover]).slice(0, 2).sort();
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