import { useEffect, useState } from 'react';
import { loadCnt } from '../server';
import { list } from 'radashi';

export const usePagination = (q?: string) => {
  const [pages, setPages] = useState([1]);
  const [loc, setLoc] = useState(1);

  useEffect(() => {
    (async () => {
      const cnt = await loadCnt(q);
      const pageMax = Math.ceil((cnt + 1) / 12);
      const pagesNext = list(1, pageMax);
      setPages(pagesNext);
    })();
  }, [q]);

  const onClickPage = (i: number) => {
    setLoc(i);
  };

  return { pages, loc, onClickPage };
};
