import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(() => Cookies.get('jwt_token') || null);
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      try {
        fetch("https://discusion-project.vercel.app/authenticateonly", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setUser(data.user.username);
            setUid(data.user.uid);
          }
          return null;
        })
        .catch(err => {
          console.error('Error authenticating:', err);
          return null;
        });
      } catch {
        return null;
      }
    }
  }, []);

  const login = (token, user, uid) => {
    setJwt(token);
    Cookies.set('jwt_token', token);
    setUser(user);
    setUid(uid);
  };

  const logout = () => {
    setJwt(null);
    setUser(null);
    setUid(null);
    Cookies.remove('jwt_token');
  };

  return (
    <AuthContext.Provider value={{ jwt, user, uid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
