import EventEmitter from 'events';
import { normalizeYearMonth } from '../utils';

export default class Store extends EventEmitter {
    constructor(options) {
        super();

        options = options || {};

        this.startYear = options.startYear;
        this.startMonth = options.startMonth;
        this.monthCount = options.monthCount || 1;
        this.useRangeSelection = options.useRangeSelection || false;
        this.useHalfDays = options.useHalfDays || false;
        this.startHover = null;
        this.endHover = null;

        // used for single selection
        if (options.selected) {
            this.start = options.selected;
            this.end = null;
            this.selected = [options.selected];
        }
        // used for range selection
        else {
            this.start = options.start || null;
            this.end = options.end || null;
            this.selected = [];

            if (this.start) {
                this.selected.push(this.start);

                if (this.end) {
                    this.selected.push(this.end);
                }
            }
        }
    }

    hover(key) {
        if (!this.useRangeSelection) {
            this.startHover = key;
            this.emit('change');
            return;
        }

        this.startHover = null;
        this.endHover = null;

        if (this.selected.length == 0) {
            this.startHover = key;
        }
        else if(this.selected.length == 1 && key < this.selected[0]) {
            this.startHover = key;
        }
        else if(this.selected.length == 1 && key > this.selected[0]) {
            this.endHover = key;
        }
        else if(this.selected.length == 2 && key != this.selected[1]) {
            this.startHover = key;
        }

        this.emit('change');
    }

    select(key) {
        if (!this.useRangeSelection) {
            this.selected = [key];
            this.start = key;
            this.emit('change');
            return;
        }

        // start and end cannot be the same day
        if (this.selected == [key]) {
            return;
        }
        // combine new date with old and sort
        else if (this.selected.length == 1) {
            this.selected.push(key);
            this.selected.sort();
        }
        // start new selection
        else {
            this.selected = [key];
        }

        this.start = this.selected[0];
        this.end = this.selected[1] || null;

        this.emit('change');
    }

    unselect() {
        this.selected = [];
        this.start = null;
        this.end = null;
        this.emit('change');
    }

    getStart() {
        return this.start;
    }

    getEnd() {
        return this.end;
    }

    getStartHover() {
        return this.startHover;
    }

    getEndHover() {
        return this.endHover;
    }

    isStart(key) {
        return this.start == key;
    }

    isEnd(key) {
        return this.end == key;
    }

    isStartHover(key) {
        return this.startHover == key;
    }

    isEndHover(key) {
        return this.endHover == key;
    }
    
    isSelected(key) {
        var low = this.start,
            high = this.end || this.endHover;

        return low && high && (low < key && high > key)
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