import { Event } from "~/types";
import dayjs from "dayjs";
import { getLocationLabel } from "~/lib/util";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <div
      key={event.id}
      className="mb-8 rounded-xl bg-gray-0 p-4 text-gray-7 shadow-lg"
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
