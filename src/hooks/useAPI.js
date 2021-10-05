import { useEffect, useState } from 'react';

export default function useAPI(URL, option) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const TWELVE = 12;
      const results = await fetch(URL).then((res) => res.json());
      const firstTwelve = results[option].slice(0, TWELVE);
      setData(firstTwelve);
    };
    getRecipes();
  }, [URL, option]);

  return data;
}
