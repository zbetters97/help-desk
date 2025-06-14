import { auth, db } from "src/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const useAuth = () => {
  const signup = async (firstname, lastname, email, password, setError) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredentials.user;

      const displayname = `${firstname} ${lastname}`;

      // permission: 1 = Admin
      const newUserData = {
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        displayname: displayname.toLowerCase(),
        email: email.toLowerCase(),
        permission: 1,
        createdAt: new Date(),
        columns: [
          "checkbox",
          "status",
          "created",
          "subject",
          "requester",
          "assignee",
          "priority",
          "severity",
          "updated",
        ],
      };

      const userRef = doc(db, "users", newUser.uid);
      await setDoc(userRef, newUserData);

      return true;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("The email address is already in use.");
      } else {
        setError("Something went wrong! Please review fields.");
      }

      return false;
    }
  };

  const login = async (email, password, setError) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("The email or password is incorrect.");
      } else {
        setError("Something went wrong! Please try again.");
      }

      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (!result.user) return false;

      const user = result.user?.reloadUserInfo;

      const uid = user["uid"] || user.localId;
      const displayname = user.displayName;
      const email = user.email;

      const newUserData = {
        displayname: displayname.toLowerCase(),
        email: email.toLowerCase(),
        createdAt: new Date(),
      };

      const fetchedUser = await getUserById(uid);

      if (!fetchedUser) {
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, newUserData);
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const checkIfEmailExists = async (email) => {
    const emailAccounts = await fetchSignInMethodsForEmail(auth, email);
    return emailAccounts.length > 0;
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const addUser = async (email, firstname, lastname) => {
    try {
      const displayname = `${firstname} ${lastname}`;

      const user = {
        email,
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        displayname: displayname.toLowerCase(),
        permission: 0,
        createdAt: new Date(),
      };

      const userRef = collection(db, "users");
      const userDoc = await addDoc(userRef, user);

      if (!userDoc) return null;

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const usersRef = collection(db, "users");

      const q = query(usersRef, orderBy("lastname", "desc"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return [];

      const users = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminUsers = async () => {
    try {
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("permission", "==", 1));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return [];

      const users = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) return null;

      const user = userDoc.data();
      return {
        uid: userRef.id,
        ...user,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserColumns = async (userId, columns) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { columns }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    signup,
    login,
    loginWithGoogle,
    logout,
    checkIfEmailExists,
    resetPassword,

    addUser,
    getAllUsers,
    getAdminUsers,
    getUserById,

    updateUserColumns,
  };
};

export default useAuth;
