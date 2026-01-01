
export async function Postemail(email) {
    const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
    })

    const data = await res.json();
    return data;
}

export async function getreviews(){
    const res = await fetch('/api/reviews',{
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    })

    if(!res.ok){
        throw new Error('Failed to fetch reviews');
    }

    const data = await res.json();
    return data;
}

export async function Postreviews(display_name, stars, comment){
    const res = await fetch ('/api/reviews',{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({display_name, stars, comment})
    })

    if(!res.ok){
        throw new Error('Failed to fetch reviews');
    }

    const data = await res.json();
    return data;
}