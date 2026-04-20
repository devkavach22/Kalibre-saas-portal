import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Briefcase, User, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, type Role } from "../context/AuthContext";
import KalibreLogo from "../assets/logo.png";
import { loginApi } from "../api/auth";
import { useToast } from "../context/ToastContext";
import { loginSchema, type LoginValues } from "../lib/validations";
import Input from "../components/ui/Input";

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState<Role>("Candidate");
  const [isLoading, setIsLoading] = useState(false);
  const { loginAction } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      await loginAction(values, activeRole);
      showToast("Login Successful!", "success");
      navigate("/dashboard");
    } catch (err: any) {
      showToast(err.message || "An error occurred during login", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const roles: { id: Role; label: string; icon: React.ReactNode }[] = [
    { id: "Candidate", label: "Candidate", icon: <User size={18} /> },
    { id: "Employer", label: "Employer", icon: <Briefcase size={18} /> },
    { id: "Recruiter", label: "Recruiter", icon: <Users size={18} /> },
  ];

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
            Architecting <br /> <span className="text-brand-red drop-shadow-[0_0_15px_rgba(211,47,47,0.3)]">Elite</span> Teams.
          </h2>
          <p className="text-white/70 font-medium leading-relaxed text-lg xl:text-xl">
            Join thousands of companies and professionals scaling the future with Kalibre's ultra-precise placement engine.
          </p>
        </div>
      </div>

      {/* --- RIGHT LOGIN MODULE --- */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto">
        <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none" />
        
        {/* Header/Nav */}
        <nav className="absolute top-0 left-0 w-full p-8 z-20 flex">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-brand-grey hover:text-brand-black transition-colors">
            <ChevronLeft size={16} /> Back to Home
          </Link>
        </nav>

        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 xl:p-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[420px]"
          >
            {/* Logo Mark */}
            <div className="flex mb-12">
              <Link to="/" className="flex items-center gap-2 group">
                <img src={KalibreLogo} alt="Kalibre Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-black tracking-tight mb-3 text-brand-black">
                Welcome back
              </h1>
              <p className="text-brand-grey font-medium text-sm">
                Sign in to your account to continue
              </p>
            </div>

            {/* Role Tab Selector */}
            <div className="relative flex p-1 bg-black/5 rounded-2xl mb-10">
              {roles.map((role) => {
                const isActive = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`relative w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-colors z-10 ${
                      isActive ? "text-brand-black" : "text-brand-grey hover:text-brand-black/80"
                    }`}
                  >
                    {role.icon}
                    {role.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeRoleTab"
                        className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Email Address"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                    placeholder={
                      activeRole === "Employer" ? "company@email.com" : activeRole === "Recruiter" ? "recruiter@agency.com" : "candidate@email.com"
                    }
                  />

                  <div className="space-y-2">
                    <div className="flex justify-between items-center pl-1 pr-1">
                      <label className="text-[10px] font-black uppercase tracking-[2px] text-brand-grey">Password</label>
                      <Link to="/forgot-password" className="text-xs text-brand-red hover:underline font-bold">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      type="password"
                      {...register("password")}
                      error={errors.password?.message}
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 mt-2 bg-brand-black text-white rounded-2xl font-bold shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:bg-black/80 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-[1px] transition-all active:scale-[0.98] text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Signing in..." : `Sign in as ${activeRole}`}
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 text-center text-sm text-brand-grey font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-brand-black font-black hover:text-brand-red transition-colors">
                Apply now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
