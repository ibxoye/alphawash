"use client";
import React from "react";
import { motion } from "framer-motion";
import { Droplets, Leaf, Zap, Package } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Zero Effort",
    description: "Just grab a sheet and toss it in. No measuring, no spilling."
  },
  {
    icon: Droplets,
    title: "Deep Clean",
    description: "Cuts through sweat, grime, and odor without harsh chemicals."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Biodegradable sheets with zero plastic packaging."
  },
  {
    icon: Package,
    title: "Travel Ready",
    description: "Ultra-thin, TSA-approved sheets. No leaks ever."
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Laundry, Simplified
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            We stripped away everything unnecessary. What's left is pure cleaning power in a single, dissolvable sheet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800"
            >
              <feature.icon className="w-10 h-10 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl text-white font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
