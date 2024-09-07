import Image from "next/image";
import logoImg from "~/assets/logo-800x428.png";

import HeroParallax from "./HeroParallax";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-drh-500 to-drh-300 text-gray-0">
      <HeroParallax />
      <div className="relative grid min-h-screen grid-cols-1 md:grid-cols-2 md:grid-rows-2">
        <div className="flex flex-col items-center justify-center">
          <h1 className="max-w-96">
            <Image
              className="hover:animate-swing origin-top"
              src={logoImg}
              alt="Drôles de rencontres du Hautbois"
              width="800"
              height="428"
            />
          </h1>

          <h2 className="mt-4 text-center text-xl">
            Congrès de l&apos;Association Française du Hautbois.
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 inline-block h-32 w-32 rounded-full bg-drh-700 px-6 py-4 md:left-auto md:right-12 md:top-12">
            <h3 className="font-segoe-bl text-2xl text-drh-400">Évian</h3>
            <div className="font-bold leading-5">
              du 1<sup>er</sup> au 3 novembre 2024
            </div>
          </div>
        </div>
        <div>
          <a
            href="#events"
            className="hover:animate-short-pulse absolute bottom-32 left-32 flex h-52 w-52 items-center justify-center rounded-full bg-drh-600"
          >
            <ul className="list-disc font-bold">
              <li>Concerts</li>
              <li>Ateliers</li>
              <li>Concours</li>
              <li>Conférences</li>
              <li>Expositions</li>
            </ul>
          </a>
        </div>
        <div className="flex h-2/4 items-center justify-center"></div>
      </div>
    </div>
  );
}
