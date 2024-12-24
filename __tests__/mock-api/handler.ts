import { setupServer } from 'msw/node';
import { contentHandlers } from './main/handlers/content-handlers';

export const handlers = [...contentHandlers];
