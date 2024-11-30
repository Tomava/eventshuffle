import { EventModel } from "../models/eventModel";
import { Event } from "../models/eventModel";

export const getEvents = async (): Promise<Event[]> => {
  try {
    const events = await EventModel.find();
    return events;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching events:", err.message);
      throw new Error("Error fetching events: " + err.message);
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }

  // // TODO: Test data
  // const events: Event[] = [
  //   {
  //     id: "48308fcb-80c7-45cd-8c18-b1c35087b813",
  //     name: "Jake's secret party",
  //   },
  //   {
  //     id: "a2392d04-d939-428a-bdcf-af0580c27810",
  //     name: "Bowling night",
  //   },
  //   {
  //     id: "e90a6f3f-a393-482a-a157-8b9bbd4afa6c",
  //     name: "Tabletop gaming",
  //   },
  // ];
  // return events;
};
