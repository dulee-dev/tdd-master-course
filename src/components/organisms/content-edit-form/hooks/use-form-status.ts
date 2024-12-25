import { useEffect, useState } from 'react';

export const useFormStatus = ([titleStatus, imgStatus, imgIdle]: [
  boolean,
  boolean,
  boolean
]) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const ok = titleStatus && imgStatus && imgIdle;
    setStatus(ok);
  }, [titleStatus, imgStatus, imgIdle]);

  return status;
};
