"use client";

import { Event as AFHEvent } from "~/types";
import dayjs from "dayjs";
import { getLocationLabel } from "~/lib/util";
import { useIntersectionObserver } from "usehooks-ts";
import clsx from "clsx";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
} from "pentatrion-design/components/modal";
import SpotCard from "~/components/SpotCard";

interface Props {
  event: AFHEvent;
}

function EventShortContent({ event }: Props) {
  return (
    <div>
      <div className="flex w-full">
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
      {event.image && (
        <img
          className="object-cover"
          src={`/thumbnail/mini/${event.image}`}
          alt={event.title}
        />
      )}
      <div className="text-right">{getLocationLabel(event.location)}</div>
    </div>
  );
}

export default function EventCard({ event }: Props) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: "0px 0px -50px 0px",
  });
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div ref={ref} className="mb-8 text-gray-7" data-event-id={event.id}>
        {event.description ? (
          <SpotCard
            href="#"
            spotStyle="light"
            onClick={(e) => {
              e.preventDefault();
              setShowDetails(true);
            }}
            containerClassName={clsx(
              "cursor-pointer shadow-lg transition-all duration-500",
              isIntersecting ? "opacity-100" : "scale-90 opacity-0",
            )}
          >
            <EventShortContent event={event} />
          </SpotCard>
        ) : (
          <div
            className={clsx(
              "rounded-xl bg-gray-0 p-4 shadow-lg transition-all duration-500",
              isIntersecting ? "opacity-100" : "scale-90 opacity-0",
            )}
          >
            <EventShortContent event={event} />
          </div>
        )}
      </div>

      {showDetails && (
        <Modal open={showDetails} onOpen={setShowDetails}>
          <ModalContent className="w-full max-w-[650px]">
            <ModalHeader>{event.title}</ModalHeader>
            <ModalDescription height={500}>
              <div className="p-4">
                <div>
                  <span>Horaire : </span>
                  <span className="font-bold">
                    {dayjs(event.date_start).format("H[h]mm")}
                  </span>
                  {event.date_end && (
                    <span className="font-bold">
                      {" "}
                      - <span>{dayjs(event.date_end).format("H[h]mm")}</span>
                    </span>
                  )}
                </div>
                <div>
                  <span>Lieu : </span>
                  {getLocationLabel(event.location)}
                </div>
                {event.image && (
                  <div>
                    <img
                      className="object-cover"
                      src={`/thumbnail/large/${event.image}`}
                      alt={event.title}
                    />
                  </div>
                )}
                {event.description && (
                  <div
                    className="mt-4 rounded-2xl border-2 border-drh-300 p-4 shadow-sm"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  ></div>
                )}
              </div>
            </ModalDescription>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
