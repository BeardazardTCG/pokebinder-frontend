"use client";

import Image from "next/image";
import { useState } from "react";

export default function ComingSoonBlock() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [code, setCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("success");
      setCode(data.code);
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="w-full bg-yellow-300 py-10 px-4 md:px-12 border-t-4 border-black border-b-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
            🚨 Coming Soon to PokéBinder
          </h2>
          <p className="text-black mb-4 text-sm md:text-base">
            Sign up for early access and enter to win a 50-card giveaway bundle!<br />
            One bundle sent every 50 signups.
          </p>
          <ul className="list-disc list-inside text-black text-sm md:text-base mb-4">
            <li>Smart Suggestions</li>
            <li>Trend Tracker</li>
            <li>Auto-Listing Tool</li>
            <li>Bundle Builder</li>
            <li>Grading AI</li>
            <li>Language Unifier</li>
          </ul>

          {status === "success" && code ? (
            <div className="bg-green-100 border border-green-400 text-green-800 rounded p-4 text-sm">
              ✅ You're signed up!<br />
              <strong>Your code is shown on the card to the right →</strong>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="border border-gray-300 rounded px-4 py-2 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black text-yellow-300 px-4 py-2 rounded text-sm hover:bg-zinc-800"
              >
                Sign Up
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-600 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full md:w-1/2 max-w-md">
          <Image
            src="/Assets/codecard.png"
            alt="Pokémon TCG Code Card"
            width={600}
            height={350}
            className="w-full h-auto rounded-lg border border-black shadow-lg"
          />

          {code && (
            <div
              className="absolute text-xl font-mono font-bold tracking-widest text-black"
              style={{
                top: "64.5%", // fine-tuned to match visual band
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255,255,255,0.85)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              {code}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
