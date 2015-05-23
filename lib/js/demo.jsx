import React from 'react';
import Khaleesi from 'components/khaleesi';
import Store from 'stores/khaleesi';


React.render(
    <Khaleesi store={new Store({
        startYear: 2015,
        startMonth: 5,
        monthCount: 4,
        useHalfDays: false,
        useRangeSelection: false,
        selected: '2015-06-20'
    })}/>,
    document.getElementById('single-selection-demo')
);

React.render(
    <Khaleesi store={new Store({
        startYear: 2015,
        startMonth: 5,
        monthCount: 4,
        useHalfDays: false,
        useRangeSelection: true,
        start: '2015-06-20',
        end: '2015-06-30'
    })}/>,
    document.getElementById('whole-day-demo')
);

React.render(
    <Khaleesi store={new Store({
        startYear: 2015,
        startMonth: 5,
        monthCount: 4,
        useHalfDays: true,
        useRangeSelection: true,
        start: '2015-06-20',
        end: '2015-06-30'
    })}/>,
    document.getElementById('half-day-demo')
);