import { Edit3, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/date.js';

export default function PostCard({ post, isOwner, onEdit, onDelete }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:shadow-lg">
      <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">MeraBook</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{post.authorName}</h3>
            <p className="mt-1 text-sm text-slate-500">{formatDate(post.createdAt)}</p>
          </div>
          {isOwner ? (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onEdit(post.id)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="space-y-5 px-6 pb-6 sm:px-8">
        <p className="whitespace-pre-line text-slate-700">{post.text || 'Shared a photo.'}</p>
        {post.image ? (
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
            <img
              src={post.image}
              alt="Post preview"
              className="h-[320px] w-full object-cover"
            />
          </div>
        ) : null}
        {post.updatedAt && post.updatedAt !== post.createdAt ? (
          <p className="text-sm text-slate-400">Updated: {formatDate(post.updatedAt)}</p>
        ) : null}
      </div>
    </article>
  );
}
