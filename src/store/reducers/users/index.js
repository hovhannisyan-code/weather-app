import actionTypes from '../../action-types';
const initialState = {
    isLoading: false,
    favoriteCities: [],
    favoriteTemp: null,
    measurement: 'kelvin',
    reports: [],
    citiesDataList: [],
    recomendCities: []
    
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.TOGGLE_CITY) {
        if (!action.city) {
            return {
                ...state,
                favoriteCities: [],
                citiesDataList: [],
                reports: []
            };
        }
        let cities = action.city
        if (!Array.isArray(action.city)) {
            let favoriteCities = [...state.favoriteCities];
            cities = favoriteCities.filter(item => item !== action.city);
        }
        return {
            ...state,
            favoriteCities: cities
        };
    }
    if (action.type === actionTypes.REPORTS_LOADING) {
        return {
            ...state,
            isLoading: action.loading
        };
    }
    if (action.type === actionTypes.SET_REPORTS) {
        return {
            ...state,
            reports: action.reports
        };
    }
    if (action.type === actionTypes.SET_TEMP) {
        return {
            ...state,
            favoriteTemp: action.temp
        };
    }
    if (action.type === actionTypes.SET_CITIES_DATA_LIST) {
        return {
            ...state,
            citiesDataList: action.list
        };
    }
    if (action.type === actionTypes.SET_MEASUREMENT) {
        return {
            ...state,
            measurement: action.measurement
        };
    }
    if (action.type === actionTypes.SET_RECOMEND_CITIES) {
        return {
            ...state,
            recomendCities: action.recomendCities
        };
    }
    return { ...state };
};

export default reducer;