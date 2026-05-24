import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 rounded-3xl border border-slate-200 bg-white px-10 py-16 text-center shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Page not found</p>
      <h1 className="text-4xl font-semibold text-slate-900">Oops, this page does not exist.</h1>
      <p className="max-w-xl text-slate-600">Return to the feed or open your profile to continue exploring your posts and the latest updates.</p>
      <Link
        to="/feed"
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Go back to feed
      </Link>
    </div>
  );
}
