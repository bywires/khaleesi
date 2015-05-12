'use strict';

var React = require('react'),
    Calendar = require('components/calendar.jsx'),
    utils = require('utils');

module.exports = React.createClass({
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
        return utils.range(this.state.monthCount)
            .map(offset => this.buildMonthState(
                this.state.startYear,
                this.state.startMonth + offset
            ));
    },

    buildMonthState(year, month) {
        [year, month] = utils.normalizeYearMonth(year, month);

        var date = utils.firstDayOfFirstWeekOfMonth(year, month),
            hover = this.props.store.getDayHover(),
            arrival = this.props.store.getArrival(),
            departure = this.props.store.getDeparture(),
            [low, high] = this.props.store.getSelected();

        // always show 6 weeks (42 days) even if month is less
        var days = utils.range(42).map(i => {
            let isInMonth = date.getMonth() == month,
                day =  isInMonth ? date.getDate() : null,
                id = isInMonth ? date.toISOString().substring(0, 10) : 'disabled',
                props = {
                    day: day,
                    id: id,
                    enabled: isInMonth,
                    arrival: low == id,
                    departure: high == id,
                    selected: low && high && (low < id && high > id)
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