export async function POST(req) {
  const { email } = await req.json();

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbyfKBZHjxq-dLYzCXLNfg7LXIHSkf9nJl_iyDCe1oIZ_NrKt5sfvY6LbfUgtuSSpO-mDA/exec";

  const r = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    redirect: "follow",
    cache: "no-cache",
  });

  const text = await r.text();

  // If Apps Script returned HTML, surface a helpful error
  if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          "Apps Script returned HTML (likely auth/permissions or wrong deployment URL). Check web app access = Anyone and Execute as = Me.",
        debugPreview: text.slice(0, 120),
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // Try to parse JSON if it is JSON
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Non-JSON response from Apps Script", raw: text }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify(data), {
    status: r.ok && data.ok !== false ? 200 : 500,
    headers: { "Content-Type": "application/json" },
  });
}

