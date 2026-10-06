import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck, FaDownload, FaShoppingBag } from 'react-icons/fa';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import { useCustomer } from '../context/CustomerContext';
import Button from './Button';

let gatewayRequest = null;
const purchaseRequests = new Map();

export function visitorId() {
  try {
    let id = window.localStorage.getItem('visitor_id');
    if (!id) {
      id = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem('visitor_id', id);
    }
    return id;
  } catch (e) {
    return '';
  }
}

function gatewayOnline() {
  if (!gatewayRequest) {
    gatewayRequest = api
      .get('/store/gateway')
      .then((res) => Boolean(res.data && res.data.online))
      .catch(() => false);
  }
  return gatewayRequest;
}

// شناسه‌ی محصولاتی که این کاربر خریده (یک بار برای هر حساب گرفته می‌شه)
function purchasedIds(token) {
  if (!token) return Promise.resolve(new Set());
  if (!purchaseRequests.has(token)) {
    purchaseRequests.set(
      token,
      api
        .get('/store/orders/mine', { headers: { Authorization: `Bearer ${token}` } })
        .then(
          (res) =>
            new Set(
              (res.data.data || [])
                .filter((o) => o.status === 'paid')
                .flatMap((o) => (o.items || []).map((item) => String((item.product && item.product._id) || item.product))),
            ),
        )
        .catch(() => new Set()),
    );
  }
  return purchaseRequests.get(token);
}

export function trackProductView(product) {
  if (!product || !product._id) return;
  api.post(`/store/products/${product._id}/view`, { visitorId: visitorId() }).catch(() => {});
}

// دکمه‌های دانلود/خرید برای اپلیکیشن‌ها و فایل‌ها
export default function ProductActions({ product, size = 'card' }) {
  const { t, number } = useI18n();
  const { customer, token, headers } = useCustomer();
  const navigate = useNavigate();
  const [online, setOnline] = useState(false);
  const [owned, setOwned] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const paid = Number(product.price) > 0;

  useEffect(() => {
    let alive = true;
    gatewayOnline().then((value) => alive && setOnline(value));
    purchasedIds(token).then((ids) => alive && setOwned(ids.has(String(product._id))));
    return () => {
      alive = false;
    };
  }, [token, product._id]);

  const toLogin = () => navigate('/login', { state: { from: '/shop' } });

  const buy = async () => {
    setMessage('');
    if (!customer) return toLogin();
    if (!online) return setMessage(t('shop.gatewayOff'));
    setBusy(true);
    try {
      const res = await api.post('/store/orders', { productId: product._id }, { headers });
      window.location.assign(res.data.payUrl);
    } catch (err) {
      const code = err.response && err.response.data && err.response.data.code;
      if (code === 'ALREADY_PURCHASED') {
        purchaseRequests.clear();
        setOwned(true);
      } else setMessage(code === 'GATEWAY_NOT_CONFIGURED' ? t('shop.gatewayOff') : t('shop.payError'));
      setBusy(false);
    }
    return undefined;
  };

  const download = async () => {
    setMessage('');
    setBusy(true);
    try {
      const res = await api.post(`/store/products/${product._id}/download`, { visitorId: visitorId() }, { headers });
      window.location.assign(res.data.url);
    } catch (err) {
      const code = err.response && err.response.data && err.response.data.code;
      if (code === 'LOGIN_REQUIRED') toLogin();
      else if (code === 'PURCHASE_REQUIRED') await buy();
      else setMessage(t('auth.error.generic'));
    } finally {
      setBusy(false);
    }
  };

  const canDownload = !paid || owned;

  return (
    <div className={size === 'card' ? 'relative z-10 mt-4 flex flex-wrap items-center gap-3' : 'flex flex-wrap items-center gap-3'}>
      {canDownload ? (
        <Button onClick={download} disabled={busy} icon={<FaDownload aria-hidden="true" />}>
          {paid ? t('shop.download') : t('shop.freeDownload')}
        </Button>
      ) : (
        <Button onClick={buy} disabled={busy} icon={<FaShoppingBag aria-hidden="true" />}>
          {t('shop.buy')}
        </Button>
      )}
      {owned && paid ? (
        <span className="chip !text-xs text-turq">
          <FaCheck aria-hidden="true" /> {t('shop.purchased')}
        </span>
      ) : null}
      {product.downloadCount ? <span className="text-xs text-muted">{t('shop.downloads', { count: number(product.downloadCount) })}</span> : null}
      {message ? (
        <p role="status" className="w-full text-sm leading-7 text-saffron">
          {message}{' '}
          {message === t('shop.gatewayOff') ? (
            <Link to="/support" className="font-semibold underline underline-offset-4">
              {t('chat.link.support')}
            </Link>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
