import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../../data/blogData";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = blogPosts.find((p) => p.id === parseInt(id));
    setPost(found);
  }, [id]);

  if (!post)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl text-center mb-12 animate-fade-in-up">
        <div className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-4">
          {post.category}
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex justify-center items-center text-gray-500 text-sm">
          <span className="font-bold text-brand-navy mr-2">{post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.date}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl mb-16">
        <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl">
        <div
          className="prose prose-lg prose-blue text-gray-600 leading-relaxed font-serif mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex justify-between items-center">
          <div className="text-brand-navy font-bold">Share this article:</div>
          <div className="flex space-x-4">
            {["Facebook", "Twitter", "LinkedIn"].map((social) => (
              <button
                key={social}
                className="text-gray-400 hover:text-brand-gold transition-colors text-sm uppercase font-bold"
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16 mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h3 className="text-2xl font-heading font-bold text-brand-navy mb-8 text-center">
            Read Next
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter((p) => p.id !== post.id) 
              .slice(0, 3) 
              .map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-brand-gold font-bold uppercase mb-2">
                      {related.category}
                    </div>
                    <h4 className="font-bold text-brand-navy group-hover:text-brand-gold transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
