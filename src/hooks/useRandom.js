import { useEffect, useState } from 'react';

export default function useRandom(type) {
  const [random, setRandom] = useState();
  const [error, setError] = useState();
  const mealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  useEffect(() => {
    const getRandom = async () => {
      if (type === 'meal') {
        try {
          const result = await fetch(mealURL).then((response) => response.json());
          setRandom(result.meals[0]);
        } catch (err) {
          setError({
            error: err,
          });
        }
      }
      if (type === 'drink') {
        try {
          const result = await fetch(drinkURL).then((response) => response.json());
          setRandom(result.drinks[0]);
        } catch (err) {
          setError({
            error: err,
          });
        }
      }
    };
    getRandom();
  }, [type]);

  return [random, error];
}
