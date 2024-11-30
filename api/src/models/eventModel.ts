import mongoose, { Schema } from "mongoose";

export interface Vote {
  date: Date[];
  people: string[];
}

export interface Event {
  name: string;
  dates?: Date[];
  votes?: Vote[];
}

const VoteSchema: Schema = new Schema({
  date: { type: String, required: true },
  people: { type: [String], required: true },
});

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  dates: { type: [String], required: false },
  votes: { type: [VoteSchema], required: false },
});

export const EventModel = mongoose.model<Event>("Event", EventSchema);
