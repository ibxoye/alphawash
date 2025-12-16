
export async function Postemail(email) {
    const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
    })

    const data = await res.json();
    return data;
}