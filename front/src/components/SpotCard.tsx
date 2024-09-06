"use client";

import clsx from "clsx";
import { useEventListener } from "pentatrion-design/hooks";
import { CSSProperties, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
}

const style: CSSProperties = {
  "--spotlight-color-stops": "#95130a,#f3ad42",
  "--spotlight-size": "300px",
};

export default function SpotCard({ children, className, href }: Props) {
  const ref = useRef<HTMLDivElement>(null!);

  useEventListener("mousemove", (event) => {
    const { top, left } = ref.current.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  });

  const Element = href ? "a" : "div";

  return (
    <div
      ref={ref}
      className="group relative mx-auto w-full max-w-2xl transform-gpu overflow-hidden rounded-2xl bg-white/10 p-4 [--radius:theme(borderRadius.2xl)] before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]"
      style={style}
    >
      <div
        className={clsx(
          "absolute inset-1 rounded-2xl bg-gray-0",
          href && "transition-colors group-hover:bg-gray-1",
        )}
      ></div>
      <Element
        href={href}
        className={clsx(
          "relative flex h-full items-center justify-center",
          className,
        )}
      >
        <div>{children}</div>
      </Element>
    </div>
  );
}
