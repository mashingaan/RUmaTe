import { setupServer } from 'msw/node';
import { handlers } from './supabaseHandlers';

export const server = setupServer(...handlers);
