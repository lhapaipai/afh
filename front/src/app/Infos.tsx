import { readItems } from "@directus/sdk";
import {
  RGradientMarker,
  RLayer,
  RMap,
  RPopup,
  RSource,
} from "maplibre-react-components";
import "maplibre-react-components/style.css";
import "maplibre-theme/modern.css";
import "maplibre-theme/icons.default.css";

import directus from "~/directus";
import { Page, Location } from "~/types";
import { bati } from "~/geodata";
import { FillExtrusionLayerSpecification } from "maplibre-gl";
import markdown2html from "~/lib/markdown";
import clsx from "clsx";
import Roseau2 from "~/components/Roseau2";
import Bosquet from "~/components/Bosquet";
import Roseau3 from "~/components/Roseau3";
import { hexColors } from "~/style/colors";
import SpotCard from "~/components/SpotCard";

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

async function getLocations(): Promise<Location[]> {
  const locations = await directus.request<Location[]>(readItems("location"));

  return locations.map((location) => {
    return {
      ...location,
      coords: JSON.parse(location.coords as any as string),
    };
  });
}

export default async function Infos() {
  const infos = await getPage();
  const locations = await getLocations();
  if (!infos) {
    return <div>Pas de contenu</div>;
  }

  return (
    <div className="relative overflow-hidden bg-drh-400 px-4 py-24">
      <Roseau2 className={clsx("absolute -bottom-8 right-0")} />

      <Bosquet className="absolute -bottom-8 right-12" />
      <Roseau3 className="absolute -bottom-8 left-0" color={hexColors[2]} />
      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="big-title mb-8 from-drh-700 to-drh-500">
          {infos.title}
        </h2>
        <RMap
          id="evian-map"
          initialCenter={evianCenter}
          initialZoom={16}
          style={{ minHeight: 400 }}
          mapStyle="https://unpkg.com/ign-tms-styles/PLAN.IGN/modern.json"
          cooperativeGestures={true}
          className="mb-8 rounded-2xl shadow-lg"
        >
          <RSource type="geojson" data={bati} id="bati" />
          <RLayer
            id="bati"
            type="fill-extrusion"
            source="bati"
            {...batiStyle}
          />
          {locations.map((location) => (
            <RPopup
              key={location.id}
              longitude={location.coords[0]}
              latitude={location.coords[1]}
              initialAnchor={location.popup_anchor}
            >
              <div className="font-bold">{location.name}</div>
              <div className="text-sm">{location.address}</div>
            </RPopup>
          ))}

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

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {locations.map((location) => {
            return (
              <SpotCard
                key={location.id}
                href={location.website}
                className="flex h-full items-center justify-center"
              >
                <div>
                  <div className="text-center font-bold">{location.name}</div>
                  <div className="text-center">{location.address}</div>
                  <div
                    dangerouslySetInnerHTML={{ __html: location.description }}
                  ></div>
                </div>
              </SpotCard>
            );
          })}
        </div>

        <div className="prose">
          {infos.content && (
            <div dangerouslySetInnerHTML={{ __html: infos.content }}></div>
          )}
        </div>
      </div>
    </div>
  );
}
