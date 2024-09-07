"use client";

import clsx from "clsx";
import { useEventListener } from "pentatrion-design/hooks";
import { ComponentProps, CSSProperties, ReactNode, useRef } from "react";

interface Props extends ComponentProps<"div"> {
  containerClassName?: string;
  href?: string;
  spotStyle?: "dark" | "light";
}

const styleDark: CSSProperties = {
  "--spotlight-color-stops": "#95130a,#f3ad42",
  "--spotlight-size": "300px",
};

const styleLight: CSSProperties = {
  "--spotlight-color-stops": "#f3ad42,#f8e3ba",
  "--spotlight-size": "100px",
};

export default function SpotCard({
  children,
  containerClassName,
  className,
  href,
  spotStyle = "dark",
  ...rest
}: Props) {
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
      className={clsx(
        "group relative mx-auto w-full max-w-2xl transform-gpu overflow-hidden rounded-2xl bg-white/10 p-4 [--radius:theme(borderRadius.2xl)] before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]",
        containerClassName,
      )}
      style={spotStyle === "dark" ? styleDark : styleLight}
      {...rest}
    >
      <div
        className={clsx(
          "absolute inset-1 rounded-2xl bg-gray-0",
          href && "transition-colors group-hover:bg-gray-1",
        )}
      ></div>
      <Element href={href} className={clsx("relative", className)}>
        {children}
      </Element>
    </div>
  );
}
