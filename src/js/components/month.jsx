var React = require('react'),
    Calendar = require('calendar').Calendar,
    Week = require('components/week.jsx');

module.exports = React.createClass({
    render() {
        var weeks = new Calendar().monthDays(this.props.year, this.props.month);

        return (
            <div className="month">
                {weeks.map(week => <Week days={week} />)}
            </div>
        );
    }
});
