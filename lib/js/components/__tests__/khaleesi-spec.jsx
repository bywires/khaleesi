import $ from 'jquery';
import Khaleesi from '../khaleesi';
import Store from '../../stores/khaleesi';
import React from 'react/addons';

var TestUtils = React.addons.TestUtils;

describe('A Khaleesi component', () => {
    var store, component;

    beforeEach(() => {
        store = new Store({
            startYear: 2015,
            startMonth: 5,
            monthCount: 4
        });

        component = TestUtils.renderIntoDocument(
            <Khaleesi store={store} />
        );
    });

    it('can be rendered', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(component, 'khaleesi')).toBeTruthy();
    });
});