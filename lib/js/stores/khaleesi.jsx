import EventEmitter from 'events';
import assign from 'object-assign';
import { normalizeYearMonth } from '../utils';

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
                start: null,
                end: null,
                startHover: null,
                endHover: null
            },
            options
        );
    }

    hover(id) {
        if (!this.useRangeSelection) {
            this.startHover = id;
            this.emit('change');
            return;
        }

        this.startHover = null;
        this.endHover = null;

        if (this.selected.length == 0) {
            this.startHover = id;
        }
        else if(this.selected.length == 1 && id < this.selected[0]) {
            this.startHover = id;
        }
        else if(this.selected.length == 1 && id > this.selected[0]) {
            this.endHover = id;
        }
        else if(this.selected.length == 2 && id != this.selected[1]) {
            this.startHover = id;
        }

        this.emit('change');
    }

    select(id) {
        if (!this.useRangeSelection) {
            this.selected = [id];
            this.start = id;
            this.emit('change');
            return;
        }

        // start and end cannot be the same day
        if (this.selected == [id]) {
            return;
        }
        // combine new date with old and sort
        else if (this.selected.length == 1) {
            this.selected.push(id);
            this.selected.sort();
        }
        // start new selection
        else {
            this.selected = [id];
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

    isStart(id) {
        return this.start == id;
    }

    isEnd(id) {
        return this.end == id;
    }

    isStartHover(id) {
        return this.startHover == id;
    }

    isEndHover(id) {
        return this.endHover == id;
    }
    
    isSelected(id) {
        var low = this.start,
            high = this.end || this.endHover;

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