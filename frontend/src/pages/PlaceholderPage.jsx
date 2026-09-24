export default function PlaceholderPage({ title }) {
  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center p-6">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          This module is part of Chunk 1 and will be built after
          the main dashboard is completed.
        </p>
      </div>
    </div>
  );
}