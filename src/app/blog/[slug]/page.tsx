"use client";

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;

    fetch(`/blog/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('File not found');
        return res.text();
      })
      .then((text) => {
        const [meta, ...body] = text.split('---').filter(Boolean);
        const lines = meta.split('\n');
        lines.forEach((line) => {
          if (line.startsWith('title:')) setTitle(line.replace('title:', '').trim());
          if (line.startsWith('date:')) setDate(line.replace('date:', '').trim());
        });
        setContent(body.join('\n---\n').trim());
      })
      .catch(() => setContent('404'));
  }, [slug]);

  if (content === '404') return notFound();

  return (
    <>
      <TopSocialBanner />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
        <p className="text-sm text-gray-500 mb-6">{date}</p>
        <article className="prose prose-p:leading-relaxed prose-headings:font-bold prose-img:rounded-lg max-w-none whitespace-pre-line">
          {content}
        </article>
      </main>
      <Footer />
    </>
  );
}
