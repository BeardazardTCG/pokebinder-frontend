import SignupForm from '@/components/SignupForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-yellow-50 to-pink-50 min-h-screen px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-pink-700 mb-4">Join PokéBinder</h1>
          <p className="text-gray-700 mb-6">
            Sign up to get early access to premium features, free code cards, price alerts, giveaways, and more.
          </p>
          <SignupForm />
          <p className="text-xs text-gray-500 mt-6">
            No spam. Just updates from the UK’s most honest Pokémon card tracker.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
