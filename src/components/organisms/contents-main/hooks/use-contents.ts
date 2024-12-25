import { ContentView } from '@/domains/content/type';
import { FormEventHandler, useEffect, useState } from 'react';
import { loadContents } from '../server';

export const useContents = ({
  loc,
  sort,
  q,
}: {
  loc: number;
  sort: string;
  q?: string;
}) => {
  const [contents, setContents] = useState<ContentView[]>([]);

  useEffect(() => {
    (async () => {
      const next = await loadContents({ pageNum: loc, pageTake: 12, sort, q });
      setContents(next);
    })();
  }, [loc, sort]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const next = await loadContents({ pageNum: loc, pageTake: 12, sort, q });
    setContents(next);
  };

  return { contents, onSubmit };
};
