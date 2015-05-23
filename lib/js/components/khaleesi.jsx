import React from 'react';
import _ from 'react/addons';
import Calendar from './calendar';
import { range, keyFromDate, normalizeYearMonth, firstDayOfFirstWeekOfMonth } from '../utils';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState() {
        return this.props.store;
    },

    componentDidMount: function() {
        this.props.store.on('change', this.onChange);
    },

    componentWillUnmount: function() {
        this.props.store.removeListener('change', this.onChange);
    },

    onChange(data) {
        this.setState(this.props.store);
    },

    render() {
        return (
            <div className="khaleesi">
                <Calendar months={this.buildMonthsState()} store={this.props.store} />
            </div>
        );
    },

    buildMonthsState() {
        return range(this.state.monthCount)
            .map(offset => this.buildMonthState(
                this.state.startYear,
                this.state.startMonth + offset
            ));
    },

    buildMonthState(year, month) {
        [year, month] = normalizeYearMonth(year, month);

        var date = firstDayOfFirstWeekOfMonth(year, month),
            state = this.props.store,
            monthKey = keyFromDate(year, month);

        // always show 6 weeks (42 days) even if month is less
        var days = range(42).map(() => {
            let isInMonth = date.getMonth() == month,
                day =  isInMonth ? date.getDate() : null,
                key = (isInMonth ? '' : monthKey + '-disabled-') + keyFromDate(year, month, date.getDate()),
                props = {
                    day: day,
                    halfDay: state.useHalfDays,
                    key: key,
                    enabled: isInMonth,
                    start: state.isStart(key),
                    end: state.isEnd(key),
                    startHover: state.isStartHover(key),
                    endHover: state.isEndHover(key),
                    selected: state.isSelected(key)
                };

            date.setDate(date.getDate() + 1);

            return props;
        });

        return {
            key: monthKey,
            year: year,
            month: month,
            days: days
        };
    }
});