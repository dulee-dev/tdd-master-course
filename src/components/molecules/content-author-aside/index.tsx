import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { layoutMx } from '@/styles/layout.styles';

interface Props {
  className?: string;
  nickname: string;
}

export const ContentAuthorAside = (props: Props) => {
  return (
    <aside className={clsx(layoutMx, props.className)} aria-label="author">
      <div className="flex justify-between items-end">
        <Image
          width={64}
          height={64}
          alt={props.nickname ?? 'avatar-placeholder'}
          src={'/globe.svg'}
        />
      </div>
      <div className="mt-4">
        <Link href="/">{props.nickname}</Link>
      </div>
    </aside>
  );
};
