import { Event } from "../models/eventModel";

export const getEvents = (): Event[] => {
  // TODO: Test data
  const events: Event[] = [
    {
      id: 0,
      name: "Jake's secret party",
    },
    {
      id: 1,
      name: "Bowling night",
    },
    {
      id: 2,
      name: "Tabletop gaming",
    },
  ];
  return events;
};
