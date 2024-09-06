import Mountain from "~/components/Mountain";
import Image from "next/image";
import logoImg from "~/assets/logo-800x428.png";
import Roseau1 from "~/components/Roseau1";
import Roseau2 from "~/components/Roseau2";
import Hautbois from "~/components/Hautbois";
import Roseau3 from "~/components/Roseau3";
import Bosquet from "~/components/Bosquet";
import LigneRoseaux from "~/components/LigneRoseaux";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-drh-500 to-drh-300 text-gray-0">
      <div className="absolute bottom-0 left-0 right-0">
        <LigneRoseaux className="absolute bottom-0 left-0 hidden lg:block" />
        <Roseau1 className="absolute bottom-0 right-0 hidden md:block" />
        <Bosquet className="absolute bottom-0 left-0" />
        <Roseau2 className="absolute bottom-0 left-0" />
        <Hautbois className="absolute -bottom-12 -right-2 block w-2/4 max-w-72" />
        <Roseau3 className="absolute bottom-0 left-1/4 hidden w-[15%] xl:block" />
        <Mountain />
      </div>
      <div className="pointer-events-none relative grid min-h-screen grid-cols-1 md:grid-cols-2 md:grid-rows-2">
        <div className="flex flex-col items-center justify-center">
          <h1 className="max-w-96">
            <Image
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
        <div className="">
          <ul className="absolute bottom-16 left-16 list-disc font-bold">
            <li>Concerts</li>
            <li>Ateliers</li>
            <li>Concours</li>
            <li>Conférences</li>
            <li>Expositions</li>
          </ul>
        </div>
        <div className="flex h-2/4 items-center justify-center"></div>
      </div>
    </div>
  );
}
