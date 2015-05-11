var React = require('react'),
    Month = require('components/month.jsx');

module.exports = React.createClass({
    render() {
        return (
            <div className="months">
                {this.props.months.map(month =>
                        <Month
                            store={this.props.store}
                            year={month.year}
                            month={month.month}
                            days={month.days} />
                )}
            </div>
        );
    }
});
