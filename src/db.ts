import knex from 'knex';

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const db = knex({
    client: 'mysql',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    },
});

export default db;
