"use client";

import type { User as FirebaseUser, AuthError } from "firebase/auth";
import { onAuthStateChanged, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import { auth } from "@/lib/firebase";
import type { LoginFormData, SignupFormData } from "@/lib/schemas";

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signUp: (data: SignupFormData) => Promise<FirebaseUser | AuthError>;
  logIn: (data: LoginFormData) => Promise<FirebaseUser | AuthError>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (data: SignupFormData): Promise<FirebaseUser | AuthError> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      return error as AuthError;
    } finally {
      setLoading(false);
    }
  };
  
  const logIn = async (data: LoginFormData): Promise<FirebaseUser | AuthError> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      return error as AuthError;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
