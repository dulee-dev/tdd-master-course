import { ContentView } from '@/domains/content/type';
import { localizeDate } from '@/libs/string-sub/localized';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
  content: ContentView;
}

export const ContentItem = (props: Props) => {
  console.log(props.content.thumbnail);

  return (
    <article className={clsx(props.className)} data-testid={'content-item'}>
      <Link href="/">
        <Image
          width={600}
          height={600}
          src={'/file.svg'}
          // src={props.content.thumbnail}
          alt={props.content.title}
        />
      </Link>
      <Link href="/">
        <h2 className="text-2xl font-semibold mb-2 inline">
          {props.content.title}
        </h2>
      </Link>
      <Link href="/">
        <div className="text-neutral-400 mb-4">{props.content.body}</div>
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="mr-2"
            width={32}
            height={32}
            src={'globe.svg'}
            alt={props.content.author.nickname}
          />
          <span>{props.content.author.nickname}</span>
        </div>
        <div>{localizeDate(props.content.createdAt)}</div>
      </div>
    </article>
  );
};
