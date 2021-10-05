import { useEffect, useState } from 'react';

export default function useCategoryAPI(URL, option) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const FIVE = 5;
      const results = await fetch(URL).then((res) => res.json());
      const firstFive = results[option].slice(0, FIVE);
      setCategories(firstFive);
    };
    getCategories();
  }, [URL, option]);

  return categories;
}
