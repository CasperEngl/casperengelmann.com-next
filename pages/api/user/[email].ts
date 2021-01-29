import { db, User } from 'lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  const user = await db<User>('users').where('email', email).first();

  return res.status(200).json(user);
}
