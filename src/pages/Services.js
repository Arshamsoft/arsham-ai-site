import { useContent } from '../context/ContentContext';
import { DEFAULT_SERVICES, HEADER_DEFAULTS, asList, textOf } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Reveal from '../components/Reveal';
import ServiceTile from '../components/ServiceTile';
import CtaBand from '../components/CtaBand';

export default function Services() {
  const { content } = useContent();
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
  const services = asList(content.services, DEFAULT_SERVICES).map(textOf).filter(Boolean);

  return (
    <>
      <PageHead title={labels.services} subtitle="طراحی، ساخت، اجرا و پشتیبانی انواع نرم‌افزارها از صفر تا صد" />
      <section className="container-x">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((name, index) => (
            <Reveal key={name} delay={(index % 3) * 80} className="h-full">
              <ServiceTile name={name} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
