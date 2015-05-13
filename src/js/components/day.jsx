'use strict';

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
                <div className="decoration"></div>
                <div className="number">{this.props.day.day || ""}</div>
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

        this.props.store.setHover(data);
    },

    click() {
        if (this.props.day.enabled) {
            this.props.store.select(this.props.day.id);
        } else {
            this.props.store.unselect();
        }
    }
});