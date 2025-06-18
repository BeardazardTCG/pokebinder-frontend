import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopSocialBanner from '@/components/card/TopSocialBanner';

export default function ReturnPolicyPage() {
  return (
    <>
      <Head>
        <title>Return Policy | PokéBinder</title>
        <meta name="description" content="Read our return and refund policy for Pokémon card orders." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Return Policy",
              description: "Return and refund policy for Pokémon cards on PokéBinder.",
              url: "https://www.pokebinder.co.uk/return-policy",
              publisher: {
                "@type": "Organization",
                name: "PokéBinder",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.pokebinder.co.uk/pokebinder-logo.png"
                }
              }
            }),
          }}
        />
      </Head>

      <TopSocialBanner />
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12 text-base leading-7 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Return & Refund Policy</h1>

        <p className="mb-4">
          We want every collector to be happy with their purchase. If you're not satisfied, we’re here to help.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Eligibility for Returns</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Returns accepted for both defective and non-defective products.</li>
          <li>You must notify us within <strong>14 days</strong> of receiving your order.</li>
          <li>Items must be in their original condition and packaging.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">How to Start a Return</h2>
        <p className="mb-4">
          Email <a href="mailto:support@pokebinder.co.uk" className="text-blue-600 underline">support@pokebinder.co.uk</a> with your order details. We’ll provide return instructions within 48 hours.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Refunds</h2>
        <p className="mb-4">
          Once we receive and inspect the returned item, we’ll issue a refund to your original payment method within 5 business days.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Return Shipping</h2>
        <p className="mb-4">
          Customers are responsible for return shipping costs unless the item was faulty or damaged.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Need Help?</h2>
        <p>
          Reach out to us anytime at <a href="mailto:support@pokebinder.co.uk" className="text-blue-600 underline">support@pokebinder.co.uk</a>.
        </p>
      </main>

      <Footer />
    </>
  );
}
