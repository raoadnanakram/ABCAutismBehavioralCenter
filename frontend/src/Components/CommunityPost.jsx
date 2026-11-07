import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowLeft, Calendar, Images } from 'lucide-react';
import { picturesOf } from '../Components/PostParts';
import { BRAND, Gallery, TriBar, categoryOf, longDate, usePost } from '../Components/CommunityParts';

/* Post detail page:  /community-services/:id
   Premium article layout: hero with the featured picture, article text, gallery with all pictures. */

const COMMUNITY_PATH = '/community-services';

function BackLink({ className = '' }) {
  return (
    <Link
      to={COMMUNITY_PATH}
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-lg transition duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
      Back to Community Services
    </Link>
  );
}

function CommunityPost() {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#F8F9FA]">
        <div className="h-[50vh] animate-pulse bg-[#003B5C]/15" />
        <div className="mx-auto -mt-16 max-w-3xl space-y-4 rounded-3xl bg-white p-10 shadow-xl">
          <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  const isCommunity = post && (post.section === 'filtration' || post.section === 'cricket');
  if (error || !post || !isCommunity) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#F8F9FA] px-6 py-24">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-extrabold text-[#003B5C]">This post could not be found</h1>
          <p className="mt-3 text-slate-600">It may have been removed. You can see all our latest posts on the Community Services page.</p>
          <div className="mt-7">
            <BackLink className="bg-[#003B5C] text-white" />
          </div>
        </div>
      </section>
    );
  }

  const cat = categoryOf(post.section);
  const pics = picturesOf(post);
  const paragraphs = post.content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <MotionConfig reducedMotion="user">
      <article className="bg-[#F8F9FA]">
        {/* ---------- Hero ---------- */}
        <header className="relative isolate overflow-hidden bg-[#003B5C] text-white">
          {pics[0] && (
            <motion.img
              src={pics[0]}
              alt=""
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
          )}
          <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#003B5C] via-[#003B5C]/70 to-[#003B5C]/30" />
          {!pics[0] && (
            <>
              <span className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full opacity-30 blur-3xl" style={{ background: BRAND.teal }} />
              <span className="absolute -bottom-24 left-10 -z-10 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: BRAND.pink }} />
            </>
          )}

          <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-between px-6 pb-28 pt-8 md:min-h-[68vh]">
            <div>
              <BackLink className="bg-white/95 text-[#003B5C]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="mt-16"
            >
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow"
                style={{ background: cat.accent }}
              >
                {cat.label}
              </span>
              <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-6xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-sky-100">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" style={{ color: BRAND.yellow }} aria-hidden="true" />
                  {longDate(post.date)}
                </span>
                {pics.length > 1 && (
                  <span className="inline-flex items-center gap-2">
                    <Images className="h-4 w-4" style={{ color: BRAND.yellow }} aria-hidden="true" />
                    {pics.length} photos
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </header>

        {/* ---------- Article text ---------- */}
        <div className="relative z-10 mx-auto -mt-16 max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="rounded-3xl bg-white p-7 shadow-xl sm:p-12"
          >
            <TriBar className="mb-8" />
            {paragraphs.length === 0 ? (
              <p className="text-slate-500">More details will be added soon.</p>
            ) : (
              <div className="space-y-6">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'whitespace-pre-line border-l-4 pl-5 text-xl font-medium leading-relaxed text-[#003B5C]'
                        : 'whitespace-pre-line text-[17px] leading-[1.85] text-slate-700'
                    }
                    style={i === 0 ? { borderColor: cat.accent } : undefined}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}
            <p className="mt-10 border-t border-slate-100 pt-6 text-sm text-slate-500">
              Posted in <span className="font-semibold" style={{ color: cat.accent }}>{cat.label}</span> on {longDate(post.date)}
            </p>
          </motion.div>
        </div>

        {/* ---------- Gallery ---------- */}
        {pics.length > 0 && (
          <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6" aria-label="Photo gallery">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2 className="text-2xl font-extrabold text-[#003B5C] md:text-3xl">Photo gallery</h2>
              <TriBar className="mb-6 mt-3" />
              <Gallery pics={pics} title={post.title} accent={cat.accent} />
            </motion.div>
          </section>
        )}

        {/* ---------- Bottom ---------- */}
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-14 text-center">
          <BackLink className="bg-[#003B5C] text-white hover:bg-[#02263b]" />
        </div>
      </article>
    </MotionConfig>
  );
}

export default CommunityPost;
