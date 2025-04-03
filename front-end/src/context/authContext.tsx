import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
  GoogleAuthProvider,
  onIdTokenChanged,
} from "firebase/auth";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUser, getUserById } from "../firebase/service";

export type AppUser = {
  id: string;
  email: string;
  role: "user" | "admin";
  name: string;
};

type AuthContextType = {
  currentUser: AppUser | null;
  loading: boolean;
  register: (
    email: string,
    password: string,
    role: "user" | "admin",
    name: string
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<AppUser>;
  signInWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvieder: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (
    email: string,
    password: string,
    role: "user" | "admin",
    name: string
  ) => {
    await setPersistence(auth, browserLocalPersistence);
    const credUser = await createUser({
      name,
      email: email.toLowerCase(),
      role,
      password,
    });
    return credUser;
  };
  const login = async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return await getUserById(userCredential.user.uid);

  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithPopup(auth, provider);
  };
  const logout = () => {
    return signOut(auth);
  };
  const value: AuthContextType = {
    currentUser,
    loading,
    register,
    login,
    signInWithGoogle,
    logout,
  };
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("accessToken", token);

        const user = await getUserById(firebaseUser.uid);

        setCurrentUser(user);
        localStorage.setItem("authedUser", JSON.stringify(user));
        setLoading(false);
      } else {
        setCurrentUser(null);
        localStorage.removeItem("authedUser");
        localStorage.removeItem("accessToken");
      }
    });

    return  () => unsubscribe();;
  }, []);
  return <AuthContext value={value}>{children}</AuthContext>;
};
