import Events from "./Events";
import "./style.css";
import WhiteWave from "~/components/WhiteWave";
import Infos from "./Infos";
import Support from "./Support";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <div className="">
      <Hero />

      <WhiteWave />
      <Events />
      <Infos />
      <Support />
      <div className="bg-drh-500 px-4 py-24">
        <a
          className="block rounded-lg bg-gray-0 p-4 text-center shadow-xl transition-all hover:bg-gray-1 hover:shadow-2xl focus:ring-yellow-2 active:bg-gray-2"
          href="mailto:audrey.martin-favrot@ville-evian.fr"
        >
          <span className="mb-2 grid place-content-center text-2xl">
            <i className="fe-mail"></i>
          </span>

          <span>Infos supplémentaires</span>
        </a>

        <div>
          <i className="fe-heart text-red-5"></i> Revenez bientôt pour plus de
          détails...
        </div>
      </div>
    </div>
  );
}
