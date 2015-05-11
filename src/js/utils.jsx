'use strict';

module.exports = {
    range(a, b) {
        if (b === undefined) {
            b = a;
            a = 0;
        }

        var i, result = [];

        for(i=a; i<b; i++) {
            result.push(i);
        }

        return result;
    },

    normalizeYearMonth(year, month) {
        var date = new Date(year, month, 1);
        return [date.getFullYear(), date.getMonth()];
    },

    firstDayOfFirstWeekOfMonth(year, month) {
        return new Date(year, month, 1 - new Date(year, month, 1).getDay());
    }
};