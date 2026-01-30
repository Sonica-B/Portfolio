'use client'

import { motion } from 'framer-motion'

// You can update these with your actual LinkedIn posts
const linkedInPosts = [
  {
    title: 'Multi-Agent AI for Legal Tech',
    excerpt: 'Excited to share our work on automating H-1B document validation using multi-agent RAG pipelines...',
    date: 'Dec 2025',
    likes: 156,
    comments: 23,
    url: 'https://linkedin.com/in/shreya-boyane',
  },
  {
    title: 'From DevOps to AI Engineering',
    excerpt: 'My journey transitioning from Lead DevOps at Persistent Systems to ML Research at WPI...',
    date: 'Oct 2025',
    likes: 243,
    comments: 41,
    url: 'https://linkedin.com/in/shreya-boyane',
  },
]

export default function LinkedInHighlights() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute top-1/2 -translate-y-1/2 right-4 hidden xl:block w-72"
    >
      <div className="floating-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span className="text-sm font-medium text-white">Recent Posts</span>
        </div>

        <div className="space-y-3">
          {linkedInPosts.map((post, index) => (
            <motion.a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
            >
              <p className="text-xs text-gray-500 mb-1">{post.date}</p>
              <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                  </svg>
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                  {post.comments}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <a
          href="https://linkedin.com/in/shreya-boyane"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-center text-xs text-primary hover:text-white transition-colors"
        >
          View all posts
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-1">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </div>
    </motion.div>
  )
}
