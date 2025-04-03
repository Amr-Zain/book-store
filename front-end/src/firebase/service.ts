import { addDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, FieldValue } from "./firebase.config";
import { AppUser } from "../context/authContext";
import { createUserWithEmailAndPassword } from "firebase/auth";




export const getUserById = async (id: string): Promise<AppUser> => {



    const usersColl = collection(FieldValue, 'users');
    const q = query(usersColl, where('id', '==', id),limit(1));
    const result = await getDocs(q);
    return result.docs[0].data() as AppUser;
}

export const createUser = async(user: Omit<AppUser,'id'>& {password: string}) => {


    const credUser = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
    const usersRef = collection(FieldValue, "users");
    await addDoc(usersRef, {
        id: credUser.user.uid,
        name: user.name,
        email: user.email.toLowerCase(),
        role: user.role,
    });
    return credUser;
}