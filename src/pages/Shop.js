import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaBoxOpen, FaSearch, FaTimes } from 'react-icons/fa';
import api from '../lib/api';
import { useContent } from '../context/ContentContext';
import { HEADER_DEFAULTS, faNumber, listFrom } from '../lib/helpers';
import PageHead from '../components/PageHead';
import Tile from '../components/Tile';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import SkeletonGrid from '../components/SkeletonGrid';
import StateMessage from '../components/StateMessage';

function discountOf(product) {
  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;
  return oldPrice > price && price > 0 ? Math.round((1 - price / oldPrice) * 100) : 0;
}

export default function Shop() {
  const { content } = useContent();
  const labels = { ...HEADER_DEFAULTS, ...(content.header || {}) };
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    api
      .get('/products', { params: { limit: 100 } })
      .then((res) => {
        if (!alive) return;
        setProducts(listFrom(res));
        setStatus('ready');
      })
      .catch(() => {
        if (alive) setStatus('error');
      });
    return () => {
      alive = false;
    };
  }, [attempt]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category).filter(Boolean))], [products]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!needle) return true;
      return `${p.title || ''} ${p.description || ''}`.toLowerCase().includes(needle);
    });
  }, [products, query, category]);

  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <PageHead title={labels.shop} subtitle="محصولات و نرم‌افزارهای آماده‌ی آرشام" />

      <section className="container-x pb-24">
        {status === 'ready' && products.length ? (
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full md:max-w-sm">
              <span className="sr-only">جستجو در محصولات</span>
              <FaSearch aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجو در محصولات"
                className="field ps-11"
              />
            </label>
            {categories.length > 1 ? (
              <div className="flex flex-wrap gap-2" role="group" aria-label="دسته‌بندی">
                <button type="button" className={`chip${category ? '' : ' chip-on'}`} onClick={() => setCategory('')} aria-pressed={!category}>
                  همه
                </button>
                {categories.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={`chip${category === name ? ' chip-on' : ''}`}
                    onClick={() => setCategory(name)}
                    aria-pressed={category === name}
                  >
                    {name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {status === 'loading' ? <SkeletonGrid /> : null}

        {status === 'error' ? (
          <StateMessage
            title="محصولات بارگذاری نشد"
            text="اتصال اینترنت را بررسی کنید و دوباره امتحان کنید."
            action={
              <Button variant="ghost" onClick={() => setAttempt((n) => n + 1)}>
                تلاش دوباره
              </Button>
            }
          />
        ) : null}

        {status === 'ready' && !products.length ? (
          <StateMessage
            title="هنوز محصولی در فروشگاه ثبت نشده"
            text="برای سفارش نرم‌افزار اختصاصی، با ما تماس بگیرید."
            action={<Button to="/contact">تماس با ما</Button>}
          />
        ) : null}

        {status === 'ready' && products.length && !visible.length ? (
          <StateMessage
            title="محصولی با این مشخصات پیدا نشد"
            text="عبارت جستجو یا دسته‌بندی را تغییر دهید."
            action={
              <Button
                variant="ghost"
                onClick={() => {
                  setQuery('');
                  setCategory('');
                }}
              >
                نمایش همه‌ی محصولات
              </Button>
            }
          />
        ) : null}

        {visible.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product, index) => (
              <Reveal key={product._id || product.title} delay={(index % 3) * 80} className="h-full">
                <ProductCard product={product} onOpen={setActive} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      {active ? <ProductModal product={active} onClose={close} /> : null}
    </>
  );
}

function ProductCard({ product, onOpen }) {
  const off = discountOf(product);
  return (
    <Tile as="article" hover cut={22} className="group h-full" faceClassName="flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-raised">
        {product.image ? (
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted">
            <FaBoxOpen size={40} aria-hidden="true" />
          </div>
        )}
        {off > 0 ? <span className="badge badge-off">{faNumber(off)}٪ تخفیف</span> : null}
        {product.inStock === false ? <span className="badge badge-out">ناموجود</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {product.category ? <span className="text-sm text-muted">{product.category}</span> : null}
        <h3 className="mt-1 text-lg font-bold leading-8">
          <button type="button" onClick={() => onOpen(product)} className="text-start after:absolute after:inset-0 after:content-['']">
            {product.title}
          </button>
        </h3>
        {product.description ? <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted">{product.description}</p> : null}
        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <p>
            <span className="font-display text-xl font-extrabold">{faNumber(product.price)}</span>{' '}
            <span className="text-sm text-muted">تومان</span>
          </p>
          {off > 0 ? <del className="text-sm text-muted">{faNumber(product.oldPrice)}</del> : null}
        </div>
      </div>
    </Tile>
  );
}

function ProductModal({ product, onClose }) {
  const images = [product.image, ...(Array.isArray(product.gallery) ? product.gallery : [])].filter(Boolean);
  const [current, setCurrent] = useState(images[0] || '');
  const closeRef = useRef(null);
  const off = discountOf(product);
  const specs =
    product.specifications && typeof product.specifications === 'object' && !Array.isArray(product.specifications)
      ? Object.entries(product.specifications)
      : [];

  useEffect(() => {
    const previous = document.activeElement;
    const root = document.documentElement;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    root.classList.add('modal-lock');
    document.addEventListener('keydown', onKey);
    if (closeRef.current) closeRef.current.focus();
    return () => {
      root.classList.remove('modal-lock');
      document.removeEventListener('keydown', onKey);
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="product-title" className="modal-panel">
        <Tile cut={28} faceClassName="max-h-[88vh] overflow-y-auto">
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            <div className="bg-raised/60 p-4">
              {current ? (
                <img src={current} alt={product.title} className="aspect-square w-full object-contain" />
              ) : (
                <div className="grid aspect-square place-items-center text-muted">
                  <FaBoxOpen size={56} aria-hidden="true" />
                </div>
              )}
              {images.length > 1 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {images.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => setCurrent(src)}
                      aria-label={`تصویر ${index + 1}`}
                      className={`h-16 w-16 overflow-hidden border-2 transition ${src === current ? 'border-turq' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative flex flex-col p-7 md:p-9">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="absolute end-4 top-4 grid h-10 w-10 place-items-center text-muted transition hover:text-fg"
              >
                <FaTimes aria-hidden="true" />
              </button>
              {product.category ? <span className="text-sm text-muted">{product.category}</span> : null}
              <h2 id="product-title" className="mt-1 pe-10 font-display text-2xl font-extrabold leading-10">
                {product.title}
              </h2>
              <p className="mt-5">
                <span className="font-display text-3xl font-extrabold">{faNumber(product.price)}</span>{' '}
                <span className="text-muted">تومان</span>
                {off > 0 ? <del className="ms-3 text-muted">{faNumber(product.oldPrice)}</del> : null}
              </p>
              {product.inStock === false ? <p className="mt-2 font-semibold text-saffron">فعلاً ناموجود است</p> : null}
              {product.description ? <p className="mt-6 whitespace-pre-line leading-8 text-fg/85">{product.description}</p> : null}

              {specs.length ? (
                <dl className="mt-7 grid gap-px overflow-hidden border border-line/60 bg-line/60">
                  {specs.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[auto_1fr] gap-4 bg-surface px-4 py-3 text-sm">
                      <dt className="text-muted">{key}</dt>
                      <dd className="text-end font-semibold">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {product.video ? (
                <video controls preload="none" className="mt-7 w-full bg-black/40">
                  <source src={product.video} />
                  مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                </video>
              ) : null}

              <div className="mt-auto pt-8">
                <Button to="/contact">سفارش این محصول</Button>
              </div>
            </div>
          </div>
        </Tile>
      </div>
    </div>,
    document.body,
  );
}
