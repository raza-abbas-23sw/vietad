import { adminAuth } from '../config/firebase.js';

export const authMiddleware = async (req, res, next) => {
  console.log("🔐 Auth middleware triggered"); // NEW LINE

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.log("❌ Missing or malformed token:", authHeader);
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log("✅ Decoded token:", decodedToken); // NEW LINE

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      authProvider: decodedToken.firebase.sign_in_provider === 'google.com' ? 'google' : decodedToken.firebase.sign_in_provider
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);

    const message = error.code === 'auth/id-token-revoked'
      ? 'Token revoked'
      : 'Invalid or expired token';

    return res.status(403).json({ message });
  }
};
