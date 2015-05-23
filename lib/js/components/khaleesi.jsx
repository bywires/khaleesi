import React from 'react';
import Calendar from './calendar';
import { range, idFromDate, normalizeYearMonth, firstDayOfFirstWeekOfMonth } from '../utils';
import _ from 'react/addons';

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
        var id = idFromDate(this.props.store.startYear, this.props.store.startMonth);

        return (
            <div className="khaleesi">
                <Calendar id={id} months={this.buildMonthsState()} store={this.props.store} />
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
            state = this.props.store;

        // always show 6 weeks (42 days) even if month is less
        var days = range(42).map(() => {
            let isInMonth = date.getMonth() == month,
                day =  isInMonth ? date.getDate() : null,
                id = isInMonth ? idFromDate(year, month, day) : 'disabled',
                props = {
                    day: day,
                    halfDay: state.useHalfDays,
                    id: id,
                    enabled: isInMonth,
                    arrival: state.isArrival(id),
                    departure: state.isDeparture(id),
                    arrivalHover: state.isArrivalHover(id),
                    departureHover: state.isDepartureHover(id),
                    selected: state.isSelected(id)
                };

            date.setDate(date.getDate() + 1);

            return props;
        });

        return {
            year: year,
            month: month,
            days: days
        };
    }
});