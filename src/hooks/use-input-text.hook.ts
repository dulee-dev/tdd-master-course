import { ChangeEventHandler, useState } from 'react';

export const useInputText = (init: string) => {
  const [value, setValue] = useState(init);

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setValue(ev.target.value);
  };

  return {
    value,
    onChange,
  };
};
