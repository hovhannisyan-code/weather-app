import reducer from './index';
import actionTypes from '../../action-types';
const initialState = {
  isCitiesLoading: false,
  list: []
};

describe('cities reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles loading true', () => {
    expect(reducer(initialState, { type: actionTypes.CITIES_LOADING, loading: true })).toEqual({
      ...initialState,
      isCitiesLoading: true,
    });
  });
  it('handles cities request', () => {
    const fakeCities = {
      "id": 1,
      "name": "New York"
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeCities)
      })
    );
    expect(reducer(initialState, { type: actionTypes.SET_CITIES, list: fakeCities })).toEqual({
      ...initialState,
      list: fakeCities,
    });
  });
});