// FILE: /app/updates/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export const metadata = {
  title: 'Updates | PokéBinder',
  description: 'Stay up to date with the latest PokéBinder news, features, and releases.',
};

export default function UpdatesPage() {
  const updatesDir = path.join(process.cwd(), 'updates');
  const files = fs.readdirSync(updatesDir);
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const fullPath = path.join(updatesDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      title: data.title || slug,
      date: data.date || 'No date',
      slug,
    };
  });

  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-zinc-800 mb-4 text-center">PokéBinder Updates</h1>
      <p className="text-center text-zinc-500 mb-10">New features, fixes, and updates as they happen.</p>

      <ul className="space-y-6">
        {sortedPosts.map(({ title, date, slug }) => (
          <li key={slug}>
            <Link href={`/updates/${slug}`} className="block p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50">
              <h2 className="text-xl font-semibold text-orange-600">{title}</h2>
              <p className="text-sm text-zinc-500">{new Date(date).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
