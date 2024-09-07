"use server";

import { createItem } from "@directus/sdk";
import directus from "~/directus";

export async function submitSupport(
  prevState: { message: string | null; status: number },
  form: FormData,
): Promise<{ message: string | null; status: number }> {
  const response = await directus.request(
    createItem("form_sponsor", {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      status: "unread",
    }),
  );

  return {
    message:
      response.status !== 204
        ? "Une erreur s'est produite votre message n'a pu être envoyé..."
        : "Merci, votre message a été envoyé !",
    status: response.status,
  };
}
