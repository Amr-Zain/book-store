import {
    browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
  GoogleAuthProvider 
} from "firebase/auth";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase/firebase.config";

type AuthContextType = {
  currentUser: User | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvieder: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const register = async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence);
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const login = async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
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
    register,
    login,
    signInWithGoogle,
    logout,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setCurrentUser(user);
        console.log(user)
        localStorage.setItem("authedUser", JSON.stringify(user));
      } else {
        setCurrentUser(null);
        localStorage.removeItem("authedUser");
      }
    });

    return () => unsubscribe();
  }, []);
  return <AuthContext value={value}>{children}</AuthContext>;
};
