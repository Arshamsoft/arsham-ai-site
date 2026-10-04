import Tile from './Tile';

// جای کارت‌ها تا وقتی داده از سرور برسه
export default function SkeletonGrid({ count = 6, className = 'sm:grid-cols-2 lg:grid-cols-3' }) {
  return (
    <div className={`grid gap-6 ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <Tile key={index} cut={22} faceClassName="flex flex-col">
          <div className="skeleton aspect-[4/3]" />
          <div className="grid gap-3 p-6">
            <div className="skeleton h-5 w-2/3" />
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-4/5" />
          </div>
        </Tile>
      ))}
    </div>
  );
}
