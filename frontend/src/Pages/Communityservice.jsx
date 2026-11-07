import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Droplets, Trophy, Pause, Play, Heart, Users } from 'lucide-react';
import { usePosts } from '../Components/PostParts';
import { BRAND, CATEGORIES, CommunityCard, TriBar } from '../Components/CommunityParts';

// Add your own approved footage at public/videos/community-hero.mp4.
const HERO_VIDEO = '/videos/community-hero.mp4';
const HERO_POSTER = ''; 
const HEAD = { fontFamily: "'Manrope', system-ui, sans-serif" };
const CONTENT = {
  sections: {
    filtration: { id: 'filtration-plant', icon: Droplets, short: 'Essential care', tagline: 'Clean water. Healthier everyday lives.', intro: 'Access to clean drinking water supports the wellbeing of every family. The ABC Filtration Plant serves our neighbours with filtered drinking water, extending our commitment to care into everyday community life.', empty: 'Community updates are on their way. Visit again for news from the ABC Filtration Plant.' },
    cricket: { id: 'cricket-stadium', icon: Trophy, short: 'Shared experiences', tagline: 'A field for connection. A place to belong.', intro: 'Sport brings people together. The ABC Cricket Stadium creates space for children, young people and families to enjoy cricket, build friendships and share the spirit of teamwork.', empty: 'There are no stadium updates to share yet. Check back for match days, events and community stories.' }
  }
};

function VideoHero() {
  const videoRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) { video.pause(); return; }
    video.play().catch(() => setPlaying(false));
    const visibility = () => { if (document.hidden) video.pause(); };
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, [reducedMotion]);
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };
  return (
    <section className="cs-hero" aria-labelledby="cs-hero-title">
      <div className="cs-hero-backdrop" aria-hidden="true" />
      {!failed && <video ref={videoRef} className="cs-hero-video" muted loop playsInline preload="metadata"
        poster={HERO_POSTER || undefined} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false); }} aria-hidden="true">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>}
      <div className="cs-hero-shade" aria-hidden="true" />
      <div className="cs-container cs-hero-inner">
        <div className="cs-hero-top"><span>ABC AUTISM BEHAVIORAL CENTER</span><span className="cs-top-label">Care beyond our centre</span></div>
        <div className="cs-hero-copy">
          <span className="cs-eyebrow cs-light"><span /> COMMUNITY SERVICES</span>
          <h1 id="cs-hero-title">Stronger communities.<br /><em>Brighter possibilities.</em></h1>
          <p>Care begins with people. From clean drinking water to a place to play, we help create everyday opportunities for families and neighbours to thrive together.</p>
          <div className="cs-actions"><a href="#cs-initiatives" className="cs-button cs-button-gold">Explore our initiatives <ArrowDown size={18} /></a><Link to="/contact" className="cs-text-link">Connect with us <ArrowRight size={18} /></Link></div>
        </div>
        <div className="cs-hero-bottom"><span>A shared commitment to everyday wellbeing</span>{!failed && <button type="button" className="cs-video-control" onClick={toggle} aria-label={playing ? 'Pause background video' : 'Play background video'}>{playing ? <Pause size={16} /> : <Play size={16} />}<span>{playing ? 'Pause video' : 'Play video'}</span></button>}</div>
      </div>
    </section>
  );
}

function Initiative({ category, index }) {
  const meta = CONTENT.sections[category.id];
  if (!meta) return null;
  const Icon = meta.icon;
  return <a href={`#${meta.id}`} className={`cs-initiative ${index === 1 ? 'cs-initiative-blue' : ''}`}>
    <div className="cs-card-top"><span className="cs-icon"><Icon size={27} /></span><span className="cs-number">0{index + 1}</span></div>
    <span className="cs-eyebrow">{meta.short}</span><h3>{category.label}</h3><p>{meta.tagline}</p>
    <span className="cs-card-link">Discover the initiative <ArrowRight size={20} /></span>
    <div className="cs-card-decoration" aria-hidden="true" />
  </a>;
}

function PostsSection({ category, index }) {
  const meta = CONTENT.sections[category.id];
  const Icon = meta.icon;
  const { items, loading, error } = usePosts(category.id);
  const tint = index % 2 === 0 ? '#fff7eb' : '#eaf8f7'; // Brand tinted backgrounds

  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="py-20 scroll-mt-24"
      style={{ background: tint, borderTop: '1px solid rgba(0,0,0,0.04)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Separated Header Block for each section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-md mb-4"
            style={{ background: category.accent }}
          >
            <Icon className="h-8 w-8" aria-hidden="true" />
          </span>
          <h2 id={`${meta.id}-title`} className="text-3xl font-extrabold tracking-tight text-[#073c49] md:text-4xl" style={HEAD}>
            {category.label}
          </h2>
          <TriBar className="mx-auto mt-3" />
          <p className="mt-3 text-lg font-semibold" style={{ color: category.accent }}>
            {meta.tagline}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed text-sm md:text-base">{meta.intro}</p>
        </div>

        {/* Posts Grid: showing 3-4 posts clearly underneath */}
        <div>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              <div className="h-80 animate-pulse rounded-3xl bg-slate-200/70" />
              <div className="h-80 animate-pulse rounded-3xl bg-slate-200/70" />
              <div className="h-80 animate-pulse rounded-3xl bg-slate-200/70" />
            </div>
          ) : error ? (
            <p role="alert" className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">
              We could not load these posts. Refresh the page or try again in a few minutes.
            </p>
          ) : items.length === 0 ? (
            <p className="rounded-3xl border-2 border-dashed p-12 text-center text-slate-600 bg-white/50" style={{ borderColor: category.accent }}>
              {meta.empty}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.slice(0, 4).map((post, i) => (
                <div key={post.id}>
                  <CommunityCard post={post} accent={category.accent} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CommunityService() {
  return <MotionConfig reducedMotion="user"><main className="cs-page">
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
.cs-page{--navy:#073c49;--yellow:#f4cc69;--pink:#f2657b;--teal:#1fb6ae;background:#fafbf8;color:#24464c;font-family:'DM Sans',system-ui,sans-serif;overflow-x:hidden}.cs-page *{box-sizing:border-box}.cs-page h1,.cs-page h2,.cs-page h3{font-family:'Manrope',system-ui,sans-serif}.cs-page a{text-decoration:none}.cs-page button{font:inherit;cursor:pointer}.cs-container{width:min(1200px,calc(100% - 96px));margin-inline:auto}.cs-page a:focus-visible,.cs-page button:focus-visible{outline:3px solid var(--yellow);outline-offset:6px}

.cs-hero{position:relative;min-height:760px;min-height:min(920px,100svh);color:#fff;background:var(--navy);isolation:isolate}
.cs-hero-backdrop,.cs-hero-video,.cs-hero-shade{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.cs-hero-backdrop{background:radial-gradient(ellipse at 85% 35%,var(--teal) 0,transparent 48%),radial-gradient(ellipse at 70% 100%,var(--yellow) 0,transparent 50%),var(--navy)}
.cs-hero-video{object-fit:cover;object-position:center}
.cs-hero-shade{background:linear-gradient(90deg,rgba(7,60,73,.92),rgba(7,60,73,.7) 50%,rgba(7,60,73,.3)),linear-gradient(0deg,rgba(7,60,73,.7),transparent 30%)}
.cs-hero-inner{position:relative;min-height:inherit;display:flex;flex-direction:column;justify-content:space-between;padding-top:34px;padding-bottom:28px}
.cs-hero-top,.cs-hero-bottom{display:flex;align-items:center;justify-content:space-between;gap:24px}
.cs-hero-top{font-size:11px;letter-spacing:1.8px;font-weight:700;padding-bottom:25px;border-bottom:1px solid rgba(255,255,255,0.2)}
.cs-top-label{font-weight:400;letter-spacing:.3px}
.cs-hero-copy{padding:85px 0 80px;max-width:800px;animation:cs-enter .9s ease both}
.cs-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:800;letter-spacing:2.1px;text-transform:uppercase;color:var(--teal)}
.cs-light{color:var(--yellow)}
.cs-light>span{height:7px;width:7px;background:currentColor;border-radius:50%}
.cs-hero h1{font-size:clamp(42px,5.6vw,76px);font-weight:500;line-height:1.12;letter-spacing:-3px;margin:24px 0}
.cs-hero h1 em{color:var(--yellow);font-style:normal}
.cs-hero-copy>p{max-width:550px;font-size:17px;line-height:1.85;color:#e2eeec;margin:0}
.cs-actions{display:flex;align-items:center;gap:30px;margin-top:34px;flex-wrap:wrap}
.cs-button{display:inline-flex;align-items:center;justify-content:center;gap:20px;padding:17px 23px;border-radius:7px;font-size:13px;font-weight:700;transition:transform .2s,background .2s}
.cs-button:hover{transform:translateY(-3px)}
.cs-button-gold{background:var(--yellow);color:#173c43}
.cs-button-gold:hover{background:#ffe09a}
.cs-text-link{display:inline-flex;align-items:center;gap:13px;color:inherit;font-size:13px;font-weight:600;padding:12px 0}
.cs-text-link:hover{text-decoration:underline;text-underline-offset:6px}
.cs-hero-bottom{border-top:1px solid rgba(255,255,255,0.2);padding-top:22px;font-size:11px;color:#d4e0df}
.cs-video-control{display:flex;align-items:center;gap:9px;background:rgba(255,255,255,0.12);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:30px;padding:10px 15px}

/* Redesigned 3rd section layout */
.cs-intro-modern{padding:90px 0 60px;background:linear-gradient(180deg, #fafbf8 0%, #f4f8f7 100%);}
.cs-intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center;}
.cs-intro-left h2{font-size:clamp(32px,3.8vw,44px);line-height:1.25;letter-spacing:-1.2px;font-weight:700;margin:16px 0;color:var(--navy)}
.cs-intro-left h2 span{color:var(--pink)}
.cs-intro-right{background:#fff;padding:40px;border-radius:24px;box-shadow:0 10px 30px rgba(7,60,73,0.05);border:1px solid rgba(31,182,174,0.15)}
.cs-intro-right p{font-size:15px;line-height:1.8;color:#4a625f;margin:0 0 16px}

.cs-initiatives{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:50px}
.cs-initiative{position:relative;overflow:hidden;background:#fff8ee;border:2px solid #fceccf;border-radius:20px;padding:36px;color:#3e3522;transition:all .3s ease}
.cs-initiative:hover{transform:translateY(-6px);box-shadow:0 20px 40px rgba(244,204,105,0.18);border-color:var(--yellow)}
.cs-initiative-blue{background:#eaf8f7;border-color:#c4ece9;color:#0f403d}
.cs-initiative-blue:hover{box-shadow:0 20px 40px rgba(31,182,174,0.18);border-color:var(--teal)}
.cs-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px}
.cs-icon{display:grid;place-items:center;width:60px;height:60px;background:#fff;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.05);color:var(--pink)}
.cs-initiative-blue .cs-icon{color:var(--teal)}
.cs-number{font-size:12px;letter-spacing:2px;font-weight:700;opacity:.5}
.cs-initiative h3{position:relative;font-size:28px;letter-spacing:-.8px;margin:12px 0}
.cs-initiative p{position:relative;font-size:14px;line-height:1.6;margin-bottom:30px;opacity:.85}
.cs-card-link{position:relative;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(0,0,0,0.06);padding-top:20px;font-size:13px;font-weight:700}
.cs-card-decoration{position:absolute;width:240px;height:240px;border:2px dashed rgba(242,101,123,0.12);border-radius:50%;right:-100px;top:40px;pointer-events:none}
.cs-initiative-blue .cs-card-decoration{border-color:rgba(31,182,174,0.15)}

.cs-values{background:var(--navy);color:#fff;border-top:1px solid rgba(255,255,255,0.1);border-bottom:1px solid rgba(255,255,255,0.1)}
.cs-values-inner{display:flex;justify-content:space-around;gap:25px;padding-block:32px}
.cs-values-inner>div{display:flex;align-items:center;gap:14px;font-size:14px;font-weight:600;letter-spacing:0.3px}
.cs-values svg{color:var(--yellow)}

.cs-updates-heading{text-align:center;padding-top:90px;padding-bottom:10px}
.cs-updates-heading h2{font-size:clamp(32px,3.5vw,46px);font-weight:700;color:var(--navy);letter-spacing:-1.2px;margin:12px 0 0}
.cs-updates-heading p{color:#55706c;font-size:16px;line-height:1.7;margin-top:12px}

@keyframes cs-enter{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}

@media(max-width:767px){
  .cs-container{width:calc(100% - 40px)}
  .cs-hero{min-height:720px}
  .cs-hero-inner{padding-top:22px}
  .cs-top-label{display:none}
  .cs-hero-top{font-size:9px;letter-spacing:1.2px}
  .cs-hero-copy{padding:65px 0}
  .cs-hero h1{letter-spacing:-1.8px;font-size:44px}
  .cs-hero-copy>p{font-size:15px;line-height:1.8}
  .cs-actions{gap:15px;margin-top:27px}
  .cs-hero-bottom{font-size:10px;align-items:flex-start}
  .cs-video-control{flex-shrink:0;font-size:10px}
  .cs-intro-grid{grid-template-columns:1fr;gap:25px}
  .cs-intro-right{padding:25px}
  .cs-initiatives{grid-template-columns:1fr;margin-top:30px;gap:20px}
  .cs-initiative{padding:28px}
  .cs-values-inner{flex-direction:column;gap:20px;align-items:flex-start;padding-block:25px}
  .cs-updates-heading{padding-top:60px}
}
@media(prefers-reduced-motion:reduce){.cs-page *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`}</style>
    <VideoHero />
    
    <section className="cs-intro-modern" id="cs-initiatives" aria-labelledby="cs-intro-title">
      <div className="cs-container">
        <div className="cs-intro-grid">
          <div className="cs-intro-left">
            <span className="cs-eyebrow">ROOTED IN CARE. OPEN TO EVERYONE.</span>
            <h2 id="cs-intro-title">Small acts of care.<br /><span>Meaningful community connections.</span></h2>
          </div>
          <div className="cs-intro-right">
            <p>At ABC Autism Behavioral Center, our commitment reaches beyond the therapy room. We believe that access to essentials and opportunities to come together help build a more connected community.</p>
            <p>Our initiatives put that belief into practice.</p>
          </div>
        </div>
        <div className="cs-initiatives">{CATEGORIES.map((c, i) => <Initiative key={c.id} category={c} index={i} />)}</div>
      </div>
    </section>

    <section className="cs-values" aria-label="Our community approach">
      <div className="cs-container cs-values-inner">
        <div><Heart size={22} /><span>People at the heart</span></div>
        <div><Droplets size={22} /><span>Care in everyday life</span></div>
        <div><Users size={22} /><span>Connection through community</span></div>
      </div>
    </section>

    <div className="cs-updates-heading cs-container">
      <span className="cs-eyebrow">FROM OUR COMMUNITY</span>
      <h2>Every initiative has a story.</h2>
      <p>Explore the latest news, moments and updates from our community services.</p>
    </div>

    {CATEGORIES.filter(c => CONTENT.sections[c.id]).map((c, i) => <PostsSection key={c.id} category={c} index={i} />)}
  </main></MotionConfig>;
}