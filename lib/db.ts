import knex from 'knex';

export interface User {
  id: number;
  email: string;
  password: string;
}

console.log(process.env.DB_CONNECTION);

export const db = knex({
  client: 'postgres',
  connection: process.env.DB_CONNECTION,
  searchPath: ['knex', 'public'],
});
