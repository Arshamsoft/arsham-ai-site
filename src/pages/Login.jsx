import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { useI18n } from '../context/LanguageContext';
import { errorCode, useCustomer } from '../context/CustomerContext';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import FormField, { FormMessage } from '../components/FormField';

export function authErrorText(t, err) {
  const text = t(`auth.error.${errorCode(err)}`);
  return text.startsWith('auth.error.') ? t('auth.error.generic') : text;
}

export default function Login() {
  const { t } = useI18n();
  const { login } = useCustomer();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const next = (location.state && location.state.from) || '/account';

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email.trim(), password);
      navigate(next, { replace: true });
    } catch (err) {
      setError(authErrorText(t, err));
      setBusy(false);
    }
  };

  return (
    <>
      <PageHead title={t('auth.loginTitle')} subtitle={t('auth.loginSubtitle')} />
      <section className="container-x pb-24">
        <Tile cut={28} className="mx-auto max-w-xl" faceClassName="p-8 md:p-10">
          <form onSubmit={submit} className="grid gap-6">
            <FormField label={t('auth.email')}>
              <input type="email" required autoComplete="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} className="field text-left" />
            </FormField>
            <FormField label={t('auth.password')}>
              <input type="password" required autoComplete="current-password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} className="field text-left" />
            </FormField>
            <FormMessage>{error}</FormMessage>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button type="submit" disabled={busy} icon={<FaSignInAlt aria-hidden="true" />}>
                {t('auth.login')}
              </Button>
              <p className="text-sm text-muted">
                {t('auth.noAccount')}{' '}
                <Link to="/register" state={location.state} className="font-semibold text-lapis underline-offset-4 hover:underline dark:text-turq">
                  {t('auth.register')}
                </Link>
              </p>
            </div>
          </form>
        </Tile>
      </section>
    </>
  );
}
