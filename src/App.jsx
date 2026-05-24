import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import FeedPage from './pages/FeedPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import EditPostPage from './pages/EditPostPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-soft">
          <div className="text-center text-slate-700">Loading MeraBook...</div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/feed" /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/feed" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/feed" /> : <RegisterPage />} />
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditPostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        {!hideNavbar && <Navbar />}
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <AppRoutes />
        </main>
      </div>
    </AuthProvider>
  );
}
