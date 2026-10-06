import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import { useCustomer } from '../context/CustomerContext';
import { guestTickets, ticketLink } from '../lib/guestTickets';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import StatusBadge from '../components/StatusBadge';
import TicketForm from '../components/TicketForm';

export default function Support() {
  const { t, date } = useI18n();
  const { customer, headers } = useCustomer();
  const [tickets, setTickets] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const authHeader = headers.Authorization;

  useEffect(() => {
    let alive = true;
    if (!authHeader) {
      setTickets(guestTickets().map((item) => ({ ...item, guest: true })));
      return undefined;
    }
    api
      .get('/tickets/mine', { headers: { Authorization: authHeader } })
      .then((res) => alive && setTickets((res.data.data || []).map((item) => ({ ...item, id: item._id }))))
      .catch(() => alive && setTickets([]));
    return () => {
      alive = false;
    };
  }, [authHeader, refresh]);

  return (
    <>
      <PageHead title={t('support.title')} subtitle={t('support.subtitle')} />
      <section className="container-x grid gap-8 pb-24 lg:grid-cols-[1.35fr_1fr]">
        <Tile cut={28} faceClassName="p-8 md:p-10">
          {!customer ? (
            <p className="mb-6 text-sm leading-7 text-muted">
              {t('support.guestNote')}{' '}
              <Link to="/login" state={{ from: '/support' }} className="font-semibold text-lapis underline-offset-4 hover:underline dark:text-turq">
                {t('auth.login')}
              </Link>
            </p>
          ) : null}
          <TicketForm onCreated={() => setRefresh((n) => n + 1)} />
        </Tile>

        <Tile cut={24} className="self-start" faceClassName="p-8">
          <h2 className="font-display text-xl font-bold">{t('support.myTickets')}</h2>
          {!tickets.length ? <p className="mt-5 text-muted">{t('account.noTickets')}</p> : null}
          <ul className="mt-5 grid divide-y divide-line/60">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <Link to={ticketLink(ticket)} className="flex flex-wrap items-center justify-between gap-3 py-4 transition hover:text-turq">
                  <span>
                    <span className="block font-semibold">{ticket.subject}</span>
                    <span className="text-sm text-muted">
                      {t('support.number', { number: ticket.number })} · {date(ticket.lastActivityAt || ticket.createdAt)}
                    </span>
                  </span>
                  {ticket.status ? <StatusBadge status={ticket.status} /> : null}
                </Link>
              </li>
            ))}
          </ul>
        </Tile>
      </section>
    </>
  );
}
