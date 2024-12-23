import clsx from 'clsx';
import { HiSearch } from 'react-icons/hi';

interface Props {
  className?: string;
}

export const Search = (props: Props) => {
  return (
    <form
      className={clsx(
        'flex items-center px-4 py-1 border-b-2',
        props.className
      )}
    >
      <input type="text" className="bg-transparent outline-none flex-1" />
      <button aria-label="search">
        <HiSearch className="text-2xl" />
      </button>
    </form>
  );
};
