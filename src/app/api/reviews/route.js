import {createClient} from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request){
    const {display_name, stars, comment} = await request.json();

    const supabase = await createClient();

    const {data, error} = await supabase
        .from("reviews")
        .insert([{display_name, stars, comment}])
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