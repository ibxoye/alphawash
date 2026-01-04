"use client";
import React from "react";
import { getreviews, Postreviews } from "../api/route";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StarPicker } from "@/components/starPicker";
import { StarDisplay } from "@/components/starDisplay";

export default function Reviews() {
    const [reviews, setReviews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [stars, setStars] = React.useState(0);
    const [submitting, setSubmitting] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const router = useRouter();

    const addReview = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div
                className="absolute inset-0 bg-black/70"
                onClick={() => !submitting && setOpen(false)}
                />

                {/* Modal Card */}
                <div className="relative z-10 w-full max-w-lg px-4">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                    <CardTitle className="text-white">Add a Review</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Share your experience.
                    </CardDescription>
                    </CardHeader>

                    <CardContent>
                    <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-2">
                        <Label className="text-zinc-200" htmlFor="review-name">Name</Label>
                        <Input
                            className="bg-zinc-800 text-white"
                            id="review-name"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        </div>

                        <div className="grid gap-2">
                        <Label className="text-zinc-200">Rating</Label>
                        <StarPicker value={stars} onChange={setStars} />
                        {stars === 0 && (
                            <p className="text-sm text-zinc-500">Select 1–5 stars.</p>
                        )}
                        </div>

                        <div className="grid gap-2">
                        <Label className="text-zinc-200" htmlFor="review-comment">Comment</Label>
                        <Input
                            className="bg-zinc-800 text-white"
                            id="review-comment"
                            placeholder="Write a short comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        </div>

                        {errorMsg && (
                        <p className="text-sm text-red-400">{errorMsg}</p>
                        )}
                    </form>
                    </CardContent>

                    <CardFooter className="flex gap-2 justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        className="bg-zinc-800 hover:bg-zinc-700 text-white"
                        onClick={() => setOpen(false)}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        className="bg-gray-600 hover:bg-gray-500 text-white"
                        disabled={submitting}
                        onClick={handleSubmitReview} // defined below
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                    </CardFooter>
                </Card>
                </div>
            </div>
        )
    }

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

    async function handleSubmitReview() {
        setErrorMsg("");

        // basic validation;
        if (!comment.trim()) return setErrorMsg("Comment is required.");
        if (stars < 1 || stars > 5) return setErrorMsg("Please select a star rating (1–5).");

        setSubmitting(true);
        try {

            const created = await Postreviews({ displayed_name: name.trim(), stars: stars, comment: comment.trim() });

            if(!created?.ok) setErrorMsg("Failed to submit review. Please try again.");

            if (created?.ok && created.review) {
            setReviews((prev) => [created.review, ...prev]); 
            }

            // reset + close
            setName("");
            setComment("");
            setStars(0);
            setOpen(false);
        } catch (err) {
            setErrorMsg(err?.message || "Something went wrong submitting your review.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="py-32 bg-zinc-950 min-h-screen flex flex-col items-center justify-center px-6">
            <h2 className="text-4xl font-bold text-white mb-8">What Our Customers Are Saying</h2>
            
            {reviews.length === 0 && <p>No reviews yet.</p>}

            <div className="w-full max-w-5xl bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 mb-10">
                <div className="max-h-[420px] overflow-y-auto pr-2 space-y-4">
                    {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800"
                    >
                        <div className="flex items-center justify-between mb-2">
                        <p className="text-zinc-300 font-semibold">
                            {review.displayed_name}
                        </p>
                        <StarDisplay value={review.stars} />
                        </div>

                        <p className="text-zinc-400 italic mb-2">
                        “{review.comment}”
                        </p>

                        <small className="text-zinc-500">
                        {new Date(review.date).toLocaleDateString()}
                        </small>
                    </div>
                    ))}
                </div>
                </div>
            <div>
                <motion.button
                    onClick={() => setOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-full shadow-lg"
                > {/* bg-blue-600*/}
                    Add Your Review
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

            {open && addReview()}
        </section>
        
    );
}                       
