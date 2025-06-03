import express from 'express';
import User from '../Schema/User.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', authMiddleware, async (req, res) => {
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



router.post('/signin', authMiddleware, async (req, res) => {
  console.log("hello")
  const { uid, email } = req.user;


  try {
    let user = await User.findOne({ firebaseUid: uid });


    if (!user) {
      return res.status(404).json({ message: 'User not found in DB' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Signin failed', error });
  }
});


export default router;
