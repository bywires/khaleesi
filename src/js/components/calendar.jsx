'use strict';

var React = require('react'),
    ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
    Month = require('components/month.jsx');

module.exports = React.createClass({
    previous() {
        this.props.store.previousPage();
    },

    next() {
        this.props.store.nextPage();
    },

    render() {
        return (
            <div className="calendar">
                <div className="month-nav">
                    <i className="previous-button" onClick={this.previous}></i>
                    <i className="next-button" onClick={this.next}></i>
                </div>
                <ReactCSSTransitionGroup transitionName="month-iteration">
                    <div className="months">
                        {this.props.months.map(month =>
                                <Month
                                    key={month.year + "" + month.month}
                                    store={this.props.store}
                                    year={month.year}
                                    month={month.month}
                                    days={month.days} />
                        )}
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});
