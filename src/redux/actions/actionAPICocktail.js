import fetchAPICocktail from '../../utils/fetchAPICocktail';

export const GET_API_COCKTAIL = 'GET_API_COCKTAIL';
export const GET_API_COCKTAIL_SUCESS = 'GET_API_COCKTAIL_SUCESS';
export const GET_API_COCKTAIL_ERROR = 'GET_API_COCKTAIL_ERROR';

export const getAPICocktail = () => ({
  type: GET_API_COCKTAIL,
});

export const getAPICocktailSucess = (payload) => ({
  type: GET_API_COCKTAIL_SUCESS,
  payload,
});

export const getAPICocktailError = (error) => ({
  type: GET_API_COCKTAIL_ERROR,
  payload: error,
});

export const getCocktail = (search = '', type = 'Nome') => async (dispatch) => {
  dispatch(getAPICocktail());
  try {
    const fetchAPI = await fetchAPICocktail(search, type);
    dispatch(getAPICocktailSucess(fetchAPI));
  } catch (error) {
    dispatch(getAPICocktailError(error));
  }
};
