import { readItem, readItems } from "@directus/sdk";
import directus from "~/directus";
import markdown2html from "~/lib/markdown";
import { Page } from "~/types";

async function getPage(): Promise<Page | null> {
  const infos = await directus.request<Page[]>(
    readItems("page", {
      filter: {
        slug: {
          _eq: "nous-soutenir",
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

export default async function Support() {
  const infos = await getPage();

  if (!infos) {
    return <div>Pas de contenu</div>;
  }

  return (
    <div className="min-h-screen bg-drh-400 px-4 py-24">
      <h2>{infos.title}</h2>
      <div className="prose prose-neutral max-w-none">
        {infos.content && (
          <div dangerouslySetInnerHTML={{ __html: infos.content }}></div>
        )}
      </div>
    </div>
  );
}
