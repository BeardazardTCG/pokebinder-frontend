import dynamic from 'next/dynamic';

const BlogPreviewGrid = dynamic(() => import('./BlogPreviewGrid'), { ssr: false });

export default function BlogPreviewWrapper() {
  return (
    <section className="w-full max-w-6xl mt-12 px-4">
      <div className="mb-4 border-b-2 border-blue-400 pb-1">
        <h2 className="text-xl font-bold text-blue-700">📚 From the Blog</h2>
      </div>
      <BlogPreviewGrid />
    </section>
  );
}
