import { useEffect, useState } from 'react';
import image1 from '../assets/YY.png';
import image2 from '../assets/p2.png';
import video1 from '../assets/v1.mp4';
import api from '../lib/api';
import { listFrom } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import SkeletonGrid from '../components/SkeletonGrid';
import CtaBand from '../components/CtaBand';

// اگه بک‌اند در دسترس نبود، همون کارت‌های قبلی سایت نمایش داده می‌شن
const FALLBACK = [
  {
    _id: 'scoreboard',
    title: 'اپلیکیشن ScoreBoard',
    description: 'یک اپلیکیشن بسیار کاربردی برای نمایش و ویرایش امتیاز مخصوص ورزشگاه‌ها، کاملاً لوکال و پیشرفته. لطفاً جهت خرید یا سفارش تماس بگیرید.',
    image: image1,
    video: video1,
  },
  { _id: 'kadbanu', title: 'اپلیکیشن فروشگاهی کدبانو', description: 'خرید راحت و بدون دردسر از سراسر کشور', image: image2 },
  { _id: 'education', title: 'اپلیکیشن آموزشی', description: 'یادگیری مهارت‌ها با ویدیو', image: '/assets/3.png' },
  { _id: 'medical', title: 'اپلیکیشن پزشکی', description: 'نوبت‌دهی و مشاوره آنلاین', image: '/assets/4.png' },
];

export default function AndroidApp() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let alive = true;
    api
      .get('/portfolio', { params: { limit: 100 } })
      .then((res) => {
        const android = listFrom(res).filter((item) => item.category === 'اندروید');
        if (alive) setItems(android.length ? android : FALLBACK);
      })
      .catch(() => {
        if (alive) setItems(FALLBACK);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <PageHead title="اپلیکیشن‌های اندرویدی" subtitle="مجموعه نرم‌افزارهای ساخته‌شده برای گوشی‌ها و تبلت‌ها" trail={[{ to: '/portfolio', label: 'نمونه‌کارها' }]} />
      <section className="container-x">
        {items ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item._id || item.title} delay={(index % 3) * 80} className="h-full">
                <ProjectCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <SkeletonGrid count={3} className="md:grid-cols-2 xl:grid-cols-3" />
        )}
      </section>
      <CtaBand />
    </>
  );
}
