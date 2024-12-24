import { FormEventHandler, useState } from 'react';

export const useContentEditable = (init: string) => {
  const [text, setText] = useState(init);

  const onInput: FormEventHandler<HTMLDivElement> = (ev) => {
    setText(ev.currentTarget.innerText);
  };

  return {
    text,
    onInput,
  };
};
