import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/actions/loading';

export default function useIngredients(type) {
  const [ingredients, setIngredients] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const TWELVE = 12;

    const URL = `https://www.the${type}db.com/api/json/v1/1/list.php?i=list`;
    const types = type === 'meal' ? `${type}s` : 'drinks';
    const getIngredientsAPI = async () => {
      dispatch(setLoading(true));
      const request = await fetch(URL).then((r) => r.json());
      setIngredients(request[types].slice(0, TWELVE));
      dispatch(setLoading(false));
    };
    getIngredientsAPI();
  }, [type, dispatch]);

  return ingredients;
}
