export interface Calendar {
  id: number;
  name: string;
  link: string;
}

export interface Event {
  summary: string;
  start_time: string;
  end_time: string;
  origin: string;
}
