"use client";
import React from "react";
import { getreviews, Postreviews } from "../api/route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Reviews() {
    const [reviews, setReviews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        async function fetchReviews() {
            try{
            const data = await getreviews();
            setReviews(data?.reviews ?? []);
            }finally{
                setLoading(false);
            }
            
        }
        fetchReviews();
    }, []);
    return (
        <section className="py-32 bg-zinc-950 min-h-screen flex flex-col items-center justify-center px-6">
            <h2 className="text-4xl font-bold text-white mb-8">What Our Customers Are Saying</h2>
            
            {reviews.length === 0 && <p>No reviews yet.</p>}

            {reviews.map((review) => (
                <div key={review.id} className="review bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-6 max-w-3xl items-center justify-center">
                    <p className="text-zinc-400 font-semibold mb-4"><strong>{review.displayed_name}</strong></p>
                    <p className="text-zinc-400 font">Rating: {review.stars}/5</p>
                    <p className="text-zinc-400 font">"{review.comment}"</p>
                    <small className="text-zinc-400 font">{new Date(review.date).toLocaleDateString()}</small>
                </div>
            ))}
            <div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-full shadow-lg"
                > {/* bg-blue-600*/}
                    Add Your Review →
                </motion.button>

                <motion.button
                    onClick={() => router.push('/')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-4 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-full shadow-lg"
                >
                    Home
                </motion.button>
            </div>
        </section>
        
    );
}                       
