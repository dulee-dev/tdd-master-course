import clsx from 'clsx';
import { ContentItem } from '../content-item';

interface Props {
  className?: string;
}

export const ContentGrid = (props: Props) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6',
        props.className
      )}
    >
      {[...Array(12).keys()].map((c, i) => (
        <ContentItem key={i} />
      ))}
    </div>
  );
};
