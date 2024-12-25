import { uploadImageAction } from '@/server/upload-file';
import { ChangeEventHandler, useState } from 'react';

export const useInputFile = (placeholder: string, init?: string) => {
  const [filePath, setFilePath] = useState<string | undefined>(init);
  const [view, setView] = useState<string>(placeholder);
  const [idle, setIdle] = useState(true);
  const onChange: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    const readName = ev.target.files ? ev.target.files[0].name : undefined;
    if (readName) {
      setIdle(false);

      const result = await uploadImageAction(readName);
      setFilePath(result);
      setView(result);

      setIdle(true);
      return;
    }
  };

  return {
    filePath,
    view,
    idle,
    onChange,
  };
};
