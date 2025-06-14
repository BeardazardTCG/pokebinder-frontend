import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Updates | PokéBinder',
  description: 'New features, fixes, and updates as they happen.',
};

const updatesDirectory = path.join(process.cwd(), '/updates');

export default function UpdatesPage() {
  const files = fs.readdirSync(updatesDirectory);

  const posts = files
    .map((filename) => {
      const filePath = path.join(updatesDirectory, filename);
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
      <TopSocialBanner />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-4 text-center">PokéBinder Updates</h1>
        <p className="text-center text-gray-500 mb-10">
          New features, fixes, and updates as they happen.
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
