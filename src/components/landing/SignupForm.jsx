"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("success");
  };

  return (
    <section
      id="signup"
      className="py-32 bg-zinc-950 text-center relative"
    >
      <div className="max-w-md mx-auto px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-600/10 mb-6">
          <Mail className="w-8 h-8 text-gray-500" />
        </div>

        <h2 className="text-4xl font-bold text-white mb-4">
          Be First in Line
        </h2>
        <p className="text-zinc-400 mb-10">
          Join the waitlist for early access and exclusive offers.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/20 px-8 py-5 rounded-xl"
          >
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="text-green-400">You're on the list!</span>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              className="flex-1 px-5 h-14 rounded-xl bg-zinc-900 text-white border border-zinc-800"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="px-8 h-14 bg-gray-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-500"
            >
              Notify Me
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
