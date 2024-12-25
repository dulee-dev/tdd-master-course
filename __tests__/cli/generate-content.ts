import { gen } from '@__tests__/generator';
import { objectToString } from '@__tests__/libs/object-to-string';
import { list } from 'radashi';

const main = (len: number) => {
  const contents = list(len - 1).map(() => gen.content());

  console.log('generate content: ' + len);
  const sample = objectToString(contents);

  console.log(sample);
};

main(1);
