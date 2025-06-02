import express from 'express';
import User from '../Schema/User.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * POST /api/users/signup
 * Called after Firebase Auth creates the user (email/password or Google).
 * Saves additional user details in MongoDB.
 */
router.post('/signup',authMiddleware , async (req, res) => {
  const { fullName, phoneNumber, authProvider } = req.body;
  const { uid, email } = req.user;

  try {
    const existingUser = await User.findOne({ firebaseUid: uid });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      firebaseUid: uid,
      email,
      fullName,
      phoneNumber,
      authProvider,
    });

    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Signup failed', error });
  }
});

/**
 * POST /api/users/signin
 * Called when a user logs in. If user exists in MongoDB, return it.
 * If not, return an error (or you can auto-create if desired).
 */
// router.post('/signin', authMiddleware, async (req, res) => {
//   const { uid } = req.user;

//   try {
//     const user = await User.findOne({ firebaseUid: uid });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found in DB. Please sign up first.' });
//     }

//     return res.json(user);
//   } catch (error) {
//     return res.status(500).json({ message: 'Signin failed', error });
//   }
// });

// In /users/signin route
router.post('/signin', authMiddleware, async (req, res) => {
  console.log("hello")
  const { uid, email } = req.user;

  try {
    let user = await User.findOne({ firebaseUid: uid });

    // Auto-create user if Google login and not found
    if (!user && req.user.authProvider === 'google') {
      user = new User({
        firebaseUid: uid,
        email,
        fullName: req.user.name || "",
        authProvider: "google"
      });
      await user.save();
    }

    if (!user && req.user.authProvider === 'password') {
      user = new User({
        firebaseUid: uid,
        email,
        fullName: "", // or get from form
        authProvider: "email"
      });
      await user.save();
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found in DB' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Signin failed', error });
  }
});


export default router;
