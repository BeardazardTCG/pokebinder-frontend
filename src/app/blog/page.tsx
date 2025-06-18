'use client';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Blog | PokéBinder',
  description: 'Collector tips, price trends, sealed product insights, and behind-the-scenes updates.',
};

const blogDirectory = path.join(process.cwd(), '/blog');

export default function BlogPage() {
  const files = fs.readdirSync(blogDirectory);

  const posts = files
    .map((filename) => {
      const filePath = path.join(blogDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        title: data.title || filename.replace(/\.md$/, ''),
        date: new Date(data.date).toLocaleDateString('en-GB'),
        rawDate: data.date,
        content,
      };
    })
    .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());

  return (
    <>
      <Head>
        {posts.map((post, idx) => {
          const schema = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: post.title,
            datePublished: post.rawDate,
            author: {
              "@type": "Person",
              name: "PokéBinder Team"
            },
            publisher: {
              "@type": "Organization",
              name: "PokéBinder",
              logo: {
                "@type": "ImageObject",
                url: "https://www.pokebinder.co.uk/pokebinder-logo.png"
              }
            },
            image: "https://www.pokebinder.co.uk/pokebinder-logo.png"
          };

          return (
            <script
              key={idx}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          );
        })}
      </Head>

      <TopSocialBanner />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-4 text-center">PokéBinder Blog</h1>
        <p className="text-center text-gray-500 mb-10">
          Collector tips, price trends, and behind-the-scenes updates.
        </p>

        <div className="space-y-10">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-orange-600 mb-1">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{post.date}</p>
              <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
