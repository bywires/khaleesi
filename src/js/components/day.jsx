var React = require('react'),
    cx = require('react/lib/cx');

module.exports = React.createClass({
    render() {
        var number = this.props.number || "";

        return (
            <div
                className={cx({
                    'day': true,
                    'today': this.props.isToday,
                    'selected': this.props.isSelected,
                    'arrival': this.props.isArrival,
                    'departure': this.props.isDeparture
                })}>
                {number}
            </div>
        );
    }
});