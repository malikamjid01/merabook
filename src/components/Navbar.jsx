import { Link, useLocation } from 'react-router-dom';
import { Home, User, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <BookOpen className="h-6 w-6 text-sky-600" />
          <span>MeraBook</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/feed"
              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                location.pathname === '/feed'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Home className="mr-2 inline h-4 w-4" />
              Feed
            </Link>
            <Link
              to="/profile"
              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                location.pathname === '/profile'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <User className="mr-2 inline h-4 w-4" />
              Profile
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
