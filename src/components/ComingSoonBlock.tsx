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
    <section className="w-full bg-[#FFEB3B] py-12 px-4 md:px-12 border-t-[6px] border-b-[6px] border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 flex items-center gap-2">
            <span className="text-3xl">🎉</span> Get a Free Code + Win 50 Cards
          </h2>

          <p className="text-black mb-6 text-base md:text-lg leading-relaxed max-w-xl">
            Sign up today and instantly unlock a real Pokémon TCG code — no spam, no strings.<br />
            For every 50 signups, we randomly pick one trainer to win a <strong>50-card bundle</strong> 💥
          </p>

          <ul className="text-black text-base space-y-2 mb-8 max-w-xl">
            <li>🧠 Smart Suggestions — <strong>Buy or sell the right cards</strong></li>
            <li>📊 Trend Tracker — <strong>Spot value shifts in real time</strong></li>
            <li>🔧 Auto-Listing Tool — <strong>Sell at the perfect price</strong></li>
            <li>🧩 Bundle Builder — <strong>Build trades in seconds</strong></li>
            <li>🧠 Grading AI — <strong>Estimate condition instantly</strong></li>
            <li>🌍 Language Unifier — <strong>Match foreign listings automatically</strong></li>
          </ul>

          {status === "success" && code ? (
            <div className="bg-green-100 border border-green-400 text-green-800 rounded p-4 text-sm shadow">
              ✅ You're signed up!<br />
              <strong>Your code is shown on the card to the right →</strong>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black text-yellow-300 px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 transition"
              >
                Claim My Reward
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-600 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full md:w-1/2 max-w-md">
          <div className="rounded-xl border-[3px] border-black shadow-xl overflow-hidden">
            <Image
              src="/Assets/codecard.png"
              alt="Pokémon TCG Code Card"
              width={600}
              height={350}
              className="w-full h-auto"
            />
          </div>

          {code && (
            <div
              className="absolute text-lg font-mono font-extrabold tracking-[0.25em] text-black text-center"
              style={{
                top: "63.5%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255,255,255,0.95)",
                padding: "4px 10px",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                width: "max-content",
                whiteSpace: "nowrap",
              }}
            >
              {code.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
