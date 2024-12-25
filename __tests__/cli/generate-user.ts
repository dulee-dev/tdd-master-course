import { gen } from '@__tests__/generator';
import { objectToString } from '@__tests__/libs/object-to-string';
import { list } from 'radashi';

const main = (len: number) => {
  const users = list(len - 1).map(() =>
    gen.user({
      nickname: 'dulee',
    })
  );

  console.log('generate user: ' + len);
  const sample = objectToString(users);

  console.log(sample);
};

main(1);
