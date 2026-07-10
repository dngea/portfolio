import { Resend } from 'resend';

const resend = new Resend("re_7p8YgWXA_CMwiJtwuUVTD5tmCa324W6f6");
const prerender = false;
const POST = async ({ request }) => {
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
    text: `Name: ${name}
Surname: ${surname}
Company: ${companyName}
Message: ${message}`,
    html: `
    <p>Name: ${name}</p>
    <p>Surname: ${surname}</p>
    <p>Email: ${email}</p>
    <p>Company name: ${companyName}</p>
    <p>Message: ${message}</p>
    `
  });
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
