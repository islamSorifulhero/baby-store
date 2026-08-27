export default function Loading() {
  return (
    <div className="container py-10 md:py-14">
      <div className="h-8 w-64 bg-slate-100 rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[4/5] bg-slate-100 rounded-2xl animate-pulse" />
            <div className="h-4 w-3/4 bg-slate-100 rounded mt-3 animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-100 rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
