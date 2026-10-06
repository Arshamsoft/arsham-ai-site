// برچسب + فیلد فرم با استایل یکسان
export default function FormField({ label, hint, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function FormMessage({ tone = 'error', children }) {
  if (!children) return null;
  const tones = {
    error: 'border-red-500 bg-red-500/10',
    success: 'border-turq bg-turq/10',
  };
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`border-s-4 p-4 leading-8 ${tones[tone]}`}>
      {children}
    </div>
  );
}
