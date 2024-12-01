import request from "supertest";
import { app, server } from "../index";
import { DB_CONFIG } from "../config";
import db from "../database/db";

const initialEvent = {
  name: "Jake's secret party",
  dates: ["2014-01-01", "2014-01-05", "2014-01-12"],
};

const initialEvent2 = {
  name: "Bowling night",
  dates: ["2014-01-02", "2014-01-06"],
};

const vote = {
  name: "John",
  votes: ["2014-01-01", "2014-01-05"],
};

const vote2 = {
  name: "NotJohn",
  votes: ["2014-01-01", "2014-01-12"],
};

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
    const response = await request(app)
      .post("/api/v1/event")
      .send(initialEvent);
    expect(response.status).toBe(201);

    // Regular expression for validating a UUID v4 format
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    expect(response.body.id).toMatch(uuidRegex);
  });

  it("should get events", async () => {
    const response = await request(app)
      .post("/api/v1/event")
      .send(initialEvent);

    const response2 = await request(app)
      .post("/api/v1/event")
      .send(initialEvent2);

    const id = response.body.id;
    const id2 = response2.body.id;

    const listedEvents = {
      events: [
        {
          id,
          name: initialEvent.name,
        },
        {
          id: id2,
          name: initialEvent2.name,
        },
      ],
    };

    const eventResponse = await request(app).get(`/api/v1/event/list`);
    expect(eventResponse.status).toBe(200);

    expect(eventResponse.body).toMatchObject(listedEvents);
  });

  it("should get an event", async () => {
    const response = await request(app)
      .post("/api/v1/event")
      .send(initialEvent);

    const id = response.body.id;

    const eventExtended = {
      ...initialEvent,
      id,
      votes: [],
    };

    const eventResponse = await request(app).get(`/api/v1/event/${id}`);
    expect(eventResponse.status).toBe(200);

    expect(eventResponse.body).toMatchObject(eventExtended);
  });

  it("should add a vote", async () => {
    // Add event
    const response = await request(app)
      .post("/api/v1/event")
      .send(initialEvent);

    const id = response.body.id;

    // Add vote
    const voteResponse = await request(app)
      .post(`/api/v1/event/${id}/vote`)
      .send(vote);

    expect(voteResponse.status).toBe(201);

    const eventExtended = {
      ...initialEvent,
      id,
      votes: [
        {
          date: vote.votes[0],
          people: [vote.name]
        },
        {
          date: vote.votes[1],
          people: [vote.name]
        }
      ],
    };


    const eventResponse = await request(app).get(`/api/v1/event/${id}`);
    expect(eventResponse.status).toBe(200);

    expect(eventResponse.body).toMatchObject(eventExtended);
  });

  it("should get a result", async () => {
    // Add event
    const response = await request(app)
      .post("/api/v1/event")
      .send(initialEvent);

    const id = response.body.id;

    // Add votes
    await request(app)
      .post(`/api/v1/event/${id}/vote`)
      .send(vote);
    await request(app)
    .post(`/api/v1/event/${id}/vote`)
    .send(vote2);

    const eventExtended = {
      ...initialEvent,
      id,
      suitableDates: [
        {
          date: vote.votes[0],
          people: [vote.name, vote2.name]
        },
      ],
    };

    const eventResponse = await request(app).get(`/api/v1/event/${id}/results`);
    expect(eventResponse.status).toBe(200);

    expect(eventResponse.body).toMatchObject(eventExtended);
  });
});
