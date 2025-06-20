"use client";

import fs from "fs";
import path from "path";
import { useEffect, useState } from "react";
import Link from "next/link";
import TopSocialBanner from "@/components/card/TopSocialBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<
    { title: string; date: string; slug: string }[]
  >([]);

  useEffect(() => {
    const blogFiles = [
      // 🔧 manually list files in public/blog (or automate later)
      "most-sold-pokemon-cards-this-week.md",
    ];

    const parsed = blogFiles.map((file) => {
      const slug = file.replace(/\.md$/, "");
      return fetch(`/blog/${file}`)
        .then((res) => res.text())
        .then((text) => {
          const lines = text.split("\n");
          const title = lines.find((l) => l.startsWith("title:"))?.replace("title:", "").trim() || slug;
          const date = lines.find((l) => l.startsWith("date:"))?.replace("date:", "").trim() || "";
          return { slug, title, date };
        });
    });

    Promise.all(parsed).then(setPosts);
  }, []);

  return (
    <>
      <TopSocialBanner />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-4 text-center">PokéBinder Blog</h1>
        <p className="text-center text-gray-500 mb-10">
          Collector tips, market trends, and verified price insights.
        </p>

        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-orange-600 mb-1">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-gray-500">{post.date}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
