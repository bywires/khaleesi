'use strict';

var React = require('react'),
    Khaleesi = require('components/khaleesi.jsx'),
    Store = require('stores/khaleesi');

require("app.less");

var store = new Store({
    startYear: 2015,
    startMonth: 5,
    monthCount: 4
});

React.render(
    <Khaleesi store={store}/>,
    document.getElementById('attach')
);