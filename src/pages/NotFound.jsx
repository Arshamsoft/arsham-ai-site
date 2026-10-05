import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import PageHead from '../components/PageHead';
import Button from '../components/Button';
import { StarMark } from '../components/Star';

export default function NotFound() {
  const { t, number } = useI18n();
  const { nav } = useSiteLabels();
  return (
    <>
      <PageHead title={t('notFound.title')} subtitle={t('notFound.text')} />
      <section className="container-x flex flex-col items-start gap-8 pb-24">
        <div className="flex items-center gap-4 text-muted">
          <StarMark size={40} className="text-saffron" />
          <span className="font-display text-6xl font-extrabold text-fg/80">{number(404).replace(/[٬,.\s]/g, '')}</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button to="/">{t('notFound.home')}</Button>
          <Button to="/contact" variant="ghost">
            {nav('contact')}
          </Button>
        </div>
      </section>
    </>
  );
}
