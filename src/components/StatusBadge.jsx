import { useI18n } from '../context/LanguageContext';

const TONES = {
  open: 'bg-turq/15 text-turq',
  answered: 'bg-lapis/15 text-lapis',
  'customer-reply': 'bg-saffron/15 text-saffron',
  closed: 'bg-raised text-muted',
};

export default function StatusBadge({ status }) {
  const { t } = useI18n();
  return <span className={`chip !text-xs font-semibold ${TONES[status] || TONES.open}`}>{t(`support.status.${status}`)}</span>;
}
