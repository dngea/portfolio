import { email } from "astro:schema";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function Form() {
  const [emailSuccess, setEmailSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = new FormData(e.currentTarget);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: payload,
    });

    const data = await response.json();

    if (data.success) {
      setEmailSuccess(true);
    }
  };

  return (
    <div className="bg-light @container overflow-hidden rounded-2xl p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset className="space-y-8">
          <div className="flex flex-col gap-4 @xs:flex-row">
            <div className="flex w-full flex-col">
              <label
                className="text-dark text-sm font-semibold capitalize"
                htmlFor="name"
              >
                name
              </label>
              <input
                className="border-clay mt-1.5 h-10 border-b-2"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex w-full flex-col">
              <label
                className="text-dark text-sm font-semibold capitalize"
                htmlFor="surname"
              >
                surname
              </label>
              <input
                type="text"
                name="surname"
                id="surname"
                className="border-clay mt-1.5 h-10 border-b-2"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-dark text-sm font-semibold capitalize"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              name="companyName"
              id="companyName"
              type="text"
              className="border-clay mt-1.5 h-10 border-b-2"
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-col">
          <label
            className="text-dark text-sm font-semibold capitalize"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-clay mt-1.5 h-10 border-b-2"
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label
            className="text-dark text-sm font-semibold capitalize"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            rows={3}
            name="message"
            id="message"
            className="border-clay mt-1.5 h-10 border-b-2"
          ></textarea>
        </fieldset>

        <Button type="submit" size={"lg"} className="ml-auto">
          Send
        </Button>
      </form>

      {emailSuccess && <div>Email sent! Thanks for contacting.</div>}
    </div>
  );
}
