// پس‌زمینه‌ی ثابت: نقش گره‌ی هشت‌پر با محوشدگی و دو هاله‌ی رنگی.
// هاله‌ها با radial-gradient ساخته شدن (نه filter: blur) تا روی گوشی‌های ضعیف هم سبک باشن.
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="pattern-fade absolute inset-x-0 top-0 h-[85vh]">
        <div className="pattern h-full w-full" />
      </div>
      <div className="glow-turq absolute -top-64 start-[-20%] h-[52rem] w-[52rem]" />
      <div className="glow-lapis absolute top-[35%] end-[-24%] h-[56rem] w-[56rem]" />
    </div>
  );
}
