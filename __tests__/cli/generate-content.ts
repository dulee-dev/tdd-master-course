import { gen } from '@__tests__/generator';

const main = (len: number) => {
  const contents = [...Array(len)].map(() => gen.content());

  console.log('generate content: ' + len);
  console.log(contents);
};

main(14);
