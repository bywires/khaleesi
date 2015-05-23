import React from 'react';
import _ from 'react/addons';
import Day from './day';
import { keyFromDate } from '../utils';

var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

var dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render() {
        var monthKey = keyFromDate(this.props.year, this.props.month);

        return (
            <div className='month'>
                <div className='month-label'>
                    {monthNames[this.props.month]} {this.props.year}
                </div>
                <div className='day-labels'>
                    {dayLabels.map((day, index) => <div key={monthKey + '-' + index} className='day-label'>{day}</div>)}
                </div>
                <div className='weeks'>
                    {this.props.days.map(day => <Day key={day.key} store={this.props.store} day={day} />)}
                </div>
            </div>
        );
    }
});
