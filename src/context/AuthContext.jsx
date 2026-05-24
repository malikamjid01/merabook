import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, saveCurrentUser, clearCurrentUser, getUsers, saveUsers } from '../utils/storage.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const register = ({ name, email, password }) => {
    const users = getUsers();
    const existingUser = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setAuthError('This email is already registered');
      return false;
    }

    const newUser = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      email,
      password,
    };
    saveUsers([...users, newUser]);
    setAuthError('');
    return true;
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const matchedUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
    );

    if (!matchedUser) {
      setAuthError('Invalid email or password');
      return false;
    }

    saveCurrentUser(matchedUser);
    setUser(matchedUser);
    setAuthError('');
    return true;
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
    navigate('/login');
  };

  const clearError = () => setAuthError('');

  return (
    <AuthContext.Provider value={{ user, loading, authError, register, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
