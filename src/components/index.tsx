import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Component = (props: Props) => {
  const onClick = async () => {
    console.log('hi');
    const res = await fetch('http://localhost:4001/contents');
    const data = await res.json();
    console.log(data);
  };

  return <button onClick={onClick}>button</button>;
};
