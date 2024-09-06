import { readItems } from "@directus/sdk";
import directus from "~/directus";
import { Event } from "~/types";
import dayjs from "dayjs";
import clsx from "clsx";
import EventCard from "./EventCard";
import { capitalize } from "~/lib/util";
import { Fragment } from "react";
import Roseau2 from "~/components/Roseau2";
import Bosquet from "~/components/Bosquet";
import Roseau3 from "~/components/Roseau3";
import { hexColors } from "~/style/colors";

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

function tabOffsetByIdx(idx: number) {
  switch (idx) {
    case 0:
      return "top-0";
    case 1:
      return "ml-28 sm:ml-40 top-0";
    default:
      return "ml-56 sm:ml-80 top-0";
  }
}

function getBgByIdx(idx: number) {
  switch (idx) {
    case 0:
      return "bg-drh-100";
    case 1:
      return "bg-drh-200";
    case 2:
      return "bg-drh-300";
    case 3:
      return "bg-drh-400";
    default:
      return "bg-drh-500";
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
    <div className="relative bg-[url(/hautbois-bg.svg)]">
      {/* <div className="absolute inset-0 hidden overflow-hidden 2xl:block">
        <Roseau2
          className={clsx(
            "absolute -bottom-8 right-0 mt-auto transition-all duration-500",
          )}
        />
      </div>{" "} */}
      <div className="mx-auto max-w-5xl px-4 py-16">
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
                  "sticky z-30 inline-block w-32 rounded-t-2xl py-4 text-center font-bold sm:w-48",
                  getBgByIdx(idx),
                  tabOffsetByIdx(idx),
                )}
                href={`#${date}`}
              >
                {capitalize(dayjs(date).format("dddd D"))}
              </a>{" "}
              <div
                id={`${date}`}
                className={clsx(
                  "relative px-4 py-16",
                  getBgByIdx(idx),
                  idx < eventsByDay.length - 1 ? "-mb-16" : "rounded-b-2xl",
                  idx === 0 && "rounded-tr-2xl",
                )}
              >
                <div className="absolute inset-0 z-0">
                  {idx === 0 && (
                    <Bosquet
                      color={hexColors[idx + 2]}
                      className={clsx("absolute bottom-0 right-0 opacity-25")}
                    />
                  )}
                  {idx === 1 && (
                    <Roseau3
                      color={hexColors[idx + 2]}
                      className={clsx("absolute -bottom-4 left-0 opacity-25")}
                    />
                  )}
                </div>
                <div className="relative z-10">
                  <h3
                    className={clsx("big-title mb-8", getTitleColorByIdx(idx))}
                  >
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
                      className={clsx(
                        "big-title mb-8",
                        getTitleColorByIdx(idx),
                      )}
                    >
                      Palais des festivités
                    </h3>
                  )}
                  <div className="grid-cols-auto mx-auto grid max-w-5xl gap-x-8">
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
    </div>
  );
}
