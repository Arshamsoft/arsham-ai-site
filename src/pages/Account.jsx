import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import { useCustomer } from '../context/CustomerContext';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import FormField, { FormMessage } from '../components/FormField';
import { authErrorText } from './Login';
import ProductActions from '../components/ProductActions';

export default function Account() {
  const { t, date, pick, number } = useI18n();
  const { customer, ready, headers, updateProfile, changePassword, logout } = useCustomer();
  const location = useLocation();
  const [profile, setProfile] = useState({ name: '', phone: '' });
  const [profileMsg, setProfileMsg] = useState({ tone: 'success', text: '' });
  const [passwords, setPasswords] = useState({ current: '', next: '' });
  const [passwordMsg, setPasswordMsg] = useState({ tone: 'success', text: '' });
  const [tickets, setTickets] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (customer) setProfile({ name: customer.name || '', phone: customer.phone || '' });
  }, [customer]);

  const authHeader = headers.Authorization;
  useEffect(() => {
    if (!authHeader) return undefined;
    let alive = true;
    api
      .get('/tickets/mine', { headers: { Authorization: authHeader } })
      .then((res) => alive && setTickets(res.data.data || []))
      .catch(() => alive && setTickets([]));
    api
      .get('/store/orders/mine', { headers: { Authorization: authHeader } })
      .then((res) => alive && setOrders((res.data.data || []).filter((o) => o.status === 'paid')))
      .catch(() => alive && setOrders([]));
    return () => {
      alive = false;
    };
  }, [authHeader]);

  if (!ready) return <div className="container-x py-24" aria-busy="true" />;
  if (!customer) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  const saveProfile = async (event) => {
    event.preventDefault();
    try {
      await updateProfile({ name: profile.name.trim(), phone: profile.phone.trim() });
      setProfileMsg({ tone: 'success', text: t('account.saved') });
    } catch (err) {
      setProfileMsg({ tone: 'error', text: authErrorText(t, err) });
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    try {
      await changePassword(passwords.current, passwords.next);
      setPasswords({ current: '', next: '' });
      setPasswordMsg({ tone: 'success', text: t('account.passwordChanged') });
    } catch (err) {
      setPasswordMsg({ tone: 'error', text: authErrorText(t, err) });
    }
  };

  return (
    <>
      <PageHead title={t('account.hello', { name: customer.name })} subtitle={customer.email} />
      <section className="container-x grid gap-8 pb-24 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid content-start gap-6">
          <Tile cut={24} faceClassName="p-8">
            <h2 className="font-display text-xl font-bold">{t('account.profile')}</h2>
            <form onSubmit={saveProfile} className="mt-6 grid gap-5">
              <FormField label={t('auth.name')}>
                <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className="field" required />
              </FormField>
              <FormField label={t('account.phone')}>
                <input value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className="field text-left" dir="ltr" />
              </FormField>
              <FormMessage tone={profileMsg.tone}>{profileMsg.text}</FormMessage>
              <div>
                <Button type="submit">{t('account.save')}</Button>
              </div>
            </form>
          </Tile>

          <Tile cut={24} faceClassName="p-8">
            <h2 className="font-display text-xl font-bold">{t('account.changePassword')}</h2>
            <form onSubmit={savePassword} className="mt-6 grid gap-5">
              <FormField label={t('account.currentPassword')}>
                <input type="password" autoComplete="current-password" dir="ltr" value={passwords.current} onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))} className="field text-left" required />
              </FormField>
              <FormField label={t('account.newPassword')} hint={t('auth.passwordHint')}>
                <input type="password" autoComplete="new-password" dir="ltr" minLength={8} value={passwords.next} onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))} className="field text-left" required />
              </FormField>
              <FormMessage tone={passwordMsg.tone}>{passwordMsg.text}</FormMessage>
              <div>
                <Button type="submit" variant="ghost">
                  {t('account.changePassword')}
                </Button>
              </div>
            </form>
          </Tile>

          <div>
            <Button variant="ghost" onClick={logout} icon={<FaSignOutAlt aria-hidden="true" />}>
              {t('auth.logout')}
            </Button>
          </div>
        </div>

        <Tile cut={24} className="self-start" faceClassName="p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-xl font-bold">{t('account.myTickets')}</h2>
            <Button to="/support" icon={<FaPlus aria-hidden="true" />}>
              {t('account.newTicket')}
            </Button>
          </div>
          {tickets && !tickets.length ? <p className="mt-6 text-muted">{t('account.noTickets')}</p> : null}
          {tickets && tickets.length ? (
            <ul className="mt-6 grid divide-y divide-line/60">
              {tickets.map((ticket) => (
                <li key={ticket._id}>
                  <Link to={`/support/${ticket._id}`} className="flex flex-wrap items-center justify-between gap-3 py-4 transition hover:text-turq">
                    <span>
                      <span className="block font-semibold">{ticket.subject}</span>
                      <span className="text-sm text-muted">
                        {t('support.number', { number: ticket.number })} · {date(ticket.lastActivityAt || ticket.createdAt)}
                      </span>
                    </span>
                    <StatusBadge status={ticket.status} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          <h2 className="mt-12 font-display text-xl font-bold">{t('account.purchases')}</h2>
          {orders && !orders.length ? <p className="mt-6 text-muted">{t('account.noPurchases')}</p> : null}
          {orders && orders.length ? (
            <ul className="mt-6 grid gap-5">
              {orders.flatMap((order) =>
                (order.items || [])
                  .filter((item) => item.product)
                  .map((item) => (
                    <li key={`${order._id}-${item.product._id}`} className="border-t border-line/60 pt-5">
                      <p className="font-semibold">{pick(item.product, 'title')}</p>
                      <p className="mt-1 text-sm text-muted">
                        #{order.number} · {date(order.paidAt)} · {number(item.price)} {t('shop.currency')}
                      </p>
                      {item.product.hasFile ? <ProductActions product={{ ...item.product, price: item.price, hasFile: true }} size="full" /> : null}
                    </li>
                  )),
              )}
            </ul>
          ) : null}
        </Tile>
      </section>
    </>
  );
}
