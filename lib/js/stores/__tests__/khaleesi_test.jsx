jest.autoMockOff();
jest.dontMock('../khaleesi');

var Store = require('../khaleesi');

describe('A Khaleesi store', () => {
    var store;

    beforeEach(() => {
        store = new Store();
    });

    it('treats the first selection as arrival', () => {
        store.select('2015-01-01');
        expect(store.getArrival()).toEqual('2015-01-01');
    });

    it('treats the second selection as departure if after arrival', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        expect(store.getArrival()).toEqual('2015-01-01');
        expect(store.getDeparture()).toEqual('2015-01-08');
    });

    it('treats the second selection as arrival if before arrival', () => {
        store.select('2015-01-08');
        store.select('2015-01-01');
        expect(store.getArrival()).toEqual('2015-01-01');
        expect(store.getDeparture()).toEqual('2015-01-08');
    });

    it('treats the third selection as arrival if before arrival and clears departure', () => {
        store.select('2015-01-04');
        store.select('2015-01-08');
        store.select('2015-01-01');
        expect(store.getArrival()).toEqual('2015-01-01');
        expect(store.getDeparture()).toBeNull();
    });

    it('treats the third selection as departure if after departure and maintains arrival', () => {
        store.select('2015-01-01');
        store.select('2015-01-04');
        store.select('2015-01-08');
        expect(store.getArrival()).toEqual('2015-01-01');
        expect(store.getDeparture()).toEqual('2015-01-08');
    });

    it('treats the first hover as arrival', () => {
        store.hover('2015-01-01');
        expect(store.getArrivalHover()).toEqual('2015-01-01');
    });

    it('treats hover after arrival as departure', () => {
        store.select('2015-01-01');
        store.hover('2015-01-08');
        expect(store.getDepartureHover()).toEqual('2015-01-08');
    });

    it('treats hover before arrival as arrival', () => {
        store.select('2015-01-08');
        store.hover('2015-01-01');
        expect(store.getArrivalHover()).toEqual('2015-01-01');
    });

    it('treats hover after departure as departure', () => {
        store.select('2015-01-01');
        store.select('2015-01-04');
        store.hover('2015-01-08');
        expect(store.getDepartureHover()).toEqual('2015-01-08');
    });

    it('ignores hover between arrival and departure', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        store.hover('2015-01-04');
        expect(store.getArrivalHover()).toBeNull();
        expect(store.getDepartureHover()).toBeNull();
    });

    it('ignores hover over arrival', () => {
        store.select('2015-01-01');
        store.hover('2015-01-01');
        expect(store.getArrivalHover()).toBeNull();
        expect(store.getDepartureHover()).toBeNull();
    });

    it('ignores hover over departure', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        store.hover('2015-01-08');
        expect(store.getArrivalHover()).toBeNull();
        expect(store.getDepartureHover()).toBeNull();
    });

    it('marks dates between arrival and departure as selected', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        store.hover('2015-01-12'); // should be ignored
        expect(store.isSelected('2015-01-04')).toBeTruthy();
        expect(store.isSelected('2015-01-01')).toBeFalsy();
        expect(store.isSelected('2015-01-08')).toBeFalsy();
    });

    it('marks dates between arrival and departure hover as selected when departure is not selected', () => {
        store.select('2015-01-01');
        store.hover('2015-01-08');
        expect(store.isSelected('2015-01-04')).toBeTruthy();
        expect(store.isSelected('2015-01-01')).toBeFalsy();
        expect(store.isSelected('2015-01-08')).toBeFalsy();
    });
});