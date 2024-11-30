import { DB_CONFIG } from "./config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig = {
  development: {
    client: "postgresql",
    connection: {
      host: DB_CONFIG.DB_HOST,
      port: DB_CONFIG.DB_PORT,
      database: DB_CONFIG.DB,
      user: DB_CONFIG.DB_USER,
      password: DB_CONFIG.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default knexConfig;
