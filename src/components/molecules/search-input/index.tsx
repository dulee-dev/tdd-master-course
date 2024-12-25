import clsx from 'clsx';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { HiSearch } from 'react-icons/hi';

interface Props {
  className?: string;
  search: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const Search = (props: Props) => {
  return (
    <form
      className={clsx(
        'flex items-center px-4 py-1 border-b-2',
        props.className
      )}
      onSubmit={props.onSubmit}
    >
      <input
        aria-label="search"
        type="text"
        className="bg-transparent outline-none flex-1"
        value={props.search}
        onChange={props.onChange}
      />
      <button aria-label="submit-search">
        <HiSearch className="text-2xl" />
      </button>
    </form>
  );
};
