import { ContentView } from '@/domains/content/type';
import { localizeDate } from '@/libs/string-sub/localized';
import { layoutMx } from '@/styles/layout.styles';
import { middleDot } from '@/utils/string/constant';
import clsx from 'clsx';
import { ContentDetailActionBtns } from '../content-detail-action-btns';

interface Props {
  className?: string;
  content: ContentView;
  auth: boolean;
}

export const ContentDetailMain = (props: Props) => {
  return (
    <main className={clsx(layoutMx, props.className)}>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-normal">
          {props.content.title}
        </h1>
        <div>
          <span>{props.content.author.nickname}</span>
          {` `}
          {middleDot}
          {` `}
          <span>{localizeDate(props.content.createdAt)}</span>
        </div>
        {props.auth && <ContentDetailActionBtns />}
      </header>
      <div>{props.content.body}</div>
    </main>
  );
};
