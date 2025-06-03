// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


// Import Firebase Admin SDK
// firebase.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require('./firebaseServiceKey.json');

const adminApp = initializeApp({
  credential: cert(serviceAccount),
});

export const adminAuth = getAuth(adminApp);

