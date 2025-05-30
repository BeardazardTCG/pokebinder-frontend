import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search interface...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
