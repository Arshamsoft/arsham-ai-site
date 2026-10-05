import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { DEFAULT_SERVICES, asList, textOf } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import ServiceTile from '../components/ServiceTile';
import CtaBand from '../components/CtaBand';

export default function Services() {
  const { content } = useContent();
  const { t, tr } = useI18n();
  const { nav } = useSiteLabels();
  const services = asList(content.services, DEFAULT_SERVICES).map(textOf).filter(Boolean);

  return (
    <>
      <PageHead title={nav('services')} subtitle={t('footer.blurb')} />
      <section className="container-x">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((name, index) => (
            <Reveal key={name} delay={(index % 3) * 80} className="h-full">
              <ServiceTile name={tr(name)} source={name} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
