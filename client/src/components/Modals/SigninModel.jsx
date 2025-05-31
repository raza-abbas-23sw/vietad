import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react"; 
import { FaFacebook } from "react-icons/fa"; 
import { FcGoogle } from "react-icons/fc"; 

const SignInModal = ({ onClose, open, onSwitchToSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (onClose) onClose();
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
      <div className="rounded-lg p-6 w-full max-w-md shadow-2xl bg-gray-100 max-h-[90vh] overflow-y-auto border-l-4 border-green-400">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sign In</h2>
          <button
            onClick={onClose}
            className="text-black font-bold transition-all cursor-pointer bg-white p-1 rounded-full w-8 h-8  flex items-center justify-center hover:text-green-500 hover:rotate-90"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Enter your username and password to sign in to your Square Signs
          account.
        </p>

        <p className="text-sm text-gray-600 mb-4">
          Don't have an account? 
          <button
            className="text-blue-600 px-2 cursor-pointer hover:font-bold"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
              className="text-sm text-green-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Log in
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
            <span className="relative text-gray-700 text-sm px-2 before:content-[''] before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-16 before:h-px before:bg-gray-400 before:-translate-x-full after:content-[''] after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-16 after:h-px after:bg-gray-400 after:translate-x-full sm:before:w-24 sm:after:w-24">
              Or continue with
            </span>
          </div>

        <div className="mt-6 space-y-4 ">
                    <button className="text-blue-600 w-full flex items-center justify-center gap-2 bg-blue-100 border-blue-400 border-1 font-bold cursor-pointer py-2 px-4 rounded">
                      <FaFacebook className="w-6 h-6" />
                      <span>Sign up with Facebook</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 bg-transparent border-1 border-blue-400 text-black font-bold cursor-pointer py-2 px-4 rounded">
                      <FcGoogle className="w-6 h-6" />
                      <span>Sign up with Google</span>
                    </button>
                  </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Need an account? 
          <button
            className="text-blue-600 px-2 cursor-pointer hover:font-bold"
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
