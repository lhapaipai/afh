import { readItems } from "@directus/sdk";
import directus from "~/directus";
import { Event } from "~/types";
import dayjs from "dayjs";
import clsx from "clsx";
import EventCard from "./EventCard";
import { capitalize } from "~/lib/util";
import { Fragment } from "react";

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
      return "bg-drh-100";
    case 1:
      return "bg-drh-200";
    default:
      return "bg-drh-300";
  }
}

function getTitleColorByIdx(idx: number) {
  switch (idx) {
    case 0:
      return "from-drh-400 to-drh-200";
    case 1:
      return "from-drh-500 to-drh-300";
    default:
      return "from-drh-600 to-drh-400";
  }
}

export default async function Events() {
  const eventsByDay = await getEvents();
  return (
    <div className="mx-auto max-w-5xl">
      <header className="sticky top-0 z-20 w-full bg-gray-0 py-4">
        &nbsp;
      </header>
      {eventsByDay.map(({ date, eventsByLocation }, idx) => {
        const lumiereLocations = Object.keys(eventsByLocation).filter(
          (location) =>
            !["festivites", "lumiere-exposition"].includes(location),
        );
        return (
          <Fragment key={date}>
            <a
              className={clsx(
                "sticky top-0 z-30 inline-block w-48 rounded-t-2xl px-8 py-4 text-center font-bold",
                getBgByIdx(idx),
              )}
              style={{ marginLeft: `${idx * 160}px` }}
              href={`#${date}`}
            >
              {capitalize(dayjs(date).format("dddd D"))}
            </a>{" "}
            <div
              id={`${date}`}
              className={clsx(
                "px-4 py-16",
                getBgByIdx(idx),
                idx < eventsByDay.length - 1 ? "-mb-16" : "mb-16 rounded-b-2xl",
                idx === 0 && "rounded-tr-2xl",
              )}
            >
              <div className="">
                <h3 className={clsx("big-title mb-8", getTitleColorByIdx(idx))}>
                  Palais Lumière
                </h3>
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
                {eventsByLocation.festivites?.length > 0 && (
                  <h3
                    className={clsx("big-title mb-8", getTitleColorByIdx(idx))}
                  >
                    Palais des festivités
                  </h3>
                )}
                <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8">
                  {eventsByLocation.festivites?.map((event) => {
                    return <EventCard key={event.id} event={event} />;
                  })}
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
