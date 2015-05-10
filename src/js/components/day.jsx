var React = require('react'),
    cx = require('react/lib/cx');

module.exports = React.createClass({
    render() {
        return (
            <div
                className={cx({
                    'day': true,
                    'hover': this.props.day.hover
                })}>
                {this.props.day.number || ""}
            </div>
        );
    }
});