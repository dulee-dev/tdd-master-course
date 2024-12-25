import { useEffect, useState } from 'react';

export const useFormStatus = ([titleStatus, imgIdle]: [boolean, boolean]) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const ok = titleStatus && imgIdle;
    setStatus(ok);
  }, [titleStatus, imgIdle]);

  return status;
};
