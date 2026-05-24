import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getPostById, updatePost } from '../utils/storage.js';
import PostForm from '../components/PostForm.jsx';

export default function EditPostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [notAllowed, setNotAllowed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentPost = getPostById(id);
    if (!currentPost) {
      navigate('/feed');
      return;
    }
    if (currentPost.authorId !== user.id) {
      setNotAllowed(true);
      return;
    }
    setPost(currentPost);
  }, [id, navigate, user.id]);

  useEffect(() => {
    if (notAllowed) {
      navigate('/feed');
    }
  }, [notAllowed, navigate]);

  if (!post) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft text-slate-700">Loading post details...</div>
    );
  }

  const handleSubmit = ({ text, image }) => {
    setLoading(true);
    updatePost({
      ...post,
      text,
      image,
      updatedAt: Date.now(),
    });
    setLoading(false);
    navigate('/feed');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Edit your post</h1>
        <p className="mt-2 text-slate-600">Update the content or image, then save your changes to refresh your feed.</p>
      </div>
      <PostForm
        initialText={post.text}
        initialImage={post.image}
        submitLabel={loading ? 'Saving...' : 'Save changes'}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/feed')}
      />
    </div>
  );
}
