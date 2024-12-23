import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { layoutMx } from '@/styles/layout.styles';

interface Props {
  className?: string;
}

export const ContentAuthorAside = (props: Props) => {
  return (
    <aside className={clsx(layoutMx, props.className)}>
      <div className="flex justify-between items-end">
        <Image width={64} height={64} alt={'username'} src={'/globe.svg'} />
      </div>
      <div className="mt-4">
        <Link href="/">username</Link>
      </div>
    </aside>
  );
};
