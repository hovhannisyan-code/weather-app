import actionTypes from '../../action-types';
import { converterTemp } from '../../../helpers';
import axios from 'axios';
const GetWeatherThunk = (city) => (dispatch, getState) => {
    dispatch({ type: actionTypes.REPORTS_LOADING, loading: true });
    if (city !== 'notToggle') {
        dispatch({ type: actionTypes.TOGGLE_CITY, city: city })
    }
    const favoriteCities = getState().user.favoriteCities;
    const measurement = getState().user.measurement;
    let favoriteTemp = getState().user.favoriteTemp;
    const weatherReports = [];
    const recomendCities = new Set();
    const citiesDataList = [];
    return Promise.all(favoriteCities.map((item) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${item}&appid=793c5d61fb6d3d165240c37fb435bab0`; //todo set local .env
        return axios.get(url)
            .then(({ data }) => {
                const result = data.list;
                const firstTempVal = converterTemp(measurement, result.at(0).main.temp);
                const lastTempVal = converterTemp(measurement, result.at(-1).main.temp);
                const _data = {
                    key: item,
                    city: item,
                    tags: firstTempVal < lastTempVal
                };
                if (favoriteTemp && ((lastTempVal + lastTempVal) / 2) >= favoriteTemp) {
                    if (recomendCities.has(item)) {
                        recomendCities.delete(item)
                    } else {
                        recomendCities.add(item)
                    }
                }
                citiesDataList.push(_data)
                for (const key in result) {
                    if (Object.hasOwnProperty.call(result, key)) {
                        const element = result[key];
                        const _line = {
                            "year": element.dt_txt,
                            "value": converterTemp(measurement, element.main.temp),
                            "category": item
                        }
                        weatherReports.push(_line);

                    }
                }
                dispatch({ type: actionTypes.SET_REPORTS, reports: weatherReports });
                dispatch({ type: actionTypes.SET_RECOMEND_CITIES, recomendCities: Array.from(recomendCities) });
                dispatch({ type: actionTypes.SET_CITIES_DATA_LIST, list: citiesDataList });
                dispatch({ type: actionTypes.REPORTS_LOADING, loading: false });
            })
            .catch((e) => {
                dispatch({ type: actionTypes.REPORTS_LOADING, loading: false });
            });
    }));
};

export default GetWeatherThunk;