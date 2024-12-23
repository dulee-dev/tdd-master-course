'use client';

import { layoutMx } from '@/styles/layout.styles';
import { middleDot } from '@/utils/string/constant';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  className?: string;
}

export const ContentEditForm = (props: Props) => {
  return (
    <main className={clsx(layoutMx, props.className)}>
      <header className="mb-8">
        <h1
          className="text-4xl font-bold leading-normal outline-none"
          contentEditable
          suppressContentEditableWarning
        />
        <div>
          <span>{'두리'}</span>
          {` `}
          {middleDot}
          {` `}
          <span>{'2024년 12월 12일'}</span>
        </div>
      </header>
      <div
        suppressContentEditableWarning
        contentEditable
        className="outline-none"
      >
        수정
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
          />
        </div>
      </div>
      <div className="mt-12">
        <button
          className={clsx(
            'mx-auto px-4 py-2 rounded block font-bold',
            true
              ? 'bg-green-300 text-neutral-900'
              : 'bg-neutral-800 text-neutral-100'
          )}
        >
          수정하기
        </button>
      </div>
    </main>
  );
};
