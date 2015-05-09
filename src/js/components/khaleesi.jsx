var React = require('react'),
    Month = require('components/month.jsx');

module.exports = React.createClass({
    render() {
        var year = 2015, month = 5;

        return (
            <div className="calendact">
                <Month year={year} month={month} />
            </div>
        );
    }
});
