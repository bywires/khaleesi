import React from 'react';
import Khaleesi from 'components/khaleesi';
import Store from 'stores/khaleesi';

var store = new Store({
    startYear: 2015,
    startMonth: 5,
    monthCount: 4
});

React.render(
    <Khaleesi store={store}/>,
    document.getElementById('attach')
);