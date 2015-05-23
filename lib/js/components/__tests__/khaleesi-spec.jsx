import Khaleesi from '../khaleesi';
import Store from '../../stores/khaleesi';
import React from 'react/addons';

var TestUtils = React.addons.TestUtils;

describe('A Khaleesi component', () => {
    var store, component;

    function find(cls) {
        return TestUtils.scryRenderedDOMComponentsWithClass(component, cls);
    }

    function click(node) {
        return TestUtils.Simulate.click(node);
    }

    function hasClass(node, cls) {
        return node.getDOMNode().classList.contains(cls);
    }

    describe('in single selection mode', () => {
        beforeEach(() => {
            store = new Store({
                startYear: 2015,
                startMonth: 5,
                monthCount: 4,
                useRangeSelection: false
            });

            component = TestUtils.renderIntoDocument(
                <Khaleesi store={store} />
            );
        });

        it('can be rendered', () => {
            expect(find('khaleesi').length).toBeTruthy();
        });

        it('shows a configured number of months', () => {
            expect(find('month').length).toEqual(4);
        });

        it('updates the store when a day is clicked', () => {
            click(find('day')[20]);
            expect(store.getStart()).toEqual('2015-06-20');
        });

        it('updates the store when two days are clicked', () => {
            var days = find('day');
            click(days[20]);
            click(days[30]);
            expect(store.getStart()).toEqual('2015-06-30');
            expect(store.getEnd()).toBeNull();
            days.slice(21, 30).forEach(day => expect(hasClass(day, 'selected')).toBeFalsy());
        });
    });

    describe('in range selection mode', () => {
        beforeEach(() => {
            store = new Store({
                startYear: 2015,
                startMonth: 5,
                monthCount: 4,
                useRangeSelection: true
            });

            component = TestUtils.renderIntoDocument(
                <Khaleesi store={store} />
            );
        });

        it('updates the store when a day is clicked', () => {
            click(find('day')[20]);
            expect(store.getStart()).toEqual('2015-06-20');
        });

        it('updates the store when two days are clicked', () => {
            var days = find('day');
            click(days[20]);
            click(days[30]);
            expect(store.getStart()).toEqual('2015-06-20');
            expect(store.getEnd()).toEqual('2015-06-30');
            days.slice(21, 30).forEach(day => expect(hasClass(day, 'selected')).toBeTruthy());
        });
    });
});