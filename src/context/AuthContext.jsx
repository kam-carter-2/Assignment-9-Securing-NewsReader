import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Demo accounts for the assignment.
// Real applications must validate credentials on a backend.
const DEMO_USERS = {
  admin: {
    password: 'Admin123!',
    role: 'admin',
  },
  reader: {
    password: 'Reader123!',
    role: 'regular',
  },
  reader2: {
    password: 'Reader123!',
    role: 'regular',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('newsreader_user')) || null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(user);

  const login = (username, password) => {
    const normalizedUsername = username.trim().toLowerCase();
    const account = DEMO_USERS[normalizedUsername];

    if (!account || account.password !== password) {
      throw new Error('Invalid username or password.');
    }

    const authenticatedUser = {
      username: normalizedUsername,
      role: account.role,
    };

    localStorage.setItem(
      'newsreader_user',
      JSON.stringify(authenticatedUser)
    );

    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = () => {
    localStorage.removeItem('newsreader_user');
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
