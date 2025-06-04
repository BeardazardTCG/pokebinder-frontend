import BaseLayout from '@/components/layout/BaseLayout';

export default function TestHeaderPage() {
  return (
    <BaseLayout>
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Header Component Test</h1>
        <p className="text-zinc-600">
          This is a placeholder page just to preview the new universal header layout and footer.
        </p>
      </div>
    </BaseLayout>
  );
}
