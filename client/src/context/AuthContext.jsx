import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import axios from "axios";

const AuthContext = createContext({
  currentUser: null,
  loading: true,
  logout: () => {},
  refreshCurrentUser: async () => {},
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await buildCurrentUser(firebaseUser);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const buildCurrentUser = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();

      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/users/signin",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dbUser = response.data;

      // Flattened structure: merge Firebase user fields with DB user
      setCurrentUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        ...dbUser,
      });
    } catch (err) {
      if (err.response?.status === 404) {
        // User not found in DB
        setCurrentUser(null);
        // console.log("error")
      } else {
        console.error("Error while fetching user:", err);
        setCurrentUser(null);
      }
    } finally {
        console.log(currentUser)
      setLoading(false);
    }
  };

  const refreshCurrentUser = async () => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      setLoading(true);
      await buildCurrentUser(firebaseUser);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout, refreshCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
