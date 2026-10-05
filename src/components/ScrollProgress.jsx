import { useEffect, useRef } from 'react';

// نوار نازک بالای صفحه که میزان پیمایش رو نشون می‌ده (از سمت شروع خط، در هر دو جهت)
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-saffron via-turq to-lapis rtl:origin-right rtl:bg-gradient-to-l"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
