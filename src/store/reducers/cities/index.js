import actionTypes from '../../action-types';
const initialState = {
    isCitiesLoading: false,
    list: []
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.CITIES_LOADING) {
        return {
            ...state,
            isCitiesLoading: action.loading
        };
    }
    if (action.type === actionTypes.SET_CITIES) {
        return {
            ...state,
            list: action.list
        };
    }
    return { ...state };
};

export default reducer;