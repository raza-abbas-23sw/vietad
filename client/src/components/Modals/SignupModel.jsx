import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Mail, User, Lock, Phone } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "../../config/firebase";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"
import { useAuth } from "../../context/AuthContext";

const SignupModal = ({ onClose, open, onSwitchToSignin }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { refreshCurrentUser } = useAuth()

  const onSubmit = async (data) => {
    try {

      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      // Get Firebase ID token
      const token = await user.getIdToken();

      const userData = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/users/signup", {
        token,
        phone: data.phone,
        fullName: `${data.firstName} ${data.lastName}`,
        authProvider: "email"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(userData)
      toast.success("Signup Successfull")
      refreshCurrentUser();


      setTimeout(() => {
        if (onClose) onClose();
      }, 1300);
    } catch (error) {
      let message = "Signup failed";

      // Firebase-specific errors
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else {
        message = error.message;
      }
      console.log(error)
      toast.error(message);
    }
  };

  const signInWithGoogle = async () => {
    let user, token;

    try {
      await setPersistence(auth, browserLocalPersistence);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      user = result.user;
      token = await user.getIdToken();

      //throws error if google signins first time.
      const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/users/signin", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(response?.data)
      toast.success("Google sign-in successful!");
      setTimeout(() => {
        onClose();
      }, 1300);
    } catch (error) {
      if (error.response?.data?.message === 'User not found in DB') {
        const fullName = user?.displayName || "Google User";
        const email = user?.email;

        const auth = getAuth();
        await setPersistence(auth, browserLocalPersistence);

        //automatically fills in the user data in database, when user signs up through google popup
        const response = await axios.post("http://localhost:8000/users/signup", {
          fullName,
          email,
          authProvider: "google",
          phoneNumber: ""
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log(response?.data)

        toast.success("Signed up via Google!");
        setTimeout(() => {
          onClose();
        }, 1300);
      } else {
        toast.error(`Google sign-in failed`);
      }
    }
  };

  const password = watch("password");

  // Freeze background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Only render modal if open is true
  if (!open) return null;

  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0  bg-opacity-10 flex items-center justify-center p-4 z-50">
        <Toaster />
        <div className="bg-gray-100 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border-l-4 border-cyan-400">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create Your Account</h2>
            <button
              onClick={onClose}
              className="text-black font-bold transition-all cursor-pointer bg-white p-1 rounded-full w-8 h-8  flex items-center justify-center hover:text-green-500 hover:rotate-90"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Please fill in the fields below to get started with Square Signs
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="First name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Last name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  placeholder="Phone number"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded"
            >
              Register
            </button>
          </form>

          <div className="flex items-center justify-center my-4">
            <span className="relative text-gray-700 text-sm px-2 before:content-[''] before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-16 before:h-px before:bg-gray-400 before:-translate-x-full after:content-[''] after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-16 after:h-px after:bg-gray-400 after:translate-x-full sm:before:w-24 sm:after:w-24">
              Or continue with
            </span>
          </div>

          <div className="mt-6 space-y-4 ">
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2 bg-transparent border-1 border-blue-400 text-black font-bold cursor-pointer py-2 px-4 rounded">
              <FcGoogle className="w-6 h-6" />
              <span>Sign up with Google</span>
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              className="text-blue-600 hover:font-bold cursor-pointer "
              type="button"
              onClick={onSwitchToSignin}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
