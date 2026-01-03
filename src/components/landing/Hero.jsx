"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToReviews = () => {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/alphawsh.jpeg')",
          backgroundPosition: "center 10%",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/80 via-zinc-900/70 to-zinc-950/80" />

      {/* Blur blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse" />
            <span className="text-sm text-gray-500">Coming Soon</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white">
            ALPHA<span className="text-gray-500">WASH</span>
          </h1>

          <p className="text-xl text-zinc-400 mt-4">
            Revolutionary detergent sheets for the modern man.
          </p>

          <p className="text-lg text-zinc-500 mt-2 mb-12">
            No mess. No measuring. Just clean.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={scrollToSignup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-full shadow-lg"
            >
              Get Early Access →
            </motion.button>

            <motion.button
              onClick={scrollToReviews}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white
                         bg-white/5 border border-white/10 shadow-lg
                         hover:bg-white/10 transition"
            >
            See Reviews <span className="ml-2 text-gray-400">★</span>
            </motion.button>
          </div>

    
        </motion.div>
      </div>
    </section>
  );
}
