import type { APIRoute } from "astro";
import { Resend } from "resend";
import { getStore } from "@netlify/blobs";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const prerender = false;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Fail open if Blobs is unreachable (e.g. site not linked to Netlify) so a
// storage hiccup doesn't take the contact form down with it.
async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const store = getStore("contact-rate-limit");
    const now = Date.now();
    const entry = await store.get(ip, { type: "json" });

    if (!entry || entry.resetAt < now) {
      await store.setJSON(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      return false;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
      return true;
    }

    await store.setJSON(ip, { count: entry.count + 1, resetAt: entry.resetAt });
    return false;
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const data = await request.formData();

  // Honeypot: real users never see or fill this field.
  if (data.get("company_website")) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  if (await isRateLimited(clientAddress)) {
    return new Response(
      JSON.stringify({ error: "Too many requests, please try again later." }),
      { status: 429 },
    );
  }

  const name = data.get("name");
  const surname = data.get("surname");
  const companyName = data.get("companyName");
  const email = data.get("email");
  const message = data.get("message");

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof surname !== "string" ||
    !surname.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 5000
  ) {
    return new Response(JSON.stringify({ error: "Invalid submission." }), {
      status: 400,
    });
  }

  const safeCompanyName =
    typeof companyName === "string" ? escapeHtml(companyName) : "";

  const { error } = await resend.emails.send({
    from: "Portfolio contacted <onboardind@resend.dev>",
    to: "dngeap@gmail.com",
    subject: `New message from ${name} ${surname}`,
    text: `Name: ${name}\nSurname: ${surname}\nCompany: ${companyName}\nMessage: ${message}`,
    html: `
    <p>Name: ${escapeHtml(name)}</p>
    <p>Surname: ${escapeHtml(surname)}</p>
    <p>Email: ${escapeHtml(email)}</p>
    <p>Company name: ${safeCompanyName}</p>
    <p>Message: ${escapeHtml(message)}</p>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
