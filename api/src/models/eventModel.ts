import mongoose, { Schema } from "mongoose";

export interface Vote {
  date: Date[];
  people: string[];
}

export interface Event {
  id: string;
  name: string;
  dates?: Date[];
  votes?: Vote[];
}

const VoteSchema: Schema = new Schema({
  date: { type: String, required: true },
  people: { type: [String], required: true },
});

const EventSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    dates: { type: [String], required: false },
    votes: { type: [VoteSchema], required: false },
  },
  {
    toJSON: {
      transform: function (_doc, ret) {
        // Rename field
        ret.id = ret._id;
        // Remove fields from JSON
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);


export const EventModel = mongoose.model<Event>("Event", EventSchema);
