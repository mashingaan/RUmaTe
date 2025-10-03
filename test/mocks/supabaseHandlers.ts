import { rest } from 'msw';

type Listing = {
  id: string;
  title: string;
  price: number;
  minutes_to_campus: number;
};

const mockListings: Listing[] = [
  { id: '1', title: 'Уютная комната рядом с кампусом', price: 23000, minutes_to_campus: 12 },
  { id: '2', title: 'Студия в новом ЖК', price: 28000, minutes_to_campus: 18 }
];

export const handlers = [
  rest.get('https://supabase.local/rest/v1/listings', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockListings))
  )
];
