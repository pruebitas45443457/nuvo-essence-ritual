import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  User as FirebaseUser,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

// Types
export interface UserData {
  uid: string;
  name: string;
  phone?: string;
  email: string;
  createdAt: any; // serverTimestamp
  lastLogin?: any; // serverTimestamp
}

// Register a new user
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  phone?: string
): Promise<UserCredential> => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile display name
    await updateProfile(user, {
      displayName: name
    });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email,
      phone: phone || '',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });

    return userCredential;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login time
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
    
    return userCredential;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Get user data from Firestore
export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error al enviar email de recuperación:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (user: FirebaseUser, updates: Partial<UserData>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', user.uid);
    
    // Update Firestore document
    await setDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    // Update display name if it's changed
    if (updates.name && updates.name !== user.displayName) {
      await updateProfile(user, {
        displayName: updates.name
      });
    }
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }
};
