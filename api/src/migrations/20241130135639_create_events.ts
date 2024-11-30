import type { Knex } from "knex";
import { DB_CONFIG } from "../config";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DB_CONFIG.EVENTS_TABLE, (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.specificType('dates', 'date[]');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DB_CONFIG.EVENTS_TABLE);
}
