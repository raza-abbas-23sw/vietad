import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast"
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { auth } from "../../config/firebase";

const SignInModal = ({ onClose, open, onSwitchToSignup }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Signing in...");


    try {
      // Initialize Firebase Auth
      const auth = getAuth();

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Get Firebase ID token
      const token = await userCredential.user.getIdToken();

      // Authenticate with backend
      const response = await axios.post(
        "http://localhost:8000/users/signin",
        {}, // Empty body as required by your backend
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data)
      toast.success("Sign in successful!", { id: toastId });
      setTimeout(() => {
        if (onClose) onClose();
      }, 1300);

    } catch (err) {
      let message = "Sign in failed.";

      // Firebase errors
       if (err.code) {
    switch (err.code) {
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password.";
        break;
      case "auth/invalid-email":
        message = "Invalid email format.";
        break;
      case "auth/too-many-requests":
        message = "Too many attempts. Try again later.";
        break;
      case "auth/email-already-in-use":
        message = "This email is already in use.";
        break;
      case "auth/invalid-credential":
        message = "Wrong email or password.";
        break;
      default:
        message = err.message;
    }
  }

      // Backend errors
      else if (err.response?.data?.message) {
        message = err.response.data.message;
      }

      toast.error(message, { id: toastId });


    } finally {
      setLoading(false);
    }
    // if (onClose) onClose();
  };



  const signInWithGoogle = async () => {
    let user, token;

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      user = result.user;
      token = await user.getIdToken();

      //throws error if google signins first time.
      const response = await axios.post("http://localhost:8000/users/signin", {}, {
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
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-opacity-50">
      <Toaster />
      <div className="rounded-lg p-6 w-full max-w-md shadow-2xl bg-gray-100 max-h-[90vh] overflow-y-auto border-l-4 border-cyan-400">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sign In</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 hover:rotate-90 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Enter your username and password to sign in to your Square Signs
          account.
        </p>

        <p className="text-sm text-gray-600 mb-4">
          Don't have an account?
          <button
            className="text-cyan-600 px-2 cursor-pointer hover:font-bold"
            onClick={onSwitchToSignup}
          >
            Sign up
          </button>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                disabled={loading}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
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
                    message: "Password must be at least 8 characters"
                  }
                })}
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                disabled={loading}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="text-sm text-cyan-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
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
            className="w-full flex items-center justify-center gap-2 bg-transparent border-1 border-cyan-400 text-black font-bold cursor-pointer py-2 px-4 rounded">
            <FcGoogle className="w-6 h-6" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Need an account?
          <button
            className="text-cyan-600 px-2 cursor-pointer hover:font-bold"
            onClick={onSwitchToSignup}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
