'use client';

import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Test = (props: Props) => {
  const onClick = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`);
    const data = await res.json();
    console.log('in client side ok', data);
  };

  return (
    <button onClick={onClick} className={clsx(props.className)}>
      asdasdsad
    </button>
  );
};
