var React = require('react'),
    cx = require('react/lib/cx');

module.exports = React.createClass({
    render() {
        return (
            <div
                className={cx({
                    day: true,
                    hover: this.props.day.hover,
                    arrival: this.props.day.arrival,
                    departure: this.props.day.departure,
                    selected: this.props.day.selected
                })}
                onMouseOver={this.dayOver}
                onMouseOut={this.dayOut}
                onClick={this.click}>
                {this.props.day.day || ""}
            </div>
        );
    },

    dayOver() {
        this.dayHover(this.props.day.id);
    },

    dayOut() {
        this.dayHover(null);
    },

    dayHover(data) {
        if (!this.props.day.enabled) {
            return;
        }

        this.props.store.setDayHover(data);
    },

    click() {
        this.props.store.select(this.props.day.id);
    }
});