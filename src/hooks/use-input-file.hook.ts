import { ChangeEventHandler, useState } from 'react';

export const useInputFile = () => {
  const [filePath, setFilePath] = useState<string | undefined>(undefined);
  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const next = ev.target.files ? ev.target.files[0].name : undefined;
    setFilePath(next);
  };

  return {
    filePath,
    onChange,
  };
};
