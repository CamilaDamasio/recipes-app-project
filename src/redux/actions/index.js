export {
  GET_API_COCKTAIL,
  GET_API_COCKTAIL_SUCESS,
  GET_API_COCKTAIL_ERROR,
  getCocktail,
} from './actionAPICocktail';

export {
  GET_API_MEAL,
  GET_API_MEAL_SUCESS,
  GET_API_MEAL_ERROR,
  getMeal,
} from './actionAPIMeal';

export const SWITCH_SEARCH = 'SWITCH_SEARCH';
export const switchSearch = (search, searchType) => ({
  type: SWITCH_SEARCH,
  payload: {
    search,
    searchType,
  },
});
