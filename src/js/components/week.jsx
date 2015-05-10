var React = require('react'),
    Calendar = require('calendar'),
    Day = require('components/day.jsx');

module.exports = React.createClass({
    render() {
        return (
            <div className="week">
                {this.props.week.map(day => <Day day={day} />)}
            </div>
        );
    }
});
