import { readItems } from "@directus/sdk";
import directus from "~/directus";
import { Event } from "~/types";
import dayjs from "dayjs";
import clsx from "clsx";
import EventCard from "./EventCard";
import { capitalize } from "~/lib/util";

type EventsByDay = {
  date: string;
  eventsByLocation: Record<string, Event[]>;
};

async function getEvents() {
  const events = await directus.request<Event[]>(
    readItems("event", {
      sort: "date_start",
    }),
  );

  const eventsByDayObj: Record<string, EventsByDay> = {};
  events.forEach((event) => {
    const dateStr = event.date_start?.substring(0, 10);
    if (!eventsByDayObj[dateStr]) {
      eventsByDayObj[dateStr] = {
        date: dateStr,
        eventsByLocation: {
          [event.location]: [event],
        },
      };
    } else if (!eventsByDayObj[dateStr].eventsByLocation[event.location]) {
      eventsByDayObj[dateStr].eventsByLocation[event.location] = [event];
    } else {
      eventsByDayObj[dateStr].eventsByLocation[event.location].push(event);
    }
  });

  return Object.keys(eventsByDayObj)
    .sort()
    .map((dateStr) => eventsByDayObj[dateStr]);
}

function getBgByIdx(idx: number) {
  switch (idx) {
    case 0:
      return "bg-gray-0";
    case 1:
      return "bg-drh-100";
    default:
      return "bg-drh-200";
  }
}

export default async function Events() {
  const eventsByDay = await getEvents();
  return (
    <div>
      {eventsByDay.map(({ date, eventsByLocation }, idx) => {
        const lumiereLocations = Object.keys(eventsByLocation).filter(
          (location) =>
            !["festivites", "lumiere-exposition"].includes(location),
        );
        return (
          <div
            key={date}
            className={clsx(
              "relative min-h-screen px-4 py-24",
              getBgByIdx(idx),
            )}
          >
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-20 text-right text-2xl">
                {capitalize(dayjs(date).format("dddd"))}
              </h2>

              <h3 className="big-title mb-8">Palais Lumière</h3>
              <div className="grid-cols-auto grid gap-8">
                {lumiereLocations.map((location) => {
                  const events = eventsByLocation[location];
                  return (
                    <div key={location} className="">
                      {events.map((event) => {
                        return <EventCard key={event.id} event={event} />;
                      })}
                    </div>
                  );
                })}
              </div>
              <h3 className="big-title mb-8">Palais des festivités</h3>
              <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8">
                {eventsByLocation.festivites?.map((event) => {
                  return <EventCard key={event.id} event={event} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
