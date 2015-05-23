import React from 'react';
import Month from './month';
import _ from 'react/addons';

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],

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
                <div className="months">
                    {this.props.months.map(month =>
                            <Month
                                store={this.props.store}
                                year={month.year}
                                month={month.month}
                                days={month.days} />
                    )}
                </div>
            </div>
        );
    }
});
