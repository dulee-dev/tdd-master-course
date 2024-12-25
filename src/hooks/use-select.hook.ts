import { ChangeEventHandler, useState } from 'react';

export const useSelect = (init: string) => {
  const [value, setValue] = useState(init);

  const onChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    setValue(ev.target.value);
  };

  return {
    value,
    onChange,
  };
};
