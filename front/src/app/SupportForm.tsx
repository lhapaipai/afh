"use client";

import { Button, Input } from "pentatrion-design";
import { InputField } from "pentatrion-design/components/input-field";
import { Textarea } from "pentatrion-design/components/textarea";

import { ChangeEvent } from "react";

export default function SupportForm() {
  return (
    <div className="rounded-lg bg-gray-0 p-4 shadow-xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 flex items-end" htmlFor="form-name">
            <span className="font-bold">Votre nom</span>
          </label>
          <Input placeholder="Camille Saint-Saens" id="form-name" />
        </div>
        <div>
          <label className="mb-1 flex items-end" htmlFor="form-email">
            <span className="font-bold">Email</span>
          </label>
          <Input placeholder="maurice@ravel.com" id="form-email" />
        </div>
      </div>
      <div>
        <label className="mb-1 flex items-end" htmlFor=":R5q9ucq:">
          <span className="font-bold">Message</span>
        </label>
        <Textarea rows={5} />
      </div>
      <div className="mt-4 flex items-center justify-end">
        <Button>Envoyer</Button>
      </div>
    </div>
  );
}
