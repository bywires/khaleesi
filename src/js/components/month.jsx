var React = require('react'),
    Day = require('components/day.jsx');

module.exports = React.createClass({
    render() {
        return (
            <div className="month">
                <div className="day-labels">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div className="day-label">{day}</div>)}
                </div>
                <div className="weeks">
                    {this.props.month.map(day => <Day day={day} />)}
                </div>
            </div>
        );
    }
});
