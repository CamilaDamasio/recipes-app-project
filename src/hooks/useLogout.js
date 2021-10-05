import { useDispatch } from 'react-redux';
import { LOGOUT } from '../redux/actions/loginAction';

export default function useLogout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
  };

  return handleLogout;
}
