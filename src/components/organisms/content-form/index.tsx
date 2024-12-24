'use client';

import { useContentEditable } from '@/hooks/use-content-editable.hook';
import { layoutMx } from '@/styles/layout.styles';
import { middleDot } from '@/utils/string/constant';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTitleStatus } from './hooks/use-title-status';
import { useFormStatus } from './hooks/use-form-status';
import { useInputFile } from '@/hooks/use-input-file.hook';
import { createContent } from './actions';

interface Props {
  className?: string;
}

export const ContentForm = (props: Props) => {
  const router = useRouter();
  const { text: title, onInput: onInputTitle } = useContentEditable('');
  const titleStatus = useTitleStatus(title);
  const { text: body, onInput: onInputBody } = useContentEditable('');
  const { filePath, onChange: onChangeFile } = useInputFile();
  const formStatus = useFormStatus([titleStatus, typeof filePath === 'string']);
  const onClick = async () => {
    if (!filePath) {
      alert('file not selected');
      return;
    }

    const result = await createContent({
      title,
      body,
      thumbnail: filePath,
    });

    if (!result) {
      alert('create content failed');
      return;
    }

    router.push(`/contents/${result.id}`);
  };

  return (
    <form className={clsx(layoutMx, props.className)}>
      <header className="mb-8">
        <div
          aria-label="제목"
          className="text-4xl font-bold leading-normal outline-none"
          contentEditable
          suppressContentEditableWarning
          onInput={onInputTitle}
        ></div>
        <div>
          <span>{'두리'}</span>
          {` `}
          {middleDot}
          {` `}
          <span>{'2024년 12월 12일'}</span>
        </div>
      </header>
      <div
        aria-label="본문"
        suppressContentEditableWarning
        contentEditable
        className="outline-none min-h-40"
        onInput={onInputBody}
      >
        본문을 입력해주세요.
      </div>
      <hr className="my-12" />
      <div className="flex flex-col items-center">
        <div>
          <label
            htmlFor="thumbnail"
            aria-label="thumbnail"
            className="cursor-pointer "
          >
            <Image
              width={600}
              height={600}
              alt={'thumbnail'}
              src="/file.svg"
              className="w-48 h-48"
            />
          </label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChangeFile}
          />
          {filePath}
        </div>
      </div>
      <div className="mt-12">
        <button
          type="button"
          className={clsx(
            'mx-auto px-4 py-2 rounded block font-bold',
            'disabled:bg-neutral-800 disabled:text-neutral-100 disabled:cursor-not-allowed',
            'bg-green-300 text-neutral-900'
          )}
          disabled={!formStatus}
          onClick={onClick}
        >
          생성하기
        </button>
      </div>
    </form>
  );
};
