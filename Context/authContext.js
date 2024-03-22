import { createContext, useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    //onAuthStateChanged

    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("get user from auth", user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user?.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    // we return unsub, because when component unmolds, it will clear this hook
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-credential)")) msg = "Wrong Credentials";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (
        msg.includes(
          "Firebase: Password should be at least 6 characters (auth/weak-password)"
        )
      )
        msg =
          "Firebase: Password should be at least 6 characters / weak password";
      return { success: false, msg };
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);

      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // we not need this two states, because onauthstatechanges automatically fetches the user
      // setUser(response?.user);
      // setIsAuthenticated(true);

      //we are not using addDoc, because it generated id automatically, so we will use setDoc
      //setDoc basically create and update existig document
      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;

      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already in use";
      if (
        msg.includes(
          "Firebase: Password should be at least 6 characters (auth/weak-password)"
        )
      )
        msg =
          "Firebase: Password should be at least 6 characters / weak password";

      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthcontextProvider");
  }

  return value;
};
