import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import { useCustomer } from '../context/CustomerContext';
import { rememberGuestTicket, ticketLink } from '../lib/guestTickets';
import Button from './Button';
import FormField, { FormMessage } from './FormField';
import { authErrorText } from '../pages/Login';

const DEPARTMENTS = ['support', 'sales', 'technical', 'other'];

// فرم ارسال تیکت؛ هم در صفحه‌ی پشتیبانی و هم در صفحه‌ی تماس (source=contact)
export default function TicketForm({ source = 'support', withSubject = true, sendLabel, onCreated }) {
  const { t, lang } = useI18n();
  const { customer, headers } = useCustomer();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', department: 'support', message: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null);
  const set = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const body = {
        subject: withSubject ? form.subject.trim() : t('contact.subjectDefault'),
        department: form.department,
        message: form.message.trim(),
        source,
        lang,
      };
      if (!customer) Object.assign(body, { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
      const res = await api.post('/tickets', body, { headers });
      const ticket = { id: res.data.id, number: res.data.number, key: res.data.key, subject: body.subject, createdAt: new Date().toISOString() };
      if (ticket.key) rememberGuestTicket(ticket);
      setCreated(ticket);
      setForm((prev) => ({ ...prev, subject: '', message: '' }));
      if (onCreated) onCreated(ticket);
    } catch (err) {
      setError(authErrorText(t, err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-6">
      {!customer ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label={t('contact.name')}>
            <input required autoComplete="name" value={form.name} onChange={set('name')} className="field" />
          </FormField>
          <FormField label={t('contact.email')}>
            <input type="email" required autoComplete="email" dir="ltr" value={form.email} onChange={set('email')} className="field text-left" />
          </FormField>
        </div>
      ) : null}
      {withSubject ? (
        <div className="grid gap-6 sm:grid-cols-[1.6fr_1fr]">
          <FormField label={t('support.subject')}>
            <input required minLength={3} value={form.subject} onChange={set('subject')} className="field" />
          </FormField>
          <FormField label={t('support.department')}>
            <select value={form.department} onChange={set('department')} className="field">
              {DEPARTMENTS.map((key) => (
                <option key={key} value={key}>
                  {t(`support.dept.${key}`)}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      ) : null}
      <FormField label={t('contact.message')}>
        <textarea required minLength={5} rows={6} value={form.message} onChange={set('message')} className="field resize-y" />
      </FormField>

      <FormMessage>{error}</FormMessage>
      {created ? (
        <FormMessage tone="success">
          {source === 'contact' ? t('contact.sent', { number: created.number }) : t('support.sent', { number: created.number })}{' '}
          <Link to={ticketLink(created)} className="font-bold underline underline-offset-4">
            {t('support.view')}
          </Link>
        </FormMessage>
      ) : null}

      <div>
        <Button type="submit" disabled={busy} icon={<FaPaperPlane aria-hidden="true" />}>
          {sendLabel || t('support.send')}
        </Button>
      </div>
    </form>
  );
}
