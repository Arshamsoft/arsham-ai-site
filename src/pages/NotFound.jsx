import PageHead from '../components/PageHead';
import Button from '../components/Button';
import { StarMark } from '../components/Star';

export default function NotFound() {
  return (
    <>
      <PageHead title="این صفحه پیدا نشد" subtitle="ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه جابه‌جا شده باشد." />
      <section className="container-x flex flex-col items-start gap-8 pb-24">
        <div className="flex items-center gap-4 text-muted">
          <StarMark size={40} className="text-saffron" />
          <span className="font-display text-6xl font-extrabold text-fg/80">۴۰۴</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button to="/">رفتن به صفحه‌ی اصلی</Button>
          <Button to="/contact" variant="ghost">
            تماس با ما
          </Button>
        </div>
      </section>
    </>
  );
}
