import { PositionAnchor } from "maplibre-gl";

export type Event = {
  id: number;
  status: "published";
  title: string;
  location: string;
  description: string | null;
  date_start: string;
  date_end: string | null;
};

export type Page = {
  id: number;
  sort: number | null;
  user_updated: string;
  date_updated: string;
  title: string;
  slug: string;
  content?: string;
};

export type Location = {
  id: number;
  name: string;
  address: string;
  address_extra: string;
  description: string;
  website: string;
  coords: [number, number];
  popup_anchor: PositionAnchor;
};

export type Sponsor = {
  id: number;
  logo: string;
  width: number;
  height: number;
};
