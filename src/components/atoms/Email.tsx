import React, { useState, useId } from "react";
import { Clipboard, ClipboardCheck, type LucideIcon } from "lucide-react";

export default function Email({ email }: { email: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [icon, setIcon] = useState<LucideIcon>(Clipboard);
  const tooltipId = useId();

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        setIsCopied(true);
        setIcon(ClipboardCheck);

        setTimeout(() => {
          setIsCopied(false);
          setIcon(Clipboard);
        }, 5000);
      },
      () => {
        /* clipboard write failed */
      },
    );
  };

  const IconComponent = icon;
  const label = isCopied ? "Copied" : "Copy email";

  return (
    <button
      onClick={copyEmail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || " ") copyEmail();
      }}
      className="group relative cursor-pointer"
      aria-describedby={tooltipId}
    >
      <span>{email}</span>
      <span
        id={tooltipId}
        role="tooltip"
        className="tooltip text-light absolute -top-10 left-1/2 z-10 flex w-fit -translate-x-1/2 items-center gap-1.5 rounded-md bg-gray-700 px-3 py-2 text-xs font-normal whitespace-nowrap opacity-0 shadow-xs transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="absolute top-full left-1/2 -mt-1 size-2 -translate-x-1/2 rotate-45 bg-gray-700" />

        <IconComponent className="size-4 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </span>
      {/* screen readers */}
      <span className="sr-only" role="status" aria-live="polite">
        {isCopied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
