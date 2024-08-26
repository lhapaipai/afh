"use client";

import { Event } from "~/types";
import dayjs from "dayjs";
import { getLocationLabel } from "~/lib/util";
import { useIntersectionObserver } from "usehooks-ts";
import clsx from "clsx";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: "-150px 0px -50px 0px",
  });
  return (
    <div
      ref={ref}
      key={event.id}
      className={clsx(
        "mb-8 rounded-xl bg-gray-0 p-4 text-gray-7 shadow-lg transition-all duration-500",
        isIntersecting ? "opacity-100" : "scale-90 opacity-0",
      )}
    >
      <div className="flex">
        <h4 className="flex-1 font-bold">{event.title}</h4>
        <div>
          <span>{dayjs(event.date_start).format("H[h]mm")}</span>
          {event.date_end && (
            <span>
              {" "}
              - <span>{dayjs(event.date_end).format("H[h]mm")}</span>
            </span>
          )}
        </div>
      </div>
      <div className="text-right">{getLocationLabel(event.location)}</div>
    </div>
  );
}
