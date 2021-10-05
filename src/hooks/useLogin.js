import { useDispatch } from 'react-redux';
import { LOGIN } from '../redux/actions/loginAction';

export default function useLogin() {
  const dispatch = useDispatch();

  const handleSubmit = (email) => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    dispatch({ type: LOGIN, payload: email });
  };

  return handleSubmit;
}
