import { readItems } from "@directus/sdk";
import directus from "~/directus";

async function getEvents() {
  return directus.request(readItems("event"));
}

type Event = {
  id: number;
  status: "published";
  title: string;
  location: string;
  description: string | null;
  date_start: string | null;
  date_end: string | null;
};

export default async function EventsPage() {
  const events = await getEvents();
  console.log(events);
  return (
    <div>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <h3>{event.title}</h3>
            <div>{event.date_start}</div>
            <div>{event.location}</div>
          </div>
        );
      })}
    </div>
  );
}
