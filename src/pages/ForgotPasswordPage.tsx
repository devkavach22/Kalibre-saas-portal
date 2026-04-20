import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import KalibreLogo from "../assets/logo.png";
import { requestPasswordReset, confirmPasswordReset, loginApi } from "../api/auth";
import { useToast } from "../context/ToastContext";
import { 
  forgotPasswordStep1Schema, 
  forgotPasswordStep2Schema, 
  type ForgotPasswordStep1Values, 
  type ForgotPasswordStep2Values 
} from "../lib/validations";
import Input from "../components/ui/Input";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form 1: Request Reset
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm<ForgotPasswordStep1Values>({
    resolver: zodResolver(forgotPasswordStep1Schema),
    mode: "onChange",
  });

  // Form 2: Confirm Reset
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<ForgotPasswordStep2Values>({
    resolver: zodResolver(forgotPasswordStep2Schema),
    mode: "onChange",
  });

  const handleRequestReset = async (values: ForgotPasswordStep1Values) => {
    setIsLoading(true);
    try {
      const data = await requestPasswordReset(values.email);
      if (data.status === "success") {
        showToast(data.message || "Temporary password sent to your email", "success");
        setUserEmail(values.email);
        setStep(2);
      } else {
        showToast(data.message || "Failed to send reset email", "error");
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReset = async (values: ForgotPasswordStep2Values) => {
    setIsLoading(true);
    try {
      const data = await confirmPasswordReset({
        email: userEmail,
        temp_password: values.temp_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password
      });

      if (data.status === "error") {
        showToast(data.message || "Failed to reset password.", "error");
      } else {
        showToast("Password reset successfully. Logging you in...", "success");
        
        const loginData = await loginApi(userEmail, values.new_password);
        if (loginData.status === "success") {
          login({
            id: loginData.uid.toString(),
            name: loginData.user_name,
            email: loginData.login,
            role: "Candidate",
          });
          navigate("/dashboard");
        } else {
          showToast("Password reset successful, but auto-login failed.", "info");
          setTimeout(() => navigate("/login"), 3000);
        }
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || "An error occurred during reset.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg text-brand-black selection:bg-brand-red selection:text-white overflow-hidden">
      
      {/* --- LEFT DESKTOP GRAPHIC --- */}
      <div className="hidden lg:flex w-1/2 relative bg-brand-black flex-col justify-end">
        <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop" 
          alt="Modern Architecture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 p-16 xl:p-24 max-w-2xl">
          <h2 className="text-5xl xl:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.05]">
            Secure <br /> <span className="text-brand-red drop-shadow-[0_0_15px_rgba(211,47,47,0.3)]">Access</span>
          </h2>
          <p className="text-white/70 font-medium leading-relaxed text-lg xl:text-xl">
            Reset your password quickly to get back to managing your placements.
          </p>
        </div>
      </div>

      {/* --- RIGHT MODULE --- */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto">
        <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none" />
        
        {/* Header/Nav */}
        <nav className="absolute top-0 left-0 w-full p-8 z-20 flex">
          <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-brand-grey hover:text-brand-black transition-colors">
            <ChevronLeft size={16} /> Back to Sign In
          </Link>
        </nav>

        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 xl:p-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[420px]"
          >
            <div className="flex mb-12">
              <Link to="/" className="flex items-center gap-2 group">
                <img src={KalibreLogo} alt="Kalibre Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-black tracking-tight mb-3 text-brand-black">
                {step === 1 ? "Reset Password" : "Set New Password"}
              </h1>
              <p className="text-brand-grey font-medium text-sm">
                {step === 1 
                  ? "Enter your email and we'll send you a temporary password." 
                  : "Enter the temporary password from your email and set a new one."}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form className="space-y-6" onSubmit={handleSubmit1(handleRequestReset)}>
                    <Input
                      label="Email Address"
                      type="email"
                      {...register1("email")}
                      error={errors1.email?.message}
                      placeholder="youremail@example.com"
                    />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 mt-2 bg-brand-black text-white rounded-2xl font-bold shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:bg-black/80 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-[1px] transition-all active:scale-[0.98] text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form className="space-y-6" onSubmit={handleSubmit2(handleConfirmReset)}>
                    <Input
                      label="Email Address"
                      type="email"
                      value={userEmail}
                      disabled
                      className="cursor-not-allowed opacity-60"
                    />

                    <Input
                      label="Temporary Password"
                      type="text"
                      {...register2("temp_password")}
                      error={errors2.temp_password?.message}
                      placeholder="Sent to your email"
                    />

                    <Input
                      label="New Password"
                      type="password"
                      {...register2("new_password")}
                      error={errors2.new_password?.message}
                      placeholder="••••••••"
                    />

                    <Input
                      label="Confirm New Password"
                      type="password"
                      {...register2("confirm_password")}
                      error={errors2.confirm_password?.message}
                      placeholder="••••••••"
                    />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 mt-2 bg-brand-black text-white rounded-2xl font-bold shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:bg-black/80 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-[1px] transition-all active:scale-[0.98] text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Resetting..." : "Confirm & Login"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
