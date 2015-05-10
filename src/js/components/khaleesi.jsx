var React = require('react'),
    Months = require('components/months.jsx');

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

module.exports = React.createClass({
    getInitialState() {
        return {
            startYear: 2015,
            startMonth: 5,
            monthCount: 4,
            hover: null
        };
    },

    render() {
        console.log(this.buildMonthsState());

        return (
            <div className="khaleesi">
                <Months months={this.buildMonthsState()} />
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
        var date = this.firstDayOfFirstWeekOfMonth(year, month);

        // always show 6 weeks (42 days) even if month is less
        return range(42).map(i => {
            var day = {
                number: date.getMonth() == month ? date.getDate() : 0
            };

            date.setDate(date.getDate() + 1);

            return day;
        });
    },

    firstDayOfFirstWeekOfMonth(year, month) {
        return new Date(year, month, 1 - new Date(year, month, 1).getDay());
    }
});
