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
            [low, high] = this.props.store.getSelected().concat([hover]).slice(0, 2).sort();

        // always show 6 weeks (42 days) even if month is less
        var days = utils.range(42).map(i => {
            let day = date.getMonth() == month ? date.getDate() : null,
                id = date.getMonth() == month ? date.toISOString().substring(0, 10) : 'disabled',
                props = {
                    day: day,
                    id: id,
                    enabled: date.getMonth() == month,
                    hover: hover == id,
                    arrival: arrival == id,
                    departure: departure == id,
                    selected: low && (low < id && high > id)
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