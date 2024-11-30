export interface Vote {
  id: string;
  event_id: string;
  name: string;
  date: Date;
}

export interface NewVote {
  name: string;
  votes: Date[];
}

export interface EventVote {
  date: string;
  people: string[];
}

export interface Event {
  id: string;
  name: string;
  dates?: Date[];
  votes?: EventVote[];
}

export interface EventResult extends Event {
  suitableDates: Vote[];
}
