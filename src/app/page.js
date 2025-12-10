"use client";

import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import SignupForm from "@/components/landing/SignupForm";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Hero />
      <Features />
      <SignupForm />
      <Footer />
    </div>
  );
}
