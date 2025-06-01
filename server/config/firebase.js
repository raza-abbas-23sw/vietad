// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


// Import Firebase Admin SDK
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './firebaseServiceKey.json' assert { type: 'json' };

// Initialize app if not already initialized
const adminApp = initializeApp({
  credential: cert(serviceAccount),
});

// Export auth only (or export adminApp too if needed)
export const adminAuth = getAuth(adminApp);
