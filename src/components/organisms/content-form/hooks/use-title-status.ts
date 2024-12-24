import { validateTitle } from '@/domains/content/rule';
import { useEffect, useState } from 'react';

export const useTitleStatus = (title: string) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const ok = validateTitle(title);
    setStatus(ok);
  }, [title]);

  return status;
};
