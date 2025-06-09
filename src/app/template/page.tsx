import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TemplatePage() {
  return (
    <>
      <Header />

      <main className="px-4 py-10 text-center text-zinc-600 text-sm">
        <p>This is the base page with just the universal header and footer.</p>
        <p>Add anything between here when you’re ready.</p>
      </main>

      <Footer />
    </>
  );
}
