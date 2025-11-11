// Context/AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/Firebase.config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persist session and restore user on refresh
  useEffect(() => {
    let unsub = () => {};
    setPersistence(auth, browserLocalPersistence)
      .catch(() => {}) // ignore if already set
      .finally(() => {
        unsub = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser || null);
          setLoading(false);
        });
      });
    return () => unsub && unsub();
  }, []);

  const createUserWithEmailAndPasswordFunc = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInWithEmailAndPasswordFunc = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  const authInfo = {
    user,
    setUser, // optional but handy
    loading,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;