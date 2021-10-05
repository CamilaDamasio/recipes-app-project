import fetchAPIMeal from '../../utils/fetchAPiMeal';

export const GET_API_MEAL = 'GET_API_MEAL';
export const GET_API_MEAL_SUCESS = 'GET_API_MEAL_SUCESS';
export const GET_API_MEAL_ERROR = 'GET_API_MEAL_ERROR';
export const SWITCH_SEARCH = 'SWITCH_SEARCH';

export const getAPIMeal = () => ({
  type: GET_API_MEAL,
});

export const getAPIMealSucess = (payload) => ({
  type: GET_API_MEAL_SUCESS,
  payload,
});

export const getAPIMealError = (error) => ({
  type: GET_API_MEAL_ERROR,
  payload: error,
});

export const switchSearch = (search, searchType) => ({
  type: SWITCH_SEARCH,
  payload: {
    search,
    searchType,
  },
});

export const getMeal = (search = '', type = 'Nome') => async (dispatch) => {
  dispatch(getAPIMeal());
  try {
    const fetchAPI = await fetchAPIMeal(search, type);
    dispatch(getAPIMealSucess(fetchAPI));
  } catch (error) {
    dispatch(getAPIMealError(error));
  }
};
