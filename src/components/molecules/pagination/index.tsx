import clsx from 'clsx';

interface Props {
  className?: string;
  pages: number[];
  loc: number;
  onClickPage: (i: number) => any;
}

export const Pagination = (props: Props) => {
  return (
    <div
      data-testid="pagination"
      className={clsx('flex justify-center items-center', props.className)}
    >
      {props.pages.map((c) => (
        <button
          className={clsx(
            'mr-2 last:mr-0 p-2 rounded',
            c === props.loc && 'bg-neutral-800'
          )}
          key={c}
          onClick={() => {
            props.onClickPage(c);
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
};
