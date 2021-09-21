import actionTypes from '../../action-types';
import { http } from '../../../helpers';

const CitiesLoadThunk = () => {
    return async (dispatch, getState) => {
        dispatch({type: actionTypes.CITIES_LOADING, loading: true});
        try {
            const response = await http.get('/cities');
            const cities = response.data;
            dispatch({type: actionTypes.SET_CITIES, list: cities});
            dispatch({type: actionTypes.CITIES_LOADING, loading: false});
        } catch (error) {
            console.log(error)
            dispatch({type: actionTypes.CITIES_LOADING, loading: false});
        }
    }
}
export default CitiesLoadThunk;