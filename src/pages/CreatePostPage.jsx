import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { addPost } from '../utils/storage.js';
import PostForm from '../components/PostForm.jsx';

export default function CreatePostPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = ({ text, image }) => {
    setLoading(true);
    const post = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      authorId: user.id,
      authorName: user.name,
      text,
      image,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addPost(post);
    setLoading(false);
    navigate('/feed');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Create a new post</h1>
        <p className="mt-2 text-slate-600">Write something meaningful and optionally add an image to enrich your feed.</p>
      </div>
      <PostForm
        initialText=""
        initialImage=""
        submitLabel={loading ? 'Posting...' : 'Post now'}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/feed')}
      />
    </div>
  );
}
