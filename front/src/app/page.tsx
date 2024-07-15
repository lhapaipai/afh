import LandingBackground from "~/components/LandingBackground";
import Oboe from "~/components/Oboe";

function Top() {
  return (
    <div className="absolute -inset-x-8 top-0 h-px bg-gray-8/15 [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
  );
}

function Left() {
  return (
    <div className="absolute -inset-y-8 left-0 w-px bg-gray-8/15 [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
  );
}

function Right() {
  return (
    <div className="absolute -inset-y-8 right-0 w-px bg-gray-8/15 [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
  );
}

function Bottom() {
  return (
    <div className="absolute -inset-x-8 bottom-0 h-px bg-gray-8/15 [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
  );
}

function ShadowTop() {
  return (
    <div className="absolute bottom-full left-16 -mb-px flex h-8 items-end overflow-hidden">
      <div className="-mb-px flex h-[2px] w-56">
        <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
        <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="grid min-h-screen place-content-center">
      <LandingBackground />
      <main className="relative w-full max-w-[850px] overflow-x-hidden">
        <div className="flex flex-col items-end lg:flex-row">
          <div className="flex flex-1 flex-col items-end">
            <div className="w-full p-4">
              <div className="flex items-center">
                <div className="mr-4">
                  <Oboe size={96} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    Drôles de Rencontres
                    <br />
                    du Hautbois
                  </h1>
                </div>
              </div>
              <h2 className="mt-4 text-center text-xl">
                Congrès de l&apos;Association Française du Hautbois.
              </h2>
            </div>

            <div className="relative z-10 w-full p-4 lg:w-fit">
              <Top />
              <Left />
              <Right />
              <ShadowTop />

              <div className="rounded-lg bg-gray-0 p-4 text-center shadow-xl">
                <div className="mb-2 grid place-content-center text-2xl">
                  <i className="fe-calendar"></i>
                </div>
                <div>
                  du 1<sup>er</sup> au 3 novembre 2024
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-fit">
            <div className="relative z-10 w-full p-4 lg:w-fit">
              <Top />
              <Left />
              <Right />
              <Bottom />
              <ShadowTop />

              <div className="rounded-lg bg-gray-0 p-4 shadow-xl">
                <div className="font-semibold">Évian-les-Bains</div>
                <div className="text-sm text-gray-6">
                  Palais Lumière et Palais des Festivités
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full p-4">
              <a
                className="block rounded-lg bg-gray-0 p-4 text-center shadow-xl transition-all hover:bg-gray-1 hover:shadow-2xl focus:ring-yellow-2 active:bg-gray-2"
                href="mailto:audrey.martin-favrot@ville-evian.fr"
              >
                <span className="mb-2 grid place-content-center text-2xl">
                  <i className="fe-mail"></i>
                </span>

                <span>Infos supplémentaires</span>
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-8 p-4 text-center">
          <div>
            <i className="fe-heart text-red-5"></i> Revenez bientôt pour plus de
            détails...
          </div>
        </div>
      </main>
    </div>
  );
}
