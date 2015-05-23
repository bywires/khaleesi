export function range(a, b) {
    if (b === undefined) {
        b = a;
        a = 0;
    }

    var i, result = [];

    for(i=a; i<b; i++) {
        result.push(i);
    }

    return result;
}

export function normalizeYearMonth(year, month) {
    var date = new Date(year, month, 1);
    return [date.getFullYear(), date.getMonth()];
}

export function firstDayOfFirstWeekOfMonth(year, month) {
    return new Date(year, month, 1 - new Date(year, month, 1).getDay());
}

export function keyFromDate() {
    var length = [0, 4, 7, 10][arguments.length],
        date = new Date(arguments[0] || 0, arguments[1] || 0, arguments[2] || 1);
    return date.toISOString().substring(0, length);
}