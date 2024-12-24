import { setupWorker } from 'msw/browser';
import { handlers } from './handler';

export const mockInBrowser = setupWorker(...handlers);
