import { Content } from '@/domains/content/content.entity';
import { faker } from '@faker-js/faker';

export const gen = {
  content: (partial?: Partial<Content>): Content => {
    const instance: Content = {
      id: faker.string.uuid(),
      title: faker.book.title(),
      body: faker.word.words(),
      thumbnail: faker.image.url(),
      ...partial,
    };

    return instance;
  },
};
