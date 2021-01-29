import { NextApiRequest, NextApiResponse } from 'next';

import { session } from 'lib/session';
import { db, User } from 'lib/db';

export default async function (
  req: NextApiRequest & {
    session: any;
  },
  res: NextApiResponse
) {
  session(req, res);

  if (req.method === 'GET') {
    const users = await db<User>('users').select();

    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const users = await db<User>('users').insert(
      {
        email: req.body.email,
        password: req.body.password,
      },
      '*'
    );

    const user = users.slice().shift();

    console.log(user);

    if (!req.session.user) {
      req.session.user = {};
    }

    req.session.user.id = user.id;
    req.session.user.email = user.email;

    console.log(req.session.user);

    return res.status(201).json(user);
  }
}
