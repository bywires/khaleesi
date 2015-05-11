var React = require('react'),
    Months = require('components/months.jsx');

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
                <Months months={this.buildMonthsState()} store={this.props.store} />
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
        var date = this.firstDayOfFirstWeekOfMonth(year, month),
            hover = this.props.store.getDayHover(),
            arrival = this.props.store.getArrival(),
            departure = this.props.store.getDeparture();

        // always show 6 weeks (42 days) even if month is less
        var days = range(42).map(i => {
            var day = date.getMonth() == month ? date.getDate() : null,
                id = date.getMonth() == month ? date.toISOString().substring(0, 10) : 'disabled',
                props = {
                    year: year,
                    month: month,
                    day: day,
                    id: id,
                    enabled: date.getMonth() == month,
                    hover: hover == id,
                    arrival: arrival == id,
                    departure: departure == id,
                    selected: arrival && (arrival < id && (departure || hover) > id)
                };

            date.setDate(date.getDate() + 1);

            return props;
        });

        return {
            year: year,
            month: month,
            days: days
        };
    },

    firstDayOfFirstWeekOfMonth(year, month) {
        return new Date(year, month, 1 - new Date(year, month, 1).getDay());
    }
});

function range(a, b) {
    if (b === undefined) {
        b = a;
        a = 0;
    }

    var i, result = [];

    for(i=a; i<b; i++) {
        result.push(i);
    }

    return result;
}