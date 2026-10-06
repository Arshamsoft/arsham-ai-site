import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaLock, FaPaperPlane } from 'react-icons/fa';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import { useCustomer } from '../context/CustomerContext';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import StateMessage from '../components/StateMessage';
import { FormMessage } from '../components/FormField';
import { authErrorText } from './Login';

export default function TicketView() {
  const { id } = useParams();
  const { search } = useLocation();
  const key = new URLSearchParams(search).get('key') || '';
  const { t, date } = useI18n();
  const { headers, ready } = useCustomer();
  const authHeader = headers.Authorization;
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('loading');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const options = useCallback(() => ({ headers: authHeader ? { Authorization: authHeader } : {} }), [authHeader]);

  useEffect(() => {
    if (!ready) return undefined;
    let alive = true;
    setStatus('loading');
    api
      .get(`/tickets/${id}`, { ...options(), params: key ? { key } : {} })
      .then((res) => {
        if (!alive) return;
        setTicket(res.data);
        setStatus('ready');
      })
      .catch(() => alive && setStatus('missing'));
    return () => {
      alive = false;
    };
  }, [id, key, ready, options]);

  const reply = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await api.post(`/tickets/${id}/messages`, { text: text.trim(), key }, options());
      setTicket(res.data);
      setText('');
    } catch (err) {
      setError(authErrorText(t, err));
    } finally {
      setBusy(false);
    }
  };

  const close = async () => {
    try {
      const res = await api.post(`/tickets/${id}/close`, { key }, options());
      setTicket(res.data);
    } catch (err) {
      setError(authErrorText(t, err));
    }
  };

  if (status === 'loading') return <div className="container-x py-24" aria-busy="true" />;

  if (status === 'missing' || !ticket) {
    return (
      <>
        <PageHead title={t('support.notFound')} trail={[{ to: '/support', label: t('support.title') }]} />
        <section className="container-x pb-24">
          <StateMessage title={t('support.notFound')} text={t('support.notFoundText')} action={<Button to="/support">{t('support.title')}</Button>} />
        </section>
      </>
    );
  }

  const closed = ticket.status === 'closed';

  return (
    <>
      <PageHead title={ticket.subject} subtitle={t('support.number', { number: ticket.number })} trail={[{ to: '/support', label: t('support.title') }]} />
      <section className="container-x pb-24">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={ticket.status} />
            <span className="chip !text-xs">{t(`support.dept.${ticket.department}`)}</span>
          </div>

          <ol className="mt-8 grid gap-4">
            {(ticket.messages || []).map((message) => {
              const mine = message.from === 'customer';
              return (
                <li key={message._id || message.createdAt} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                  <Tile cut={14} tone={mine ? '' : 'night'} className="max-w-[85%]" faceClassName="p-5">
                    <p className={`text-xs ${mine ? 'text-muted' : 'text-[#b9c6ee]'}`}>
                      {mine ? t('support.you') : t('support.team')} · {date(message.createdAt)}
                    </p>
                    <p className="mt-2 whitespace-pre-line leading-8">{message.text}</p>
                  </Tile>
                </li>
              );
            })}
          </ol>

          {closed ? (
            <p className="mt-10 inline-flex items-center gap-2 text-muted">
              <FaLock aria-hidden="true" /> {t('support.closedNote')}
            </p>
          ) : (
            <form onSubmit={reply} className="mt-10 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">{t('support.reply')}</span>
                <textarea required minLength={2} rows={4} value={text} onChange={(e) => setText(e.target.value)} className="field resize-y" />
              </label>
              <FormMessage>{error}</FormMessage>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={busy} icon={<FaPaperPlane aria-hidden="true" />}>
                  {t('support.sendReply')}
                </Button>
                <Button variant="ghost" onClick={close}>
                  {t('support.close')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
