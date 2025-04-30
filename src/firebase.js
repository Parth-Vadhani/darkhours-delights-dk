// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

// Firebase configuration using Vite environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

// Validate that all required environment variables are present
const requiredEnvVars = [
    "VITE_FIREBASE_API_KEY",
    "VITE_FIREBASE_AUTH_DOMAIN",
    "VITE_FIREBASE_PROJECT_ID",
    "VITE_FIREBASE_STORAGE_BUCKET",
    "VITE_FIREBASE_MESSAGING_SENDER_ID",
    "VITE_FIREBASE_APP_ID",
    "VITE_FIREBASE_MEASUREMENT_ID",
];

const missingEnvVars = requiredEnvVars.filter(
    (varName) => !import.meta.env[varName]
);
if (missingEnvVars.length > 0) {
    console.error(
        `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
    if (import.meta.env.MODE === "development") {
        console.warn(
            "Using empty config as fallback in development. Please set environment variables in .env."
        );
    } else {
        throw new Error(
            `Missing required environment variables: ${missingEnvVars.join(", ")}`
        );
    }
}

// Initialize Firebase
let app;
let analytics;
let auth;
let googleProvider;

try {
    app = firebase.initializeApp(firebaseConfig);
    analytics = firebase.analytics();
    auth = firebase.auth();
    googleProvider = new firebase.auth.GoogleAuthProvider();
} catch (error) {
    console.error("Firebase initialization error:", error);
    if (import.meta.env.MODE === "production") {
        throw error;
    }
}

export { auth, googleProvider };