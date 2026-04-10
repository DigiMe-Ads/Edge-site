import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Blog post data ───────────────────────────────────────────────────────────
const POSTS = [
  {
    slug:    'gleams-steal-into-the-inner-sub',
    title:   'Gleams steal into the inner sub',
    date:    'March 5, 2023',
    author:  'Admin',
    excerpt: 'Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode.',
    img:     '/assets/blogs/blog-1.png',
  },
  {
    slug:    'strikes-the-upper-surface-impenetrable',
    title:   'Strikes the upper surface impenetrable',
    date:    'March 5, 2023',
    author:  'Admin',
    excerpt: 'Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode.',
    img:     '/assets/blogs/blog-2.png',
  },
  {
    slug:    'foliage-of-my-trees-and-but-a-few',
    title:   'Foliage of my trees, and but a few',
    date:    'March 5, 2023',
    author:  'Admin',
    excerpt: 'Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode.',
    img:     '/assets/blogs/blog-3.png',
  },
]

// ─── Single post item ─────────────────────────────────────────────────────────
function PostItem({ post, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      className="mb-14 last:mb-0"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Image */}
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden group mb-5">
        <img
          src={post.img}
          alt={post.title}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ aspectRatio: '16/9', maxHeight: 420 }}
        />
      </Link>

      {/* Title */}
      <h2 className="font-display font-extrabold text-gray-900 leading-tight mb-2"
          style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.7rem)' }}>
        <Link
          to={`/blog/${post.slug}`}
          className="hover:text-red-600 transition-colors duration-200"
        >
          {post.title}
        </Link>
      </h2>

      {/* Meta: BY: ADMIN / DATE */}
      <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wide mb-3">
        By:{' '}
        <Link to="#" className="text-blue-600 hover:text-blue-700 transition-colors">
          {post.author}
        </Link>
        {' '}/ {post.date}
      </p>

      {/* Excerpt */}
      <p className="text-[14px] text-gray-500 leading-relaxed mb-4 max-w-xl">
        {post.excerpt}
      </p>

      {/* Read more */}
      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase
                   tracking-[0.16em] text-gray-700 hover:text-red-600 transition-colors duration-200"
      >
        Read More
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" strokeWidth={2.3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      </Link>

      {/* Divider below (except last) */}
      <div className="mt-14 border-b border-gray-100 last:hidden" />
    </motion.article>
  )
}

// ─── Main BlogList ────────────────────────────────────────────────────────────
export default function BlogList() {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        {POSTS.map((post, i) => (
          <PostItem key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  )
}