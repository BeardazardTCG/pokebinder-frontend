import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'blog', `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return {};

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: data.title || 'PokéBinder Blog',
    description: data.description || 'Collector news and updates from PokéBinder.',
    openGraph: {
      title: data.title,
      description: data.description,
      images: ['https://www.pokebinder.co.uk/pokebinder-logo.png'],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const filePath = path.join(process.cwd(), 'blog', `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return (
    <>
      <TopSocialBanner />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-4">{data.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{new Date(data.date).toLocaleDateString('en-GB')}</p>
        <article className="prose prose-p:leading-relaxed prose-headings:font-bold prose-img:rounded-lg max-w-none">
          {content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
