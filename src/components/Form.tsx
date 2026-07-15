import { email } from "astro:schema";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

type Status = "idle" | "loading" | "success" | "error";

export default function Form() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status !== "success") return;

    const timer = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-light @container space-y-6 overflow-hidden rounded-2xl p-6 shadow-2xl sm:p-8">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        <fieldset className="space-y-8">
          <div className="flex flex-col gap-4 @sm:flex-row">
            <div className="flex w-full flex-col">
              <label
                className="text-dark text-sm font-semibold capitalize"
                htmlFor="name"
              >
                name
              </label>
              <input
                className="border-clay mt-1.5 h-8 border-b-2 px-1"
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
                className="border-clay mt-1.5 h-8 border-b-2 px-1"
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
              className="border-clay mt-1.5 h-8 border-b-2 px-1"
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
            className="border-clay mt-1.5 h-8 border-b-2 px-1"
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
            className="border-clay mt-1.5 h-8 border-b-2 px-1"
          ></textarea>
        </fieldset>

        {/* Honeypot: hidden from real users, bots tend to fill every field */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] opacity-0"
          aria-hidden="true"
        />

        <Button type="submit" size={"lg"} className="ml-auto">
          Send
        </Button>
      </form>

      {status === "success" && (
        <div
          className="w-fit rounded-xs bg-green-100 px-3 py-1.5 text-green-900"
          aria-live="polite"
        >
          Email sent! Thanks for contacting.
        </div>
      )}

      {status === "error" && (
        <div className="w-fit rounded-xs bg-red-50 px-3 py-1.5 text-red-900">
          Something went wrong. Please try again, or reach out directly at
          dngeap@gmail.com.
        </div>
      )}
    </div>
  );
}
