import request from "supertest";
import { app, server } from "../index";
import { DB_CONFIG } from "../config";
import db from "../database/db";

describe("API Endpoints", () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
    server.close();
  });

  beforeEach(async () => {
    await db.raw(`TRUNCATE TABLE ${DB_CONFIG.EVENTS_TABLE} CASCADE`);
    await db(DB_CONFIG.VOTES_TABLE).truncate();
  });

  it("should create an event", async () => {
    const event = {
      name: "Jake's secret party",
      dates: ["2014-01-01", "2014-01-05", "2014-01-12"],
    };
    const response = await request(app).post("/api/v1/event").send(event);
    expect(response.status).toBe(201);
    // expect(response.body).toMatchObject(event);
  });
});
