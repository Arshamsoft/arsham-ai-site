import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { useI18n } from '../context/LanguageContext';
import { useCustomer } from '../context/CustomerContext';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import FormField, { FormMessage } from '../components/FormField';
import { authErrorText } from './Login';

export default function Register() {
  const { t, lang } = useI18n();
  const { register } = useCustomer();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const next = (location.state && location.state.from) || '/account';
  const set = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password, lang });
      navigate(next, { replace: true });
    } catch (err) {
      setError(authErrorText(t, err));
      setBusy(false);
    }
  };

  return (
    <>
      <PageHead title={t('auth.registerTitle')} subtitle={t('auth.registerSubtitle')} />
      <section className="container-x pb-24">
        <Tile cut={28} className="mx-auto max-w-xl" faceClassName="p-8 md:p-10">
          <form onSubmit={submit} className="grid gap-6">
            <FormField label={t('auth.name')}>
              <input type="text" required autoComplete="name" value={form.name} onChange={set('name')} className="field" />
            </FormField>
            <FormField label={t('auth.email')}>
              <input type="email" required autoComplete="email" dir="ltr" value={form.email} onChange={set('email')} className="field text-left" />
            </FormField>
            <FormField label={t('auth.password')} hint={t('auth.passwordHint')}>
              <input type="password" required minLength={8} autoComplete="new-password" dir="ltr" value={form.password} onChange={set('password')} className="field text-left" />
            </FormField>
            <FormMessage>{error}</FormMessage>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button type="submit" disabled={busy} icon={<FaUserPlus aria-hidden="true" />}>
                {t('auth.register')}
              </Button>
              <p className="text-sm text-muted">
                {t('auth.haveAccount')}{' '}
                <Link to="/login" state={location.state} className="font-semibold text-lapis underline-offset-4 hover:underline dark:text-turq">
                  {t('auth.login')}
                </Link>
              </p>
            </div>
          </form>
        </Tile>
      </section>
    </>
  );
}
