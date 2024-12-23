import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import {
  HiChevronDown,
  HiOutlineBell,
  HiOutlineUser,
  HiSearch,
} from 'react-icons/hi';
import { layoutMx } from '@/styles/layout.styles';

interface Props {
  className?: string;
  userNickname?: string;
}

export const Header = (props: Props) => {
  return (
    <header
      className={clsx(
        layoutMx,
        // 'flex items-center justify-between h-16 border-b-fuchsia-600 border-b-2',
        'flex items-center justify-between h-16',
        props.className
      )}
    >
      <Link className="flex items-center p-2" href="/">
        <Image
          className="mr-2"
          src="/vercel.svg"
          width={16}
          height={16}
          alt="velog로고"
        />
        <span>두리님 블로그</span>
      </Link>
      <div className="flex items-center">
        <Link href="/notification" className="mr-2 p-2">
          <HiOutlineBell className="text-2xl" />
        </Link>
        <Link href="/search" className="mr-2 p-2">
          <HiSearch className="text-2xl" />
        </Link>
        {true ? (
          <button className="flex items-center p-2">
            <HiOutlineUser className="text-2xl " />
            <HiChevronDown />
          </button>
        ) : (
          <Link
            href="/search"
            className="mr-2 px-4  py-2 rounded-l-full rounded-r-full bg-neutral-800"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};
