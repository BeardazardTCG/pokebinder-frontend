// FILE: /components/ui/PaginationControls.tsx

"use client";

import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query?: string;
}

export default function PaginationControls({ currentPage, totalPages, basePath, query = '' }: Props) {
  const createLink = (page: number) =>
    `${basePath}?q=${encodeURIComponent(query)}&page=${page}`;

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      {currentPage > 1 && (
        <Link
          href={createLink(currentPage - 1)}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
        >
          ← Prev
        </Link>
      )}
      <span className="font-medium text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={createLink(currentPage + 1)}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
        >
          Next →
        </Link>
      )}
    </div>
  );
}
