import { readAssetRaw } from "@directus/sdk";
import { NextRequest } from "next/server";
import directus from "~/directus";

interface Props {
  params: {
    key: string;
    id: string;
  };
}

export async function GET(_: NextRequest, { params: { id, key } }: Props) {
  const infos = await directus.request(readAssetRaw(id, { key }));
  return new Response(infos);
}
