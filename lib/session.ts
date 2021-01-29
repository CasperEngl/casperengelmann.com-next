import { NextApiRequest, NextApiResponse } from 'next';
import cookieSession from 'cookie-session';

const _session = cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000,
});

export function session(req: any, res: any) {
  _session(req, res, () => {});
}
