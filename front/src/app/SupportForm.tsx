"use client";

import { Button, Flash, Input } from "pentatrion-design";
import { Textarea } from "pentatrion-design/components/textarea";
import { submitSupport } from "./actions";
import { useFormState } from "react-dom";
import clsx from "clsx";

const initialState: { message: string | null; status: number } = {
  message: null,
  status: 0,
};

export default function SupportForm() {
  const [state, formAction] = useFormState(submitSupport, initialState);

  return (
    <form className="rounded-lg bg-gray-0 p-4 shadow-xl" action={formAction}>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 flex items-end" htmlFor="form-name">
            <span className="font-bold">Votre nom</span>
          </label>
          <Input placeholder="Camille Saint-Saens" id="form-name" name="name" />
        </div>
        <div>
          <label className="mb-1 flex items-end" htmlFor="form-email">
            <span className="font-bold">Email</span>
          </label>
          <Input placeholder="maurice@ravel.com" id="form-email" name="email" />
        </div>
      </div>
      <div>
        <label className="mb-1 flex items-end" htmlFor="form-message">
          <span className="font-bold">Message</span>
        </label>
        <Textarea rows={5} id="form-message" name="message" />
      </div>
      {state.message && (
        <div
          className={clsx(
            "mt-4 border-l-4 bg-gray-0 p-2 shadow dark:shadow-dark",
            state.status === 204 ? "border-green-3" : "border-red-3",
          )}
        >
          {state.message}
        </div>
      )}

      {state.status !== 204 && (
        <div className="mt-4 flex items-center justify-end">
          <Button>Envoyer</Button>
        </div>
      )}
    </form>
  );
}
