import { useContent } from '../context/ContentContext';
import { useI18n } from '../context/LanguageContext';
import useSiteLabels from '../i18n/useSiteLabels';
import { serviceItems } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import ServiceTile from '../components/ServiceTile';
import CtaBand from '../components/CtaBand';

export default function Services() {
  const { content } = useContent();
  const { t, pick } = useI18n();
  const { nav } = useSiteLabels();
  const services = serviceItems(content.services);

  return (
    <>
      <PageHead title={nav('services')} subtitle={t('footer.blurb')} />
      <section className="container-x">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, index) => (
            <Reveal key={item.value} delay={(index % 3) * 80} className="h-full">
              <ServiceTile name={pick(item, 'value')} source={item.value} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
