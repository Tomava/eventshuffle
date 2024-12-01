import knex from "knex";
import knexConfig from "../knexfile";
import { CONFIG } from "../config";

const db = knex(CONFIG.ENVIRONMENT === "test" ? knexConfig.test : knexConfig.development);

export default db;
