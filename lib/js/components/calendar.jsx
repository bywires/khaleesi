import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Month from './month';

export default React.createClass({
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
                    <div className="months" key={this.props.id}>
                        {this.props.months.map(month =>
                                <Month
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
