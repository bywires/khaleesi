import EventEmitter from 'events';
import assign from 'object-assign';
import { normalizeYearMonth } from 'utils';

export default class Store extends EventEmitter {
    constructor(options) {
        super();

        assign(
            this,
            {
                startYear: null,
                startMonth: null,
                monthCount: 1,
                selected: [],
                arrival: null,
                departure: null,
                arrivalHover: null,
                departureHover: null
            },
            options
        );
    }

    hover(id) {
        this.arrivalHover = null;
        this.departureHover = null;

        if (this.selected.length == 0) {
            this.arrivalHover = id;
        }
        else if(this.selected.length == 1 && id < this.selected[0]) {
            this.arrivalHover = id;
        }
        else if(this.selected.length == 1 && id > this.selected[0]) {
            this.departureHover = id;
        }
        else if(this.selected.length == 2 && id < this.selected[0]) {
            this.arrivalHover = id;
        }
        else if(this.selected.length == 2 && id > this.selected[1]) {
            this.departureHover = id;
        }

        this.emit('change');
    }

    select(id) {
        // arrival and departure cannot be the same day
        if (this.selected == [id]) {
            return;
        }
        // combine new date with old and sort
        else if (this.selected.length == 1) {
            this.selected.push(id);
            this.selected.sort();
        }
        // two days selected and date is later than high date, expand selection
        else if (this.selected.length == 2 && id > this.selected[1]) {
            this.selected[1] = id;
        }
        // start new selection
        else {
            this.selected = [id];
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

    getArrival() {
        return this.arrival;
    }

    getDeparture() {
        return this.departure;
    }

    getArrivalHover() {
        return this.arrivalHover;
    }

    getDepartureHover() {
        return this.departureHover;
    }

    isArrival(id) {
        return this.arrival == id;
    }

    isDeparture(id) {
        return this.departure == id;
    }

    isArrivalHover(id) {
        return this.arrivalHover == id;
    }

    isDepartureHover(id) {
        return this.departureHover == id;
    }
    
    isSelected(id) {
        var low = this.arrival,
            high = this.departure || this.departureHover;

        return low && high && (low < id && high > id)
    }

    nextPage() {
        this.movePage(this.monthCount);
    }

    previousPage() {
        this.movePage(this.monthCount * -1);
    }

    movePage(months) {
        let [year, month] = normalizeYearMonth(this.startYear, this.startMonth + months);
        this.startYear = year;
        this.startMonth = month;
        this.emit('change');
    }
}