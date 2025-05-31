import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SignInModal = ({ onClose, open }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here (e.g., API call)
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
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50  bg-opacity-50">
      <div className="rounded-lg p-6 w-full max-w-md shadow-2xl bg-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sign In</h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-green-500"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Enter your username and password to sign in to your Square Signs account.
        </p>

        <p className="text-sm text-gray-600 mb-4">
          Don't have an account? Click the link below to create an account.
          <button className="text-blue-600 hover:underline ml-1">Sign up</button>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
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
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Log in
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-[#3b5998] text-white py-2 px-4 rounded">
            <span>Continue with Facebook</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-[#4285F4] text-white py-2 px-4 rounded">
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Forgot password? <button className="text-blue-600 hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;