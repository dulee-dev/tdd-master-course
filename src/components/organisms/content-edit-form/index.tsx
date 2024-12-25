'use client';

import { useContentEditable } from '@/hooks/use-content-editable.hook';
import { layoutMx } from '@/styles/layout.styles';
import { middleDot } from '@/utils/string/constant';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useTitleStatus } from './hooks/use-title-status';
import { useFormStatus } from './hooks/use-form-status';
import { useInputFile } from '@/hooks/use-input-file.hook';
import { updateContent } from './actions';
import { ContentView } from '@/domains/content/type';
import { localizeDate } from '@/libs/string-sub/localized';

interface Props {
  className?: string;
  content: ContentView;
}

export const ContentEditForm = (props: Props) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { text: title, onInput: onInputTitle } = useContentEditable(
    props.content.title
  );
  const titleStatus = useTitleStatus(title);
  const { text: body, onInput: onInputBody } = useContentEditable(
    props.content.body
  );
  const {
    filePath,
    view,
    idle,
    onChange: onChangeFile,
  } = useInputFile(props.content.thumbnail, props.content.thumbnail);
  const formStatus = useFormStatus([titleStatus, idle]);
  const onClick = async () => {
    if (!filePath) {
      alert('file not selected');
      return;
    }

    const result = await updateContent(
      {
        title,
        body,
        thumbnail: filePath,
      },
      params.id
    );

    if (!result) {
      alert('create content failed');
      return;
    }

    router.push(`/contents/${result.id}`);
  };

  return (
    <form role="form" className={clsx(layoutMx, props.className)}>
      <header className="mb-8">
        <div
          aria-label="제목"
          className="text-4xl font-bold leading-normal outline-none"
          contentEditable
          suppressContentEditableWarning
          onInput={onInputTitle}
        >
          {title}
        </div>
        <div>
          <span>{props.content.author.nickname}</span>
          {` `}
          {middleDot}
          {` `}
          <span>{localizeDate(props.content.createdAt)}</span>
        </div>
      </header>
      <div
        aria-label="본문"
        suppressContentEditableWarning
        contentEditable
        className="outline-none min-h-40"
        onInput={onInputBody}
      >
        {body}
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
              src={view}
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
          수정하기
        </button>
      </div>
    </form>
  );
};
