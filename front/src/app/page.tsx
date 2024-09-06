import Events from "./Events";
import "./style.css";
import WhiteWave from "~/components/WhiteWave";
import Infos from "./Infos";
import Support from "./Support";
import Hero from "./Hero";
import LigneRoseaux from "~/components/LigneRoseaux";
import Sponsors from "./Sponsors";
import { hexColors } from "~/style/colors";

export default function HomePage() {
  return (
    <div className="relative">
      <div className="relative">
        <Hero />
        <WhiteWave className="bottom-0" />
      </div>
      <div className="relative z-10">
        <Events />
        <WhiteWave className="top-full rotate-180" />
      </div>
      <Infos />
      <div className="relative z-10 bg-drh-500">
        <div className="bg-[url(/brindille-bg.svg)]">
          <WhiteWave className="bottom-full" color={hexColors[4]} />
          <Support />
          <Sponsors />
        </div>
      </div>
      <div className="overflow-hidden bg-drh-500">
        <LigneRoseaux className="-mb-8 -ml-8 -mr-8 w-[calc(100%+4rem)] min-w-[1024px] max-w-none" />
      </div>
    </div>
  );
}
