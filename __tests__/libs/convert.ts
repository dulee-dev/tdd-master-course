import { Content } from '@/domains/content/content.entity';
import { User } from '@/domains/user/user.entity';
import { omit } from 'radashi';

export const convertContentToContentView = (content: Content, user: User) => {
  return {
    ...omit(content, ['authorId']),
    author: user,
  };
};
