import { createContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    
    // Listen to login event
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login event");
    });
    
    // Listen to logout event
    netlifyIdentity.on('logout', () => {
      setUser(null);
      console.log('logout event');
    });

    // init auth ready
    netlifyIdentity.on('init', (user) => {
      setUser(user);
      setAuthReady(true)
      console.log('init event');
    })
    
    // init netlify identity connection
    netlifyIdentity.init();

    // Turn off login and logout events
    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    }
  }, []);

  const login = () => {
    netlifyIdentity.open()
  }

  const logout = () => {
    netlifyIdentity.logout();
  }

  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;