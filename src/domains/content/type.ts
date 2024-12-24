import { Content } from './content.entity';

export interface ContentProto extends Omit<Content, 'id'> {}
