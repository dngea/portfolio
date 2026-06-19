import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const name = data.get("name");
  const surname = data.get("surname");
  const companyName = data.get("companyName");
  const email = data.get("email");
  const message = data.get("message");

  const { error } = await resend.emails.send({
    from: "Portfolio contacted <onboardind@resend.dev>",
    to: "dngeap@gmail.com",
    subject: `New message from ${name} ${surname}`,
    text: `Name: ${name}\nSurname: ${surname}\nCompany: ${companyName}\nMessage: ${message}`,
    html: `
    <p>Name: ${name}</p>
    <p>Surname: ${surname}</p>
    <p>Email: ${email}</p>
    <p>Company name: ${companyName}</p>
    <p>Message: ${message}</p>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
