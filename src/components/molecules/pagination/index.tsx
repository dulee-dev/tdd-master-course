import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Pagination = (props: Props) => {
  return (
    <div className={clsx('flex justify-center items-center', props.className)}>
      {[...Array(2).keys()].map((c) => (
        <button className="mr-2 last:mr-0 p-2" key={c + 1}>
          {c + 1}
        </button>
      ))}
    </div>
  );
};
