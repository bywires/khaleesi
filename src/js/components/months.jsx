var React = require('react'),
    Month = require('components/month.jsx');

module.exports = React.createClass({
    render() {
        return (
            <div className="months">
                {this.props.months.map(month => <Month month={month} />)}
            </div>
        );
    }
});
