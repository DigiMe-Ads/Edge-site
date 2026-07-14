import { useParams, Link } from 'react-router-dom'
import { BLOG_POSTS } from '../data/blogPosts'
import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import Footer from '../components/common/Footer'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  return (
    <main className="relative">
      <Navbar />
      <CommonHero title={post?.title || 'Blog'} />

      {!post ? (
        <div className="py-24 text-center">
          <p className="font-display font-bold text-gray-800 text-[1.5rem] mb-3">
            This post could not be found
          </p>
          <Link to="/blog" className="text-red-600 hover:text-red-700 font-semibold text-[14px]">
            ← Back to the blog
          </Link>
        </div>
      ) : (
        <section className="w-full bg-white py-16 lg:py-20">
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-gray-400 hover:text-red-600 transition-colors duration-200 mb-8"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
              Back to the blog
            </Link>

            <img
              src={post.img}
              alt={post.title}
              className="w-full object-cover mb-8"
              style={{ aspectRatio: '16/9' }}
            />

            <h1 className="font-display font-extrabold text-gray-900 leading-tight mb-3"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              {post.title}
            </h1>

            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wide mb-8">
              By: <span className="text-gray-600 font-semibold">{post.author}</span> / {post.date}
            </p>

            <p className="text-[15px] text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
