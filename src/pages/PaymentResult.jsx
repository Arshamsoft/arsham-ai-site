import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import api from '../lib/api';
import { useI18n } from '../context/LanguageContext';
import { useCustomer } from '../context/CustomerContext';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import ProductActions from '../components/ProductActions';

// برگشت از درگاه پرداخت
export default function PaymentResult() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const ok = params.get('status') === 'paid';
  const orderId = params.get('order') || '';
  const { t, pick } = useI18n();
  const { headers, ready } = useCustomer();
  const authHeader = headers.Authorization;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!ready || !orderId || !authHeader) return undefined;
    let alive = true;
    api
      .get(`/store/orders/${orderId}`, { headers: { Authorization: authHeader } })
      .then((res) => alive && setOrder(res.data))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [ready, orderId, authHeader]);

  const item = order && order.items && order.items[0];
  const product = item && item.product ? { ...item.product, price: item.price, hasFile: true } : null;

  return (
    <>
      <PageHead title={ok ? t('pay.successTitle') : t('pay.failedTitle')} />
      <section className="container-x pb-24">
        <Tile cut={28} className="max-w-2xl" faceClassName="p-8 md:p-10">
          <div className="flex items-start gap-4">
            {ok ? <FaCheckCircle aria-hidden="true" className="mt-1 flex-none text-3xl text-turq" /> : <FaTimesCircle aria-hidden="true" className="mt-1 flex-none text-3xl text-red-500" />}
            <div>
              <p className="leading-8">{ok ? t('pay.successText', { number: order ? order.number : '' }) : t('pay.failedText')}</p>
              {ok && product ? <p className="mt-2 font-bold">{pick(product, 'title')}</p> : null}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {ok && product ? <ProductActions product={product} size="full" /> : null}
            <Button to={ok ? '/account' : '/shop'} variant="ghost">
              {ok ? t('account.purchases') : t('pay.tryAgain')}
            </Button>
          </div>
        </Tile>
      </section>
    </>
  );
}
