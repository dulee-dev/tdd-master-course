import { Content } from '@/domains/content/content.entity';
import { User } from '@/domains/user/user.entity';
import { faker } from '@faker-js/faker';
import { draw } from 'radashi';

export const gen = {
  img: () => draw(['/file.svg', '/globe.svg', '/window.svg', '/vercel.svg']),

  content: (partial?: Partial<Content>): Content => {
    const instance: Content = {
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      title: faker.book.title(),
      body: faker.word.words(),
      thumbnail: gen.img(),
      authorId: faker.string.uuid(),
      ...partial,
    };

    return instance;
  },

  user: (partial?: Partial<User>): User => {
    const instance: User = {
      id: faker.string.uuid(),
      nickname: faker.person.firstName(),
      ...partial,
    };

    return instance;
  },
};
