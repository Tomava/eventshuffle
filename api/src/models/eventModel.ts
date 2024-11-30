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
