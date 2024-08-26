export default function Wave() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 939 160"
      className="relative z-10 mb-[-15%]"
    >
      <g>
        <path
          d="M 939,33.014 C 792.052,-19.345 386.487,159.402 186.064,159.402 90.914,159.402 0.217,137.033 0.217,137.033 L 0,0 h 939 z"
          style={{ fill: "url(#gradientFill)" }}
        />
        <path
          d="M 14.129,140.755 0.105,137.072 0,107.542 21.496,112.707 C 191.726,157.42 328.70178,137.52843 479.48578,94.08343 635.17578,49.22443 804.376,-18.996 939.021,7.472 L 939,9.429 V 38.78 L 924.043,35.849 C 802.463,10.237 664.073,59.257 513.42,102.664 357.863,147.485 189.747,186.883 14.129,140.755 Z"
          style={{ fill: "url(#topStroke)" }}
        />
      </g>
      <defs>
        <linearGradient
          id="topStroke"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(994.138,0,0,545.232,-12.3299,-13.0835)"
        >
          <stop style={{ stopColor: "#f2bd4d" }} offset="0" id="stop5" />
          <stop style={{ stopColor: "#eda036" }} offset="1" id="stop4" />
        </linearGradient>

        <linearGradient id="gradientFill">
          <stop style={{ stopColor: "#b4932c" }} offset="0" id="stop2" />
          <stop style={{ stopColor: "#b69b32" }} offset="1" id="stop3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
