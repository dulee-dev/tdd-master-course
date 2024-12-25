import { User } from '../user/user.entity';
import { Content } from './content.entity';

export interface ContentPartial
  extends Omit<Content, 'id' | 'createdAt' | 'authorId'> {}

export interface ContentView extends Omit<Content, 'authorId'> {
  author: User;
}
