"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

export function isClientFirebaseConfigured(): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

function clientApp(): FirebaseApp {
  if (!isClientFirebaseConfigured()) {
    throw new Error(
      "Firebase client config is missing. Add the NEXT_PUBLIC_FIREBASE_* values to .env.local.",
    );
  }
  return getApps().length ? getApp() : initializeApp(config);
}

export function getClientAuth(): Auth {
  return getAuth(clientApp());
}
