import {createClient} from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request){
    const body = await request.json();

    const displayed_name = (body.displayed_name ?? body.name ?? "").trim();
    const stars = Number(body.stars);
    const comment = (body.comment ?? "").trim();

    if(!Number.isInteger(stars) || stars < 1 || stars > 5){
        return NextResponse.json(
            { ok: false, error: "Invalid input", received: { displayed_name, stars, comment } },
            { status: 400 }
        );
    }

    const supabase = await createClient();

    const {data, error} = await supabase
        .from("reviews")
        .insert([{displayed_name, stars, comment}])
        .select()
        .single();

    if(error){
        return NextResponse.json({ok: false, error: error.message}, {status: 500});
    }

    return NextResponse.json({ok: true, review: data}, {status: 200});
}

export async function GET(){

    const supabase = await createClient();

    const {data, error} = await supabase
        .from("reviews")
        .select("*")
        .order("date", {ascending: false})
        .limit(20);

    if(error){
        return NextResponse.json(
            {ok: false, error: error.message}, 
            {status: 500}
        );
    }  

    return NextResponse.json({ok: true, reviews: data}, {status: 200});
}