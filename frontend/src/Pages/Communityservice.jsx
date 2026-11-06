import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, ShieldCheck, HeartHandshake, MapPin, Clock, Phone } from 'lucide-react';
import { usePosts, PostCard, PostModal } from '../Components/PostParts';

/* ------------------------------------------------------------------
   Colors (same scheme as the Conditions page)
   Navy: #003B5C  |  Page bg: #F8F9FA  |  Text: slate
------------------------------------------------------------------- */

// TODO: Replace text / numbers below with your real plant details.
// Photos and updates are added from Admin Dashboard > Community Services.
const PLANT = {
  name: 'ABC Filtration Plant',
  tagline: 'Clean, safe drinking water for our families and neighbours.',
  intro:
    'The ABC Filtration Plant is a community initiative of ABC Autism Behavioral Center. It provides filtered drinking water to families, children and residents around the center, so that safe water is never a barrier to health.',
  facts: [
    { label: 'Water served daily', value: '5,000 L' },
    { label: 'Filtration stages', value: '5' },
    { label: 'Cost to families', value: 'Free' },
  ],
  steps: [
    { title: 'Intake', text: 'Raw water is drawn and passed through a sediment filter to remove sand and visible particles.' },
    { title: 'Carbon filtration', text: 'Activated carbon removes odor, taste and chlorine residues.' },
    { title: 'Membrane purification', text: 'A fine membrane removes dissolved impurities and harmful microorganisms.' },
    { title: 'Testing and dispensing', text: 'Water is checked regularly before it is dispensed to the community.' },
  ],
  benefits: [
    { icon: Droplets, title: 'Safe drinking water', text: 'Filtered water that meets everyday drinking standards.' },
    { icon: ShieldCheck, title: 'Regularly maintained', text: 'Filters are cleaned and replaced on a fixed schedule.' },
    { icon: HeartHandshake, title: 'Open to everyone', text: 'Available to families and residents in our community.' },
  ],
  info: [
    { icon: MapPin, label: 'Location', value: 'ABC Autism Behavioral Center, Lahore' },
    { icon: Clock, label: 'Collection timings', value: 'Mon - Sat, 9:00 AM - 5:00 PM' },
    { icon: Phone, label: 'Questions', value: 'Call or WhatsApp our front desk' },
  ],
};

function CommunityService() {
  const { items: posts, loading } = usePosts('community');
  const [open, setOpen] = useState(null);
  const heroImage = (posts.find((p) => p.image) || {}).image;

  return (
    <div className="bg-[#F8F9FA] text-slate-700">
      {/* Hero */}
      <section className="bg-[#003B5C] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <p className="text-sm text-sky-200 mb-3">Community Services</p>
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
            Caring for our community beyond the therapy room
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sky-100">
            ABC Autism Behavioral Center runs services that support families and neighbours
            in everyday life. Our first initiative is the {PLANT.name}.
          </p>
          <a
            href="#filtration-plant"
            className="inline-block mt-8 bg-white text-[#003B5C] px-6 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
          >
            See the filtration plant
          </a>
        </div>
      </section>

      {/* Filtration plant */}
      <section id="filtration-plant" className="max-w-6xl mx-auto px-6 py-16 md:py-20 scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003B5C]">{PLANT.name}</h2>
            <p className="mt-2 text-lg text-[#003B5C]/80">{PLANT.tagline}</p>
            <p className="mt-5 leading-relaxed">{PLANT.intro}</p>
          </div>

          {/* Main image slot */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#003B5C]/10 flex items-center justify-center border border-[#003B5C]/15">
            {heroImage ? (
              <img src={heroImage} alt={PLANT.name} className="w-full h-full object-cover" />
            ) : (
              <Droplets className="w-16 h-16 text-[#003B5C]/40" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Facts */}
        <dl className="mt-12 grid sm:grid-cols-3 gap-4">
          {PLANT.facts.map((f) => (
            <div key={f.label} className="bg-white rounded-xl border border-slate-200 p-6">
              <dt className="text-sm text-slate-500">{f.label}</dt>
              <dd className="mt-1 text-3xl font-bold text-[#003B5C]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003B5C]">How the water is filtered</h2>
          <ol className="mt-8 grid md:grid-cols-2 gap-5">
            {PLANT.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-xl bg-[#F8F9FA] p-5 border border-slate-200">
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#003B5C] text-white font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-[#003B5C]">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003B5C]">Why it matters</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {PLANT.benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="w-11 h-11 rounded-lg bg-[#003B5C]/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#003B5C]" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-[#003B5C]">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Updates (added from Admin Dashboard > Community Services) */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#003B5C]">Latest updates and photos</h2>
        {loading ? (
          <p className="mt-6 text-slate-500">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="mt-6 text-slate-500">Updates from our community services will appear here.</p>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((item) => (
              <PostCard key={item.id} item={item} onOpen={setOpen} />
            ))}
          </div>
        )}
      </section>


      {/* Visit info + CTA */}
      <section className="bg-[#003B5C] text-white">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Visit or ask about the plant</h2>
            <ul className="mt-6 space-y-4">
              {PLANT.info.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 mt-0.5 text-sky-200" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-sky-200">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/contact"
              className="bg-white text-[#003B5C] px-6 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
            >
              Contact us
            </Link>
            <Link
              to="/news-events"
              className="border border-white/70 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              See news and events
            </Link>
          </div>
        </div>
      </section>
      {open && <PostModal item={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

export default CommunityService;