import { useEffect, useState } from 'react';

export const useFormStatus = ([titleStatus, imgStatus]: [boolean, boolean]) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const ok = titleStatus && imgStatus;
    setStatus(ok);
  }, [titleStatus, imgStatus]);

  return status;
};
