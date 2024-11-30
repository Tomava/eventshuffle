import type { Knex } from "knex";
import { DB_CONFIG } from "../config";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DB_CONFIG.VOTES_TABLE, (table) => {
    table.uuid("id").primary();
    table.uuid("event_id").references("id").inTable(DB_CONFIG.EVENTS_TABLE);
    table.string("name").notNullable();
    table.date("dates").notNullable();

    // Ensure the combination of event_id, name, and dates is unique to avoid duplicates
    table.unique(['event_id', 'name', 'dates']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DB_CONFIG.VOTES_TABLE);
}
