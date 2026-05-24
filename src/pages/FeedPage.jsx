import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { deletePost, getPosts } from '../utils/storage.js';
import PostCard from '../components/PostCard.jsx';

export default function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPosts(getPosts().sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    return posts.filter((post) => post.text.toLowerCase().includes(search.toLowerCase()));
  }, [posts, search]);

  const handleDelete = (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;
    deletePost(postId);
    setPosts((current) => current.filter((post) => post.id !== postId));
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Your feed</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Latest posts</h1>
          <p className="mt-2 text-slate-600">Browse updates, filter posts, and share your stories.</p>
          <p className="mt-4 text-sm text-slate-500">Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}.</p>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          New post
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Search posts</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Type any keyword to filter your feed"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
          <p className="text-xl font-semibold text-slate-900">No posts yet - be the first one to post!</p>
          <p className="mt-2 text-slate-600">Create a post and share your first moment with MeraBook.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isOwner={post.authorId === user.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
