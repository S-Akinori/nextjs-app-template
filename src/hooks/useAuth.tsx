import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { auth } from "lib/firebase/client";
import { createUserWithEmailAndPassword, confirmPasswordReset as confirmPassReset, sendPasswordResetEmail as sendPassResetEmail, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from "firebase/auth";

interface ProvideAuthContextType {
  user: User | null;
  signin: (email: string, password: string) => Promise<User | boolean>;
  signup: (email: string, password: string) => Promise<User>;
  signout: () => Promise<boolean>
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  confirmPasswordReset: (code: string, password: string) => Promise<boolean>;
}

const authContext = createContext<ProvideAuthContextType | undefined>(undefined);
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
interface Props {
  children: React.ReactNode
}
export function ProvideAuth({ children }: Props) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useProvideAuth =  () => {
  const [user, setUser] = useState<User | null>(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        return userCredential.user;
      })
      .catch(() => {
        return false
      })
  };
  const signup = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        return userCredential.user;
      });
  };
  const signout = async () => {
    return signOut(auth)
      .then(() => {
        setUser(null);
        return true
      })
      .catch(() => {
        return false
      })
  };
  const sendPasswordResetEmail = async (email: string) => {
    return sendPassResetEmail(auth, email)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false
      })
  };
  const confirmPasswordReset = async (code: string, password: string) => {
    return confirmPassReset(auth, code, password)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false
      })
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}