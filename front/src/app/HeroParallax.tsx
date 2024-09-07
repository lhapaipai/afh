"use client";

import Roseau1 from "~/components/Roseau1";
import Roseau2 from "~/components/Roseau2";
import Hautbois from "~/components/Hautbois";
import Roseau3 from "~/components/Roseau3";
import Bosquet from "~/components/Bosquet";
import LigneRoseaux from "~/components/LigneRoseaux";
import Mountain from "~/components/Mountain";
import { useEventListener } from "usehooks-ts";
import { useRef } from "react";

export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null!);

  useEventListener("mousemove", (event) => {
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;

    ref.current.style.setProperty("--x", x.toString());
    ref.current.style.setProperty("--y", y.toString());
  });

  return (
    <div className="absolute bottom-0 left-0 right-0" ref={ref}>
      <Mountain className="animate-[translate-y_10s_ease-in-out_infinite]" />
      <LigneRoseaux className="absolute bottom-0 left-0 hidden translate-x-[calc(var(--x)*10px)] translate-y-[calc(var(--y)*10px)] lg:block" />
      <Roseau1 className="absolute bottom-0 right-0 hidden translate-x-[calc(var(--x)*15px)] translate-y-[calc(var(--y)*15px)] md:block" />
      <Bosquet className="absolute bottom-0 left-0 translate-x-[calc(var(--x)*15px)] translate-y-[calc(var(--y)*15px)]" />
      <Roseau2 className="absolute -bottom-8 left-0 translate-x-[calc(var(--x)*30px)] translate-y-[calc(var(--y)*30px)]" />
      <Roseau3 className="absolute -bottom-8 left-1/4 hidden w-[15%] translate-x-[calc(var(--x)*45px)] translate-y-[calc(var(--y)*45px)] xl:block" />
      <Hautbois className="absolute -bottom-12 -right-2 block w-2/4 max-w-72" />
    </div>
  );
}
