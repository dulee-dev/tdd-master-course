import clsx from 'clsx';
import { ContentItem } from '../content-item';
import { ContentView } from '@/domains/content/type';

interface Props {
  className?: string;
  contents: ContentView[];
}

export const ContentGrid = (props: Props) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6',
        props.className
      )}
    >
      {props.contents.map((c, i) => (
        <ContentItem key={i} content={c} />
      ))}
    </div>
  );
};
