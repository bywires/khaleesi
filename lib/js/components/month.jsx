import React from 'react';
import Day from './day';

var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default React.createClass({
    render() {
        return (
            <div className='month'>
                <div className='month-label'>
                    {monthNames[this.props.month]} {this.props.year}
                </div>
                <div className='day-labels'>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div className='day-label'>{day}</div>)}
                </div>
                <div className='weeks'>
                    {this.props.days.map(day => <Day store={this.props.store} day={day} />)}
                </div>
            </div>
        );
    }
});
