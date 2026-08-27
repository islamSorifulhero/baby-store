export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-48 bg-slate-100 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
    </div>
  );
}
