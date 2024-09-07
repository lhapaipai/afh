import Image from "next/image";
import { Sponsor } from "~/types";

const sponsors: Sponsor[] = [
  {
    id: 0,
    logo: "afh.jpg",
    width: 300,
    height: 240,
  },
  {
    id: 1,
    logo: "ccpeva.svg",
    width: 270,
    height: 100,
    website: "https://www.cc-peva.fr/",
  },
  {
    id: 2,
    logo: "evian.svg",
    width: 125,
    height: 100,
    website: "https://ville-evian.fr/",
  },
  {
    id: 3,
    logo: "haute-savoie.svg",
    width: 150,
    height: 100,
    website: "https://hautesavoie.fr/",
  },
  {
    id: 4,
    logo: "veran.svg",
    width: 294,
    height: 100,
    website: "https://veran-vents.fr/",
  },
];

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const Element = sponsor.website ? "a" : "div";

  return (
    <Element
      href={sponsor.website}
      target="_blank"
      className="inline-block whitespace-nowrap px-8 py-16 align-middle saturate-0 transition-all hover:saturate-100"
    >
      <div className="inline-block text-center">
        <Image
          src={`/sponsors/${sponsor.logo}`}
          width={sponsor.width}
          height={sponsor.height}
          alt=""
          className="inline h-24 w-auto max-w-none"
        />
      </div>
    </Element>
  );
}

export default function Sponsors() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="big-title mb-8 from-drh-800 to-drh-700">Sponsors</h2>
      </div>
      <div className="overflow-hidden">
        <span className="inner block w-max animate-[slide-logos_100s_linear_infinite] overflow-hidden whitespace-nowrap will-change-transform">
          <span className="inline-block whitespace-nowrap">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </span>
          <span className="inline-block whitespace-nowrap">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </span>
          <span className="inline-block whitespace-nowrap">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </span>
        </span>
      </div>
    </div>
  );
}
