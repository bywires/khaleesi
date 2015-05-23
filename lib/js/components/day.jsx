import React from 'react';
import _ from 'react/addons';
import cx from 'classnames';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render() {
        return (
            <div
                className={cx({
                    day: true,
                    'whole-day': !this.props.day.halfDay,
                    'half-day': this.props.day.halfDay,
                    start: this.props.day.start,
                    end: this.props.day.end,
                    selected: this.props.day.selected,
                    'start-hover': this.props.day.startHover,
                    'end-hover': this.props.day.endHover
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
        this.dayHover(this.props.day.key);
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
            this.props.store.select(this.props.day.key);
        } else {
            this.props.store.unselect();
        }
    }
});