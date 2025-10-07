import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'ims_users';
const AUTH_KEY = 'ims_auth_user';

function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; } catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }, [user]);

  const signup = ({ name, email, password }) => {
    const users = readUsers();
    if (users.find(u => u.email === email)) throw new Error('Email already exists');
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    writeUsers(users);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return true;
  };

  const login = ({ email, password }) => {
    const users = readUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid credentials');
    setUser({ id: found.id, name: found.name, email: found.email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
