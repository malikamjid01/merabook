import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const { user, register, authError, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/feed');
    }
  }, [user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setLocalError('All fields are required.');
      return;
    }
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    setLocalError('');
    clearError();

    const success = register({ name: name.trim(), email: email.trim(), password });
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-500">MeraBook</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">Create your account</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Register to start posting, follow the feed, and keep your profile updated.
            </p>
          </div>

          {localError || authError ? (
            <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{localError || authError}</div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Full name</span>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setLocalError('');
                  clearError();
                }}
                type="text"
                placeholder="Jane Doe"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setLocalError('');
                  clearError();
                }}
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setLocalError('');
                  clearError();
                }}
                type="password"
                placeholder="Create a password"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Confirm password</span>
              <input
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setLocalError('');
                  clearError();
                }}
                type="password"
                placeholder="Confirm your password"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              />
            </label>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Register
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-slate-900 hover:text-sky-600">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
