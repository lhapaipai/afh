import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"svg"> {
  color?: string;
}
export default function Brindille({ color = "#530b0d", ...rest }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="160"
      height="250"
      viewBox="0 0 42.3 66.1"
      data-name="brindille"
      {...rest}
    >
      <path
        fill={color}
        d="M92 111.4c-.6-12.7-6-23.2-9.9-34.4 1.6 2.6 3.3 5 4.8 7.7 1.5 2.6 3 5.3 4.2 8.1 1.3 2.9 2.2 5.9 3.6 8.8-.3-13.8-3.5-27.7 1.3-41.4-3.7 17.3 2.6 34.1 2.3 51.3.7-7 1.2-14 2.3-21 .6-3.8 1.8-7.7 3.4-11.3 1.5-3.2 4.3-5.2 9-5.1-9.1 7.1-10.6 16.9-11.7 26.8-.4 3.8-.8 7.7-1.6 11.5-.6 3.2-1.6 6.4-2.6 9.5-.8 2.5-4.9 4-7 2.6-.5-.3-.9-1.4-.8-2a48.8 48.8 0 0 0-6.6-28c-3.4-7.3-7-14.4-10.5-21.5l.8-.5 7.2 12c2.3 4.2 4.7 8.4 6.6 12.8 2 4.4 3.4 9 5.2 14"
        transform="translate(-71.4 -59.5)"
      />
    </svg>
  );
}
