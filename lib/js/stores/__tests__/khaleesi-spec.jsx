import Store from '../khaleesi';

describe('A Khaleesi store', () => {
    var store;

    beforeEach(() => {
        store = new Store();
    });

    it('treats the first selection as start', () => {
        store.select('2015-01-01');
        expect(store.getStart()).toEqual('2015-01-01');
    });

    it('treats the second selection as end if after start', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        expect(store.getStart()).toEqual('2015-01-01');
        expect(store.getEnd()).toEqual('2015-01-08');
    });

    it('treats the second selection as start if before start', () => {
        store.select('2015-01-08');
        store.select('2015-01-01');
        expect(store.getStart()).toEqual('2015-01-01');
        expect(store.getEnd()).toEqual('2015-01-08');
    });

    it('treats the third selection as start if before start', () => {
        store.select('2015-01-04');
        store.select('2015-01-08');
        store.select('2015-01-01');
        expect(store.getStart()).toEqual('2015-01-01');
        expect(store.getEnd()).toBeNull();
    });

    it('treats the third selection as start if after end', () => {
        store.select('2015-01-01');
        store.select('2015-01-04');
        store.select('2015-01-08');
        expect(store.getStart()).toEqual('2015-01-08');
        expect(store.getEnd()).toBeNull();
    });

    it('treats the third selection as start if between start end', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        store.select('2015-01-04');
        expect(store.getStart()).toEqual('2015-01-04');
        expect(store.getEnd()).toBeNull();
    });

    it('treats the first hover as start', () => {
        store.hover('2015-01-01');
        expect(store.getStartHover()).toEqual('2015-01-01');
    });

    it('treats hover after start as end', () => {
        store.select('2015-01-01');
        store.hover('2015-01-08');
        expect(store.getEndHover()).toEqual('2015-01-08');
    });

    it('treats hover before start as start', () => {
        store.select('2015-01-08');
        store.hover('2015-01-01');
        expect(store.getStartHover()).toEqual('2015-01-01');
    });

    it('treats hover after end as start', () => {
        store.select('2015-01-01');
        store.select('2015-01-04');
        store.hover('2015-01-08');
        expect(store.getStartHover()).toEqual('2015-01-08');
    });

    it('treats hover between start and end as start', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        store.hover('2015-01-04');
        expect(store.getStartHover()).toEqual('2015-01-04');
        expect(store.getEndHover()).toBeNull();
    });

    it('ignores hover over start', () => {
        store.select('2015-01-01');
        store.hover('2015-01-01');
        expect(store.getStartHover()).toBeNull();
        expect(store.getEndHover()).toBeNull();
    });

    it('ignores hover over end', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        store.hover('2015-01-08');
        expect(store.getStartHover()).toBeNull();
        expect(store.getEndHover()).toBeNull();
    });

    it('marks dates between start and end as selected', () => {
        store.select('2015-01-01');
        store.select('2015-01-08');
        store.hover('2015-01-12'); // should be ignored
        expect(store.isSelected('2015-01-04')).toBeTruthy();
        expect(store.isSelected('2015-01-01')).toBeFalsy();
        expect(store.isSelected('2015-01-08')).toBeFalsy();
    });

    it('marks dates between start and end hover as selected when end is not selected', () => {
        store.select('2015-01-01');
        store.hover('2015-01-08');
        expect(store.isSelected('2015-01-04')).toBeTruthy();
        expect(store.isSelected('2015-01-01')).toBeFalsy();
        expect(store.isSelected('2015-01-08')).toBeFalsy();
    });
});