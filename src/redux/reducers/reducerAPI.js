import {
  GET_API_COCKTAIL,
  GET_API_COCKTAIL_SUCESS,
  GET_API_COCKTAIL_ERROR,
  GET_API_MEAL,
  GET_API_MEAL_SUCESS,
  GET_API_MEAL_ERROR,
  SWITCH_SEARCH,
} from '../actions';
import { LOADING } from '../actions/loading';

const INITIAL_STATE = {
  cocktails: [],
  meals: [],
  search: '',
  searchType: 'Nome',
  error: null,
  loading: true,
};

const recipes = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
  case GET_API_COCKTAIL:
    return { ...state, loading: true };

  case LOADING:
    return { ...state, loading: action.payload };

  case GET_API_MEAL:
    return { ...state, loading: true };

  case GET_API_COCKTAIL_SUCESS:
    return { ...state, error: null, cocktails: payload, loading: false };

  case GET_API_MEAL_SUCESS:
    return { ...state, error: null, meals: payload, loading: false };

  case GET_API_COCKTAIL_ERROR:
    return { ...state, error: payload, loading: false };

  case GET_API_MEAL_ERROR:
    return { ...state, error: payload, loading: false };

  case SWITCH_SEARCH:
    return {
      ...state,
      search: action.payload.search,
      searchType: action.payload.searchType,
    };

  default:
    return state;
  }
};

export default recipes;
