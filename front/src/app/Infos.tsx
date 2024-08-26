import { readItem, readItems } from "@directus/sdk";
import {
  RGradientMarker,
  RLayer,
  RMap,
  RPopup,
  RSource,
} from "maplibre-react-components";
import "maplibre-react-components/style.css";
import "maplibre-theme/modern.css";
import "maplibre-theme/icons.lucide.css";

import directus from "~/directus";
import markdown2html from "~/lib/markdown";
import { Page } from "~/types";
import { bati } from "~/geodata";
import { FillExtrusionLayerSpecification } from "maplibre-gl";

const evianCenter: [number, number] = [6.5884, 46.4005];
const festivitesCenter: [number, number] = [6.587, 46.4];
const lumiereCenter: [number, number] = [6.5916, 46.4011];
const parkingCharlesGaulle: [number, number] = [6.5888, 46.4012];
const parkingOfficeTourisme: [number, number] = [6.5866, 46.4002];

const batiStyle: {
  paint?: FillExtrusionLayerSpecification["paint"];
  layout?: FillExtrusionLayerSpecification["layout"];
} = {
  paint: {
    "fill-extrusion-color": "#e87821",
    "fill-extrusion-height": 10,
    "fill-extrusion-opacity": 0.6,
  },
  layout: {},
};

async function getPage(): Promise<Page | null> {
  const infos = await directus.request<Page[]>(
    readItems("page", {
      filter: {
        slug: {
          _eq: "infos-pratiques",
        },
      },
      limit: 1,
    }),
  );

  if (infos.length >= 1) {
    return {
      ...infos[0],
      content: await markdown2html(infos[0].content),
    };
  }
  return null;
}

export default async function Infos() {
  const infos = await getPage();

  if (!infos) {
    return <div>Pas de contenu</div>;
  }

  return (
    <div className="min-h-screen bg-drh-300 px-4 py-24">
      <h2>{infos.title}</h2>

      <RMap
        initialCenter={evianCenter}
        initialZoom={16}
        style={{ minHeight: 400 }}
        mapStyle="https://unpkg.com/ign-tms-styles/PLAN.IGN/modern.json"
        cooperativeGestures={true}
      >
        <RSource type="geojson" data={bati} id="bati" />
        <RLayer id="bati" type="fill-extrusion" source="bati" {...batiStyle} />
        <RPopup
          longitude={lumiereCenter[0]}
          latitude={lumiereCenter[1]}
          initialAnchor="top"
        >
          <div className="font-bold">Palais Lumière</div>
          <div className="text-sm">Quai Charles Albert Besson</div>
        </RPopup>
        <RPopup
          longitude={festivitesCenter[0]}
          latitude={festivitesCenter[1]}
          initialAnchor="bottom-left"
        >
          <div className="font-bold">Palais des Festivités</div>
          <div className="text-sm">Pl. Peintre Charles Cottet</div>
        </RPopup>
        <RGradientMarker
          longitude={parkingCharlesGaulle[0]}
          latitude={parkingCharlesGaulle[1]}
          text="P"
        ></RGradientMarker>
        <RGradientMarker
          longitude={parkingOfficeTourisme[0]}
          latitude={parkingOfficeTourisme[1]}
          text="P"
        ></RGradientMarker>
      </RMap>
      <div className="prose prose-neutral max-w-none">
        {infos.content && (
          <div dangerouslySetInnerHTML={{ __html: infos.content }}></div>
        )}
      </div>
    </div>
  );
}
