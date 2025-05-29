import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearError } from "../features/auth/authSlice";

const registerSchema = z.object({
  emailId: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password should contain at least 8 characters"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    if (error) dispatch(clearError());
  }, [isAuthenticated, error, dispatch, navigate]);

  const onSubmit = (data) => {
    const toastId = toast.loading("logging...");
    dispatch(loginUser(data))
    .unwrap()
      .then(() => {
        toast.success("Login successfully", { id: toastId });
        navigate("/");
      })
      .catch((err) => {
        const errorMsg = err?.message || err?.error || "Request Failed";
        toast.error(errorMsg, { id: toastId });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 bg-[#ffffff] h-[55%] w-full max-w-md mx-auto p-6 shadow border border-gray-200 rounded-xl"
      >
        <h2 className="text-4xl mb-5 font-semibold text-center ">Login</h2>

        <div className=" relative">
          <svg
            className="h-[1em] opacity-50 fixed mt-4.5 ml-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            {...register("emailId")}
            className="w-full px-4 py-3 border border-black/20  placeholder:text-sm rounded-md pl-10 outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="mail@site.com"
          />
          {errors.emailId && (
            <p className="text-red-500 text-sm">{errors.emailId.message}</p>
          )}
        </div>

        <div className="relative">
          <svg
            className="h-[1em] opacity-50 fixed mt-4 ml-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full px-4 py-3 border border-black/20 placeholder:text-sm rounded-md pl-10 outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Password"
            minLength={8}
          />
          <span
            className="absolute top-4  right-3 text-xl cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword === true ? (
              <EyeOff className="text-gray-600" size={20} />
            ) : (
              <Eye className="text-gray-700" size={20} />
            )}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div
          className=" cursor-pointer font-semibold text-[16px] text-left text-[#0a66c2] hover:text-blue-800 active:text-[15.8px]"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </div>
        <button
          type="submit"
          className="btn btn-soft btn-primary text-[17px] rounded-md p-6"
        >
          Log in
        </button>

        <p
          className="text-center cursor-pointer mt-6 p-0.5 text-[16px] active:text-[15.8px]"
          onClick={() => navigate("/register")}
        >
          Don't have an account ?{" "}
          <span className="cursor-pointer font-bold text-[#0a66c2] hover:text-blue-800 ">
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
