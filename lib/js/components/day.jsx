import React from 'react';
import cx from 'react/lib/cx';

export default React.createClass({
    render() {
        return (
            <div
                className={cx({
                    day: true,
                    arrival: this.props.day.arrival,
                    departure: this.props.day.departure,
                    selected: this.props.day.selected,
                    'arrival-hover': this.props.day.arrivalHover,
                    'departure-hover': this.props.day.departureHover
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

        this.props.store.hover(data);
    },

    click() {
        if (this.props.day.enabled) {
            this.props.store.select(this.props.day.id);
        } else {
            this.props.store.unselect();
        }
    }
});