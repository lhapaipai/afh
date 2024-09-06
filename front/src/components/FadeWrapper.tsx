"use client";

import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface Props extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
}
export default function FadeWrapper({
  children,
  rootMargin = "0px 0px 0px 0px",
  threshold = 0,
  className,
  ...rest
}: Props) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
  });
  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(
        className,
        isIntersecting ? "opacity-100" : "scale-90 opacity-0",
      )}
    >
      {children}
    </div>
  );
}
