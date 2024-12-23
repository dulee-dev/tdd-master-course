import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Footer = (props: Props) => {
  return (
    <footer
      className={clsx('h-48 bg-neutral-950 mt-auto', props.className)}
    ></footer>
  );
};
