import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { deletePost, getUserPosts } from '../utils/storage.js';
import PostCard from '../components/PostCard.jsx';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getUserPosts(user.id).sort((a, b) => b.createdAt - a.createdAt));
  }, [user.id]);

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
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Profile</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{user.name}'s posts</h1>
        <p className="mt-2 text-slate-600">Manage your content, edit or remove posts you shared on MeraBook.</p>
        <button
          onClick={() => navigate('/create')}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          + Add new post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
          <p className="text-xl font-semibold text-slate-900">You have not posted yet.</p>
          <p className="mt-2 text-slate-600">Create your first post and it will appear here in your profile.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isOwner onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
