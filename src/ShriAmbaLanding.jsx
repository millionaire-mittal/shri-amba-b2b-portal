import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Gem,
  Instagram,
  Layers,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
  Wallet,
  X,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Business config — edit these values before going live             */
/* ------------------------------------------------------------------ */
const BRAND = {
  name: 'Shri Amba Textiles',
  legalName: 'Shri Amba Textiles Pvt. Ltd.',
  label: 'SARVA',
  tagline: 'Business sirf products se nahi, trust se chalta hai.',
  taglineEn: 'Business runs not just on products — it runs on trust.',
  years: '25+',
  instagram: 'shriambatex',
  // TODO: replace with the real WhatsApp number (country code + number, digits only)
  whatsapp: '910000000000',
  address: {
    line1: 'Kucha Kabil Attar, Poonam Cloth Market',
    line2: 'Chandni Chowk, Delhi — 110006',
  },
  mapsQuery: 'Shri Amba Textiles, Kucha Kabil Attar, Chandni Chowk, Delhi',
  // TODO: confirm store hours and registration numbers
  hours: 'Mon – Sat · 10:30 AM – 7:30 PM',
  gstin: '07XXXXXXXXXXXZX',
  udyam: 'UDYAM-DL-XX-XXXXXXX',
};

const img = (name) => `/images/${name}.webp`;

// Catalogue brands stocked, as listed on @shriambatex
const CATALOGUE_BRANDS = ['Omtex', 'Jay Vijay', 'Kimora', 'Kesar', 'Varshaa', 'Salvi', 'Sargam', 'Sahiba'];

const COLLECTIONS = [
  {
    title: 'Premium Catalogue Suits',
    tag: 'Top catalogue brands',
    desc: 'Full catalogues from Omtex, Kimora, Sahiba, Jay Vijay and more — every design, one counter.',
    image: img('model-olive'),
  },
  {
    title: 'SARVA Non-Catalogue',
    tag: 'Fresh every week',
    desc: "Exclusive designs your customers won't find in every shop on the street. Better margins, fewer clashes.",
    image: img('model-navy'),
  },
  {
    title: 'Embroidered Winter Suits',
    tag: 'Winter Luxe',
    desc: 'Rich aari-style embroidery on warm, deep-toned bases with matching embroidered dupattas.',
    image: img('flat-plum-embroidered'),
  },
  {
    title: 'Cotton Block Prints',
    tag: 'Everyday Bestseller',
    desc: 'Hand-block printed cotton sets with kota dupattas — fast-moving stock for every season.',
    image: img('flat-block-print'),
  },
];

const FRESH_ARRIVALS = [
  { name: 'Teal Paisley Print', note: 'Printed dupatta · embroidered yoke', image: img('flat-teal-paisley') },
  { name: 'Peacock Kalamkari', note: 'Hand-painted look · 4 colours', image: img('flat-peacock-magenta') },
  { name: 'Noir Thread Embroidery', note: 'Tasselled dupatta · 4 colours', image: img('flat-black-embroidered') },
  { name: 'Midnight Paisley Panel', note: 'Kashmiri motif · 4 colours', image: img('flat-navy-kalamkari') },
  { name: 'Mocha Damask Print', note: 'All-over print · 2 colours', image: img('flat-mocha-printed') },
  { name: 'Plum Aari Embroidery', note: 'Floral jaal · 6 colours', image: img('flat-plum-embroidered') },
];

const LOOKBOOK = [
  img('model-aqua'),
  img('model-powder-blue'),
  img('model-rust'),
  img('model-beige'),
  img('model-mocha'),
  img('model-emerald'),
];

const VALUE_PROPS = [
  {
    icon: Wallet,
    title: 'Zero Heavy Investment',
    desc: 'Start or expand your shop without locking capital in bulk stock. Buy what sells, reorder when it does.',
  },
  {
    icon: Layers,
    title: 'Low MOQ',
    highlight: '8–10 Sets / 30–40 Pieces',
    desc: 'Retailer-friendly minimums so you can test new designs and keep your racks fresh every season.',
  },
  {
    icon: Store,
    title: 'Direct from Chandni Chowk',
    desc: "No middlemen. Source straight from Delhi's most trusted textile hub at true wholesale rates.",
  },
];

const PROMISES = [
  { icon: Gem, label: 'Exclusive non-catalogue designs' },
  { icon: TrendingUp, label: 'Better retail margins' },
  { icon: Truck, label: 'Pan-India wholesale supply' },
  { icon: Sparkles, label: 'Huge variety under one roof' },
];

const NAV = [
  ['Collections', 'collections'],
  ['Fresh Arrivals', 'fresh'],
  ['Showroom', 'showroom'],
];

const waLink = (text = '') =>
  `https://wa.me/${BRAND.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/* ------------------------------------------------------------------ */
/*  Small building blocks                                             */
/* ------------------------------------------------------------------ */

/** Fades + lifts children into view the first time they enter the viewport. */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function WhatsAppIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.46 9.48-9.46a9.4 9.4 0 0 1 6.7 2.78 9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.52A11.32 11.32 0 0 0 12.04.65C5.76.65.65 5.76.65 12.04c0 2 .53 3.97 1.53 5.7L.56 23.65l6.04-1.58a11.4 11.4 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.34-8.06z" />
    </svg>
  );
}

function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.35em] ${
        light ? 'text-gold-400' : 'text-gold-600'
      }`}
    >
      {children}
    </p>
  );
}

function SarvaMark({ className = '' }) {
  return (
    <span className={`font-serif italic tracking-[0.18em] ${className}`}>
      SARVA<sup className="ml-0.5 text-[0.5em] not-italic">®</sup>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function ShriAmbaLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [form, setForm] = useState({ name: '', business: '', phone: '', requirements: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const railRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const requestQuote = (item) => {
    setSubmitted(false);
    setErrors((e) => ({ ...e, requirements: undefined }));
    setForm((f) => ({
      ...f,
      requirements: `Interested in: ${item} — please share photos, available colours, MOQ & wholesale rates.`,
    }));
    scrollToId('contact');
  };

  const scrollRail = (dir) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.business.trim()) e.business = 'Please enter your shop / business name';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10)))
      e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.requirements.trim()) e.requirements = 'Tell us what you are looking for';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    // No backend in this demo — the inquiry is handed off to WhatsApp, pre-filled.
    const msg = `Namaste Shri Amba Textiles 🙏\n\nName: ${form.name}\nBusiness: ${form.business}\nPhone: ${form.phone}\n\nRequirement:\n${form.requirements}`;
    window.open(waLink(msg), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const field = (key) => ({
    id: key,
    name: key,
    value: form[key],
    onChange: (e) => {
      setForm({ ...form, [key]: e.target.value });
      if (errors[key]) setErrors({ ...errors, [key]: undefined });
    },
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  const inputClass = (key) =>
    `peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-6 text-[15px] text-midnight-900 placeholder-transparent outline-none transition-colors focus:ring-0 ${
      errors[key] ? 'border-red-400 focus:border-red-500' : 'border-midnight-900/15 focus:border-gold-500'
    }`;

  const labelClass =
    'pointer-events-none absolute left-0 top-1.5 text-[11px] uppercase tracking-[0.2em] text-midnight-900/50 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-gold-600';

  return (
    <div className="min-h-screen overflow-x-clip bg-ivory-50 font-sans text-midnight-900">
      {/* ============ Announcement bar ============ */}
      <div className="relative z-50 animate-shimmer bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 bg-[length:200%_100%] text-midnight-950">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[11px] font-medium tracking-[0.12em] sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          This is a Custom Demo Website Built for Shri Amba Textiles.
        </p>
      </div>

      {/* ============ Sticky header ============ */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'border-b border-gold-500/15 bg-midnight-950/90 py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'bg-midnight-950 py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="group flex min-w-0 items-center gap-3" aria-label={BRAND.name}>
            <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold-500/60 font-serif text-lg text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-midnight-950">
              SA
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-xl tracking-wide text-gold-400 sm:text-2xl">
                Shri Amba Textiles
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.3em] text-ivory-100/50 sm:block">
                Home of <SarvaMark className="text-gold-300/80 normal-case" /> · Chandni Chowk
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="relative text-[13px] tracking-wide text-ivory-100/70 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:transition-all hover:text-gold-400 hover:after:w-full"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => scrollToId('contact')}
              className="group inline-flex items-center gap-2 border border-gold-500 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400 transition-all duration-300 hover:bg-gold-500 hover:text-midnight-950 sm:px-5 sm:text-[12px]"
            >
              Contact Us
              <ArrowRight className="hidden h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:block" />
            </button>
            <button
              className="text-ivory-100/80 lg:hidden"
              onClick={() => setMobileNav((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileNav}
            >
              {mobileNav ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileNav && (
          <div className="border-t border-gold-500/15 bg-midnight-950 lg:hidden">
            {[...NAV, ['Contact', 'contact']].map(([label, id]) => (
              <button
                key={id}
                onClick={() => {
                  setMobileNav(false);
                  scrollToId(id);
                }}
                className="block w-full px-6 py-4 text-left font-serif text-lg text-ivory-100/80 hover:text-gold-400"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main id="top">
        {/* ============ Hero ============ */}
        <section className="relative overflow-hidden bg-midnight-950">
          <div className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-6 hidden border border-gold-500/10 lg:block" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-16 sm:px-8 lg:min-h-[calc(100vh-110px)] lg:grid-cols-[1.1fr_1fr] lg:py-20">
            <div>
              <Reveal>
                <div className="mb-8 inline-flex items-center gap-3 border border-gold-500/30 bg-midnight-900/60 px-4 py-2">
                  <BadgeCheck className="h-4 w-4 text-gold-400" />
                  <span className="text-[11px] uppercase tracking-[0.25em] text-ivory-100/80">
                    {BRAND.years} Years · Chandni Chowk, Delhi
                  </span>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <h1 className="font-serif text-5xl font-light leading-[1.05] text-ivory-50 sm:text-6xl xl:text-[5.25rem]">
                  Premium suits,
                  <br />
                  <span className="italic text-gold-400">wholesale-priced</span>
                  <br />
                  for India's boutiques.
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-ivory-100/70 sm:text-lg">
                  Top catalogue brands and our own exclusive <SarvaMark className="text-gold-300" />{' '}
                  non-catalogue designs, under one roof — sourced straight from Chandni Chowk, with
                  minimums made for growing retailers.
                </p>
              </Reveal>

              <Reveal delay={450}>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    onClick={() => scrollToId('contact')}
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-gold-500 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-midnight-950 shadow-[0_20px_50px_-15px_rgba(201,165,90,0.6)] transition-all duration-300 hover:bg-gold-400"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative">Unlock Wholesale Pricing</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => scrollToId('fresh')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-[13px] uppercase tracking-[0.2em] text-ivory-100/80 transition-colors hover:text-gold-400"
                  >
                    This Week's Arrivals
                  </button>
                </div>
              </Reveal>

              <Reveal delay={600}>
                <dl className="mt-16 grid max-w-xl grid-cols-3 divide-x divide-gold-500/20 border-t border-gold-500/20 pt-8">
                  {[
                    [BRAND.years, 'Years in trade'],
                    ['8–10', 'Sets MOQ'],
                    ['8+', 'Catalogue brands'],
                  ].map(([k, v]) => (
                    <div key={v} className="px-3 first:pl-0 sm:px-4">
                      <dt className="font-serif text-3xl text-gold-400 sm:text-4xl">{k}</dt>
                      <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ivory-100/50 sm:text-[11px]">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Collage of real collection photography */}
            <Reveal delay={300} className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative ml-auto w-[78%]">
                <div className="absolute -right-4 -top-4 h-full w-full border border-gold-500/40" />
                <img
                  src={img('model-emerald')}
                  alt="Emerald printed suit with paisley dupatta"
                  width="900"
                  height="1126"
                  className="relative aspect-[4/5] w-full object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
                />
              </div>
              <div className="absolute -bottom-10 left-0 w-[44%] border-4 border-midnight-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
                <img
                  src={img('model-rust')}
                  alt="Rust embroidered suit with printed dupatta"
                  width="900"
                  height="1126"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -left-2 top-8 hidden items-center gap-3 bg-ivory-50 px-4 py-3 shadow-xl sm:flex">
                <Instagram className="h-5 w-5 text-gold-600" />
                <div className="leading-tight">
                  <p className="flex items-center gap-1 text-sm font-semibold text-midnight-900">
                    @{BRAND.instagram}
                    <BadgeCheck className="h-4 w-4 fill-sky-500 text-white" />
                  </p>
                  <p className="text-[11px] text-midnight-900/50">New drops every week</p>
                </div>
              </div>
            </Reveal>
          </div>

          <button
            onClick={() => scrollToId('brands')}
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory-100/40 transition-colors hover:text-gold-400 lg:flex"
            aria-label="Scroll down"
          >
            <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </section>

        {/* ============ Catalogue brand marquee ============ */}
        <section id="brands" className="border-y border-gold-500/20 bg-ivory-100 py-10">
          <p className="text-center text-[11px] uppercase tracking-[0.35em] text-midnight-900/50">
            Premium catalogue collections · all under one roof
          </p>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
              {[...CATALOGUE_BRANDS, ...CATALOGUE_BRANDS].map((b, i) => (
                <span key={i} className="flex items-center" aria-hidden={i >= CATALOGUE_BRANDS.length}>
                  <span className="px-8 font-serif text-3xl italic text-midnight-900/80 sm:px-12 sm:text-4xl">
                    {b}
                  </span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                </span>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-midnight-900/50">& many more catalogue houses</p>
        </section>

        {/* ============ Trust ============ */}
        <section id="trust" className="relative overflow-hidden bg-ivory-50 py-28 sm:py-36">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(201,165,90,0.08) 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, rgba(201,165,90,0.08) 0 1px, transparent 1px 14px)',
            }}
          />
          <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
            <Reveal>
              <Eyebrow>Our Founding Belief</Eyebrow>
              <Ornament className="mt-6" />
            </Reveal>

            <Reveal delay={150}>
              <Quote className="mx-auto mt-12 h-10 w-10 text-gold-500/60" strokeWidth={1} />
              <blockquote className="mt-8 font-serif text-4xl font-light italic leading-[1.2] text-midnight-900 sm:text-5xl lg:text-6xl">
                “Business sirf products se nahi,{' '}
                <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-clip-text not-italic text-transparent">
                  trust
                </span>{' '}
                se chalta hai.”
              </blockquote>
              <p className="mx-auto mt-8 max-w-xl text-sm uppercase tracking-[0.25em] text-midnight-900/45">
                {BRAND.taglineEn}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mx-auto mt-16 grid max-w-3xl gap-10 border-t border-midnight-900/10 pt-12 text-left sm:grid-cols-2">
                <p className="leading-relaxed text-midnight-900/70">
                  For over two and a half decades, boutique owners and retailers have walked into our
                  Chandni Chowk showroom not just for suits — but for a relationship. Honest pricing,
                  consistent quality and a word that is always kept.
                </p>
                <div className="space-y-4">
                  {[
                    'Transparent wholesale pricing — no hidden margins',
                    'Every piece checked before dispatch',
                    'Relationships that span generations of retailers',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.5} />
                      <span className="text-sm text-midnight-900/80">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ Value proposition ============ */}
        <section id="value" className="bg-midnight-950 py-28 text-ivory-50 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow light>The Wholesale Advantage</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl font-light leading-snug sm:text-5xl">
                “Har retailer ki ek hi tension hoti hai —{' '}
                <span className="italic text-gold-400">
                  latest designs, premium quality aur wholesale prices.
                </span>
                ”
              </h2>
              <p className="mt-6 text-ivory-100/60">
                We built our business around solving all three — for boutiques, family shops and new
                online sellers alike.
              </p>
            </Reveal>

            <div className="mt-20 grid gap-px overflow-hidden border border-gold-500/15 bg-gold-500/15 md:grid-cols-3">
              {VALUE_PROPS.map(({ icon: Icon, title, highlight, desc }, i) => (
                <Reveal key={title} delay={i * 150} className="h-full">
                  <div className="group relative h-full bg-midnight-950 p-10 transition-colors duration-500 hover:bg-midnight-900 lg:p-12">
                    <span className="absolute right-8 top-8 font-serif text-6xl text-gold-500/10 transition-colors duration-500 group-hover:text-gold-500/20">
                      0{i + 1}
                    </span>
                    <div className="grid h-16 w-16 place-items-center border border-gold-500/40 text-gold-400 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-midnight-950">
                      <Icon className="h-7 w-7" strokeWidth={1.25} />
                    </div>
                    <h3 className="mt-10 font-serif text-2xl text-ivory-50 lg:text-3xl">{title}</h3>
                    {highlight && (
                      <p className="mt-2 text-sm font-medium tracking-wide text-gold-400">{highlight}</p>
                    )}
                    <p className="mt-4 leading-relaxed text-ivory-100/55">{desc}</p>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-gold-400 transition-all duration-700 group-hover:w-full" />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <ul className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
                {PROMISES.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-ivory-100/75">
                    <Icon className="h-5 w-5 shrink-0 text-gold-400" strokeWidth={1.5} />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ============ Collections ============ */}
        <section id="collections" className="scroll-mt-20 bg-ivory-50 py-28 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Signature Collections</Eyebrow>
                <h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl">
                  Curated for the <span className="italic text-gold-600">discerning</span> counter
                </h2>
              </div>
              <p className="max-w-sm text-midnight-900/60">
                Pricing is shared exclusively with verified retailers. Pick a collection to request
                your bulk quote.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {COLLECTIONS.map((c, i) => (
                <Reveal key={c.title} delay={i * 120}>
                  <article className="group relative aspect-[4/5] overflow-hidden bg-midnight-900">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      width="900"
                      height="1126"
                      className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/30 to-transparent" />
                    <div className="absolute inset-0 bg-midnight-950/0 transition-colors duration-500 group-hover:bg-midnight-950/50" />
                    <div className="pointer-events-none absolute inset-4 border border-gold-400/0 transition-all duration-700 group-hover:inset-5 group-hover:border-gold-400/50" />

                    <span className="absolute left-5 top-5 bg-ivory-50/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-midnight-900 backdrop-blur">
                      {c.tag}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-serif text-2xl leading-tight text-ivory-50 xl:text-[1.7rem]">{c.title}</h3>
                      <p className="mt-3 max-h-28 text-sm leading-relaxed text-ivory-100/75 transition-all duration-500 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-28 lg:group-hover:opacity-100">
                        {c.desc}
                      </p>
                      <button
                        onClick={() => requestQuote(c.title)}
                        className="mt-5 inline-flex items-center gap-2 bg-gold-500 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-midnight-950 transition-all duration-500 hover:bg-gold-400 lg:translate-y-4 lg:opacity-0 lg:focus:translate-y-0 lg:focus:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                      >
                        Request Bulk Quote
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Fresh arrivals rail ============ */}
        <section id="fresh" className="scroll-mt-20 overflow-hidden bg-ivory-100 py-28 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <Eyebrow>Fresh Non-Catalogue · This Week</Eyebrow>
                <h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl">
                  Designs your customers{' '}
                  <span className="italic text-gold-600">won't find everywhere</span>
                </h2>
                <p className="mt-5 text-midnight-900/60">
                  Every week, a fresh drop of exclusive unstitched suits — premium fabrics, finished
                  well, priced to give you better retail margins. Limited sets per design.
                </p>
              </div>
              <div className="flex gap-3">
                {[
                  [-1, ArrowLeft, 'Previous designs'],
                  [1, ArrowRight, 'Next designs'],
                ].map(([dir, Icon, label]) => (
                  <button
                    key={label}
                    onClick={() => scrollRail(dir)}
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center border border-midnight-900/20 text-midnight-900 transition-colors hover:border-gold-500 hover:bg-gold-500"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div
            ref={railRef}
            className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] sm:px-8 xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
          >
            {FRESH_ARRIVALS.map((d, i) => (
              <article
                key={d.name}
                className="group w-[78vw] shrink-0 snap-start sm:w-[22rem]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-midnight-900">
                  <img
                    src={d.image}
                    alt={`${d.name} unstitched suit`}
                    loading="lazy"
                    width="900"
                    height="1125"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-midnight-950/85 px-3 py-1 font-serif text-sm italic text-gold-400">
                    No. {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl">{d.name}</h3>
                    <p className="mt-1 text-sm text-midnight-900/55">{d.note}</p>
                  </div>
                  <button
                    onClick={() => requestQuote(`${d.name} (non-catalogue)`)}
                    aria-label={`Ask about ${d.name}`}
                    className="grid h-11 w-11 shrink-0 place-items-center border border-gold-500/50 text-gold-600 transition-all hover:bg-gold-500 hover:text-midnight-950"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============ Showroom ============ */}
        <section id="showroom" className="scroll-mt-20 bg-ivory-50 py-28 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
            <Reveal className="relative">
              <div className="absolute -bottom-4 -left-4 hidden h-full w-full border border-gold-500/40 sm:block" />
              <img
                src={img('showroom')}
                alt="Shri Amba Textiles showroom with shelves of suits and a seating table for retailers"
                loading="lazy"
                width="1359"
                height="906"
                className="relative aspect-[3/2] w-full object-cover shadow-[0_40px_80px_-40px_rgba(11,18,32,0.6)]"
              />
            </Reveal>
            <Reveal delay={150}>
              <Eyebrow>The Showroom</Eyebrow>
              <h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl">
                Pull up a chair in <span className="italic text-gold-600">Chandni Chowk</span>
              </h2>
              <p className="mt-6 leading-relaxed text-midnight-900/65">
                Walk past the bustle of the market into a calm, well-lit showroom. Shelves of
                catalogue sets and racks of non-catalogue designs, with a table where you can sit,
                compare fabrics and build your order at your own pace.
              </p>
              <div className="mt-10 space-y-5 border-t border-midnight-900/10 pt-8">
                <p className="flex items-start gap-3 text-midnight-900/80">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.5} />
                  <span>
                    {BRAND.address.line1}
                    <br />
                    {BRAND.address.line2}
                  </span>
                </p>
                <p className="flex items-center gap-3 text-midnight-900/80">
                  <Clock className="h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.5} />
                  {BRAND.hours}
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-3 bg-midnight-950 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-400 transition-colors hover:bg-midnight-800"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </Reveal>
          </div>
        </section>

        {/* ============ Instagram lookbook ============ */}
        <section className="bg-midnight-950 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <Eyebrow light>The Lookbook</Eyebrow>
                <h2 className="mt-5 flex flex-wrap items-center gap-3 font-serif text-4xl font-light text-ivory-50 sm:text-5xl">
                  @{BRAND.instagram}
                  <BadgeCheck className="h-8 w-8 fill-sky-500 text-midnight-950" />
                </h2>
                <p className="mt-4 text-ivory-100/55">
                  New arrivals, catalogue launches and weekly drops — follow along on Instagram.
                </p>
              </div>
              <a
                href={`https://instagram.com/${BRAND.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-gold-500 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-gold-400 transition-all hover:bg-gold-500 hover:text-midnight-950"
              >
                <Instagram className="h-4 w-4" />
                Follow
              </a>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {LOOKBOOK.map((src, i) => (
                <Reveal key={src} delay={i * 80}>
                  <a
                    href={`https://instagram.com/${BRAND.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-[4/5] overflow-hidden"
                    aria-label={`View look ${i + 1} on Instagram`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      width="900"
                      height="1126"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 grid place-items-center bg-midnight-950/0 text-ivory-50 opacity-0 transition-all duration-500 group-hover:bg-midnight-950/50 group-hover:opacity-100">
                      <Instagram className="h-7 w-7" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Contact & lead capture ============ */}
        <section id="contact" className="scroll-mt-20 bg-ivory-100">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            {/* Left — details */}
            <div className="relative overflow-hidden bg-midnight-900 px-5 py-20 text-ivory-50 sm:px-12 lg:py-28">
              <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
              <Reveal className="relative">
                <Eyebrow light>Visit · Call · Chat</Eyebrow>
                <h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl">
                  Let's build your <span className="italic text-gold-400">inventory</span> together
                </h2>

                <div className="mt-12 space-y-8">
                  <div className="flex gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold-500/40 text-gold-400">
                      <MapPin className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-ivory-100/45">Store Address</p>
                      <p className="mt-2 text-lg leading-snug text-ivory-50">{BRAND.address.line1}</p>
                      <p className="text-ivory-100/65">{BRAND.address.line2}</p>
                    </div>
                  </div>

                  <a
                    href={`https://instagram.com/${BRAND.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-5"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold-500/40 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-midnight-950">
                      <Instagram className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-ivory-100/45">Instagram</p>
                      <p className="mt-2 flex items-center gap-1.5 text-lg text-ivory-50 transition-colors group-hover:text-gold-400">
                        @{BRAND.instagram}
                        <BadgeCheck className="h-5 w-5 fill-sky-500 text-midnight-900" />
                      </p>
                      <p className="text-sm text-ivory-100/45">DM for inquiries & bulk orders</p>
                    </div>
                  </a>
                </div>

                {/* WhatsApp block */}
                <div className="relative mt-14 overflow-hidden border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/15 via-midnight-950 to-midnight-950 p-8">
                  <div className="pointer-events-none absolute -right-10 -top-10 text-[#25D366]/10">
                    <WhatsAppIcon className="h-48 w-48" />
                  </div>
                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                    <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
                      <WhatsAppIcon className="relative h-10 w-10" />
                    </span>
                    <div>
                      <p className="font-serif text-2xl text-ivory-50">Fastest way to order</p>
                      <p className="mt-1 text-sm text-ivory-100/60">
                        Get catalogue PDFs, live stock photos & rates on WhatsApp.
                      </p>
                    </div>
                  </div>
                  <a
                    href={waLink('Namaste! I am a retailer and would like to see your wholesale catalogues.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-8 flex w-full items-center justify-center gap-3 bg-[#25D366] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1ebe5a] hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <div className="bg-ivory-50 px-5 py-20 sm:px-12 lg:py-28">
              <Reveal delay={150}>
                <Eyebrow>Retailer Inquiry</Eyebrow>
                <h3 className="mt-5 font-serif text-3xl font-light sm:text-4xl">Request wholesale pricing</h3>
                <p className="mt-4 text-midnight-900/60">
                  Share a few details and our team will send you catalogues and trade rates.
                </p>

                {submitted ? (
                  <div className="mt-12 border border-gold-500/30 bg-ivory-100 p-10 text-center">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-gold-600" strokeWidth={1.25} />
                    <p className="mt-6 font-serif text-3xl">Dhanyavaad, {form.name.split(' ')[0]}!</p>
                    <p className="mt-3 text-midnight-900/60">
                      Your inquiry has been prepared on WhatsApp. Hit send and our team will respond
                      shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', business: '', phone: '', requirements: '' });
                      }}
                      className="mt-8 text-[12px] uppercase tracking-[0.2em] text-gold-600 underline-offset-4 hover:underline"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                      {[
                        ['name', 'Your Name', 'name'],
                        ['business', 'Shop / Boutique Name', 'organization'],
                      ].map(([key, label, ac]) => (
                        <div key={key} className="relative">
                          <input type="text" autoComplete={ac} placeholder={label} className={inputClass(key)} {...field(key)} />
                          <label htmlFor={key} className={labelClass}>
                            {label}
                          </label>
                          {errors[key] && (
                            <p id={`${key}-error`} className="mt-2 text-xs text-red-500">
                              {errors[key]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="Phone / WhatsApp Number"
                        className={`${inputClass('phone')} pl-12`}
                        {...field('phone')}
                      />
                      <span className="pointer-events-none absolute bottom-3 left-0 flex items-center gap-1.5 text-[15px] text-midnight-900/50">
                        <Phone className="h-3.5 w-3.5" /> +91
                      </span>
                      <label
                        htmlFor="phone"
                        className={`${labelClass} peer-placeholder-shown:left-12 peer-focus:left-0`}
                      >
                        Phone / WhatsApp Number
                      </label>
                      {errors.phone && (
                        <p id="phone-error" className="mt-2 text-xs text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <textarea
                        rows={4}
                        placeholder="Requirements"
                        className={`${inputClass('requirements')} resize-none`}
                        {...field('requirements')}
                      />
                      <label htmlFor="requirements" className={labelClass}>
                        Requirements — brands, designs, quantities
                      </label>
                      {errors.requirements && (
                        <p id="requirements-error" className="mt-2 text-xs text-red-500">
                          {errors.requirements}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-3 bg-midnight-950 px-8 py-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-gold-400 transition-all duration-300 hover:bg-midnight-800 hover:shadow-[0_20px_50px_-20px_rgba(11,18,32,0.8)]"
                    >
                      Send Inquiry
                      <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </button>
                    <p className="text-center text-xs text-midnight-900/45">
                      Your details are only used to share wholesale pricing. No spam, ever.
                    </p>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ============ Footer ============ */}
      <footer className="border-t border-gold-500/15 bg-midnight-950 text-ivory-100/60">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col items-center gap-10 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="font-serif text-3xl text-gold-400">{BRAND.name}</p>
              <p className="mt-1 text-sm text-ivory-100/50">
                Home of <SarvaMark className="text-gold-300" />
              </p>
              <p className="mt-3 max-w-sm text-sm italic text-ivory-100/45">“{BRAND.tagline}”</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-3 border border-gold-500/25 px-5 py-3">
                <ShieldCheck className="h-6 w-6 text-gold-400" strokeWidth={1.25} />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">GST Registered</p>
                  <p className="font-mono text-xs text-ivory-100/60">GSTIN {BRAND.gstin}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border border-gold-500/25 px-5 py-3">
                <BadgeCheck className="h-6 w-6 text-gold-400" strokeWidth={1.25} />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Udyam Registered MSME</p>
                  <p className="font-mono text-xs text-ivory-100/60">{BRAND.udyam}</p>
                </div>
              </div>
            </div>
          </div>

          <Ornament className="my-12 opacity-60" />

          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs md:flex-row md:text-left">
            <p>
              © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
            </p>
            <p className="tracking-wide text-ivory-100/40">
              {BRAND.address.line1}, {BRAND.address.line2}
            </p>
          </div>
        </div>
      </footer>

      {/* ============ Floating WhatsApp ============ */}
      <a
        href={waLink('Namaste! I would like to know more about your wholesale collections.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
      >
        <span className="pointer-events-none hidden translate-x-2 bg-midnight-950 px-4 py-2 text-xs font-medium tracking-wide text-ivory-50 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Chat for wholesale rates
        </span>
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.8)] transition-transform duration-300 group-hover:scale-110">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </span>
      </a>
    </div>
  );
}
