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
                hover: null,
                selected: [],
                arrival: null,
                departure: null
            },
            options
        );
    }

    setHover(data) {
        this.hover = data;
        this.emit('change');
    }

    getHover() {
        // nothing is selected, hover is low/arrival
        if (this.selected.length == 0) {
            return this.hover;
        }
        // one day is already selected, hover is part of selection
        else if (this.selected.length == 1) {
            return null;
        }
        // two days are selected and hover is between them (inclusive), hover nothing
        else if (this.hover > this.selected[0] && this.hover < this.selected[1]) {
            return null;
        }
        // two days are selected, treat hover as potential new arrival date
        else {
            return this.hover;
        }
    }

    select(data) {
        // arrival and departure cannot be the same day
        if (this.selected == [data]) {
            return;
        }
        // combine new date with old and sort
        else if (this.selected.length == 1) {
            this.selected.push(data);
            this.selected.sort();
        }
        // two days selected and date is later than high date, expand selection
        else if (this.selected.length == 2 && data > this.selected[1]) {
            this.selected[1] = data;
        }
        // start new selection
        else {
            this.selected = [data];
        }

        this.arrival = this.selected[0];
        this.departure = this.selected[1] || null;

        this.emit('change');
    }

    unselect() {
        this.selected = [];
        this.arrival = null;
        this.departure = null;
        this.emit('change');
    }

    getSelected() {
        // zero days selected
        if (this.selected.length == 0) {
            return [null, null];
        }
        // two days selected
        else if (this.selected.length == 2) {
            return this.selected;
        }
        // one date selected and we're hovering that date, show the selected as low and ignore hover
        if (this.selected[0] == this.hover) {
            return [this.selected[0], null];
        }
        // one date is selected and we're hover a different date, create selection from both
        else {
            return this.selected.concat([this.hover]).sort()
        }
    }

    getArrival() {
        return this.arrival;
    }

    getDeparture() {
        return this.departure;
    }

    getComputedState() {

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