// export async function POST(req) {
//   const { email } = await req.json();

//   const scriptUrl =
//     "https://script.google.com/macros/s/AKfycbyfKBZHjxq-dLYzCXLNfg7LXIHSkf9nJl_iyDCe1oIZ_NrKt5sfvY6LbfUgtuSSpO-mDA/exec";

//   const r = await fetch(scriptUrl, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email }),
//     redirect: "follow",
//     cache: "no-cache",
//   });

//   const text = await r.text();

//   // If Apps Script returned HTML, surface a helpful error
//   if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
//     return new Response(
//       JSON.stringify({
//         ok: false,
//         error:
//           "Apps Script returned HTML (likely auth/permissions or wrong deployment URL). Check web app access = Anyone and Execute as = Me.",
//         debugPreview: text.slice(0, 120),
//       }),
//       { status: 502, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   // Try to parse JSON if it is JSON
//   let data;
//   try {
//     data = JSON.parse(text);
//   } catch {
//     return new Response(
//       JSON.stringify({ ok: false, error: "Non-JSON response from Apps Script", raw: text }),
//       { status: 502, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   return new Response(JSON.stringify(data), {
//     status: r.ok && data.ok !== false ? 200 : 500,
//     headers: { "Content-Type": "application/json" },
//   });
// }

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email) {
  return typeof email === "string" && /^\S+@\S+\.\S+$/.test(email);
}

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();


    // Try insert first (dedupe via UNIQUE)
    let { data: row, error } = await supabase
      .from("waitlist")
      .insert({ email: normalizedEmail })
      .select()
      .single();

    // If duplicate, fetch existing row
    if (error) {
      const { data: existing, error: fetchErr } = await supabase
        .from("waitlist")
        .select("*")
        .eq("email", normalizedEmail)
        .single();

      if (fetchErr) throw fetchErr;
      row = existing;
    }

    // Send welcome email only once
    if (!row.welcome_sent_at) {
      await resend.emails.send({
        from: process.env.RESEND_FROM,
        to: normalizedEmail,
        subject: "You're on the Alphawsh early access list ✅",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Welcome to Alpha Wash</h2>
            <br/>
            <p>You officially signed up, which tells us two things:</p>
            <ol>
              <li>You care about clean clothes.</li>
              <li>You don’t have time for lame detergent</li>
            </ol>
            <br/>
            <p>Alpha Wash is built for people who put their clothes through real work. Sweat, dirt, long days, and repeat. No fluff. No nonsense. Just powerful, eco-friendly laundry sheets that get the job done.</p>
            <br/>
            <p>By joining the list, you’ll get:</p>
            <ul>
              <li>Early access to drops</li>
              <li>Exclusive deals</li>
              <li>Updates we actually think are worth sending</li>
            </ul>
            <br/>
            <p>No spam. No BS. If it’s in your inbox, it’s because it matters.</p>
            <br/>
            <p>Glad to have you with us</p>
            <p>Now go get your clothes dirty, we’ve got the cleanup.</p>
            <br/>
            <p style="margin-top: 24px;">– Alphawsh</p>
          </div>
        `,
      });

      await supabase
        .from("waitlist")
        .update({ welcome_sent_at: new Date().toISOString() })
        .eq("email", normalizedEmail);

      return new Response(
        JSON.stringify({ success: true, emailed: true }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, emailed: false }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
