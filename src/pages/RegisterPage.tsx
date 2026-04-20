import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Briefcase, User, Users, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import KalibreLogo from "../assets/logo.png";
import { useToast } from "../context/ToastContext";
import { verifyGST, registerCompany, candidateRegister } from "../api/auth";
import { 
  candidateRegisterSchema, 
  employerRegisterSchema, 
  recruiterRegisterSchema,
  type CandidateRegisterValues,
  type EmployerRegisterValues,
  type RecruiterRegisterValues
} from "../lib/validations";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { Calendar, User2, KeyRound, Phone } from "lucide-react";

type Role = "Candidate" | "Employer" | "Recruiter";

const RegisterPage = () => {
  const [activeRole, setActiveRole] = useState<Role>("Candidate");
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGstVerified, setIsGstVerified] = useState(false);

  // --- CANDIDATE FORM ---
  const candidateForm = useForm<CandidateRegisterValues>({
    resolver: zodResolver(candidateRegisterSchema),
    mode: "onChange"
  });

  // --- EMPLOYER FORM ---
  const employerForm = useForm<EmployerRegisterValues>({
    resolver: zodResolver(employerRegisterSchema),
    mode: "onChange",
    defaultValues: {
      country: "India"
    }
  });

  // --- RECRUITER FORM ---
  const recruiterForm = useForm<RecruiterRegisterValues>({
    resolver: zodResolver(recruiterRegisterSchema),
    mode: "onChange"
  });

  const handleGstVerify = async () => {
    const gstNumber = employerForm.getValues("gst_number");
    if (!gstNumber || gstNumber.length !== 15) {
      showToast("Please enter a valid 15-digit GST number", "error");
      return;
    }

    setIsLoading(true);
    try {
      const resp = await verifyGST(gstNumber);
      if (resp.status === "ok" && resp.company_details?.length > 0) {
        const details = resp.company_details[0];
        // Dynamic set values in react-hook-form
        employerForm.setValue("name", details.name || "");
        employerForm.setValue("city", details.city || "");
        employerForm.setValue("state", details.state || "");
        employerForm.setValue("country", details.country_id?.display_name || "India");
        
        setIsGstVerified(true);
        showToast("GST Verified Successfully!", "success");
      } else {
        showToast(resp.message || "Invalid GST Number", "error");
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || "GST Verification failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const onCandidateSubmit = async (values: CandidateRegisterValues) => {
    setIsLoading(true);
    try {
      const resp = await candidateRegister(values);
      if (resp.status === "success" || resp.id) {
        showToast("Candidate Registered Successfully!", "success");
        navigate("/login");
      } else {
        showToast(resp.message || "Registration failed", "error");
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const onEmployerSubmit = async (values: EmployerRegisterValues) => {
    if (!isGstVerified) {
      showToast("Please verify your GST number first", "error");
      return;
    }

    setIsLoading(true);
    try {
      const resp = await registerCompany(values);
      if (resp.status === "success" || resp.id) {
        showToast("Company Registered Successfully!", "success");
        navigate("/login");
      } else {
        showToast(resp.message || "Registration failed", "error");
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const onRecruiterSubmit = async (values: RecruiterRegisterValues) => {
    showToast("Recruiter Registration not fully implemented in API yet.", "info");
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
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
          alt="Modern Team" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 p-16 xl:p-24 max-w-2xl">
          <h2 className="text-5xl xl:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.05]">
            Accelerate your <br /> <span className="text-brand-red drop-shadow-[0_0_15px_rgba(211,47,47,0.3)]">Growth</span> Story.
          </h2>
          <p className="text-white/70 font-medium leading-relaxed text-lg xl:text-xl">
            Whether you are securing your next executive role or scaling an entire engineering vertical—Kalibre delivers.
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
            <div className="flex mb-10">
              <Link to="/" className="flex items-center gap-2 group">
                 <img src={KalibreLogo} alt="Kalibre Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" />
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-black mb-3 text-brand-black tracking-tight">
                Create an account
              </h1>
              <p className="text-brand-grey font-medium text-sm mb-8">
                Join Kalibre to accelerate your journey
              </p>
            </div>

            {/* Role Tab Selector */}
            <div className="relative flex p-1 bg-black/5 rounded-2xl mb-10">
              {roles.map((role) => {
                const isActive = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => {
                        setActiveRole(role.id);
                        setIsGstVerified(false);
                    }}
                    className={`relative w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors z-10 ${
                      isActive ? "text-brand-black" : "text-brand-grey hover:text-brand-black/80"
                    }`}
                  >
                    {role.icon}
                    {role.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeRegisterRoleTab"
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
              {activeRole === "Candidate" && (
                <motion.div
                    key="Candidate"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <form className="space-y-4" onSubmit={candidateForm.handleSubmit(onCandidateSubmit)}>
                        <Input 
                            label="Full Name" 
                            {...candidateForm.register("name")} 
                            error={candidateForm.formState.errors.name?.message} 
                            placeholder="Ronit Dabgar" 
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input 
                                label="Work Email" 
                                type="email" 
                                {...candidateForm.register("email")} 
                                error={candidateForm.formState.errors.email?.message} 
                                placeholder="you@example.com" 
                            />
                            <Input 
                                label="Phone Number" 
                                {...candidateForm.register("phone")} 
                                error={candidateForm.formState.errors.phone?.message} 
                                placeholder="9909869997" 
                                icon={<Phone size={16} />}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select 
                                label="Gender" 
                                options={[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                    { label: "Other", value: "other" }
                                ]}
                                {...candidateForm.register("gender")} 
                                error={candidateForm.formState.errors.gender?.message}
                                icon={<User2 size={16} />}
                            />
                            <Input 
                                label="Date of Birth" 
                                type="date" 
                                {...candidateForm.register("dob")} 
                                error={candidateForm.formState.errors.dob?.message} 
                                icon={<Calendar size={16} />}
                            />
                        </div>

                        <Input 
                            label="Verification Key" 
                            {...candidateForm.register("verification_key")} 
                            error={candidateForm.formState.errors.verification_key?.message} 
                            placeholder="Enter verification key" 
                            icon={<KeyRound size={16} />}
                        />
                        
                        <Input 
                            label="Password" 
                            type="password" 
                            {...candidateForm.register("password")} 
                            error={candidateForm.formState.errors.password?.message} 
                            placeholder="••••••••" 
                        />
                        
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-4 mt-2 bg-brand-black text-white rounded-2xl font-bold shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:bg-black/80 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all text-base flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
                        </button>
                    </form>
                </motion.div>
              )}

              {activeRole === "Employer" && (
                <motion.div
                    key="Employer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <form className="space-y-4" onSubmit={employerForm.handleSubmit(onEmployerSubmit)}>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[2px] text-brand-grey pl-1">GST Number</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              {...employerForm.register("gst_number")}
                              placeholder="e.g. 27AAGCA5936J1ZE" 
                              className={`flex-1 px-5 py-3.5 rounded-2xl bg-black/[0.03] border border-transparent focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 outline-none transition-all placeholder:text-brand-grey/50 font-medium ${employerForm.formState.errors.gst_number ? "border-red-500" : ""}`} 
                            />
                            <button 
                              type="button" 
                              onClick={handleGstVerify}
                              disabled={isLoading || isGstVerified}
                              className={`px-6 rounded-2xl font-bold transition-all flex items-center gap-2 ${
                                isGstVerified 
                                ? "bg-emerald-100 text-emerald-700 cursor-default" 
                                : "bg-brand-red text-white hover:bg-red-700 active:scale-95 shadow-lg shadow-brand-red/20"
                              }`}
                            >
                              {isLoading ? <Loader2 className="animate-spin" size={18} /> : isGstVerified ? <CheckCircle2 size={18} /> : "Verify"}
                            </button>
                          </div>
                          {employerForm.formState.errors.gst_number && <p className="text-xs text-red-500 font-medium pl-1">{employerForm.formState.errors.gst_number.message}</p>}
                        </div>

                        <Input label="Company Name" {...employerForm.register("name")} error={employerForm.formState.errors.name?.message} disabled={!isGstVerified} placeholder="Auto-filled from GST" className={!isGstVerified ? "opacity-50" : ""} />

                        <div className="grid grid-cols-2 gap-4">
                            <Input label="City" {...employerForm.register("city")} error={employerForm.formState.errors.city?.message} disabled={!isGstVerified} placeholder="City" className={!isGstVerified ? "opacity-50" : ""} />
                            <Input label="State" {...employerForm.register("state")} error={employerForm.formState.errors.state?.message} disabled={!isGstVerified} placeholder="State" className={!isGstVerified ? "opacity-50" : ""} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Street 1" {...employerForm.register("street")} error={employerForm.formState.errors.street?.message} disabled={!isGstVerified} placeholder="House No, Building" className={!isGstVerified ? "opacity-50" : ""} />
                            <Input label="Street 2" {...employerForm.register("street2")} error={employerForm.formState.errors.street2?.message} disabled={!isGstVerified} placeholder="Area, Landmark" className={!isGstVerified ? "opacity-50" : ""} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Zip Code" {...employerForm.register("zip")} error={employerForm.formState.errors.zip?.message} disabled={!isGstVerified} placeholder="e.g. 380001" className={!isGstVerified ? "opacity-50" : ""} />
                            <Input label="Phone" {...employerForm.register("phone")} error={employerForm.formState.errors.phone?.message} disabled={!isGstVerified} placeholder="Phone Number" className={!isGstVerified ? "opacity-50" : ""} />
                        </div>

                        <Input label="Work Email" type="email" {...employerForm.register("email")} error={employerForm.formState.errors.email?.message} placeholder="you@company.com" />
                        <Input label="Password" type="password" {...employerForm.register("password")} error={employerForm.formState.errors.password?.message} placeholder="••••••••" />

                        <button
                            type="submit"
                            disabled={isLoading || !isGstVerified}
                            className="w-full py-4 mt-2 bg-brand-black text-white rounded-2xl font-bold shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:bg-black/80 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Create Account"}
                        </button>
                    </form>
                </motion.div>
              )}

              {activeRole === "Recruiter" && (
                <motion.div
                    key="Recruiter"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    <form className="space-y-5" onSubmit={recruiterForm.handleSubmit(onRecruiterSubmit)}>
                        <Input label="Agency Name" {...recruiterForm.register("agencyName")} error={recruiterForm.formState.errors.agencyName?.message} placeholder="Global Tech HR" />
                        <Input label="Full Name" {...recruiterForm.register("fullName")} error={recruiterForm.formState.errors.fullName?.message} placeholder="Aiden Lee" />
                        <Input label="Work Email" type="email" {...recruiterForm.register("email")} error={recruiterForm.formState.errors.email?.message} placeholder="you@agency.com" />
                        <Input label="Password" type="password" {...recruiterForm.register("password")} error={recruiterForm.formState.errors.password?.message} placeholder="••••••••" />

                        <button type="submit" className="w-full py-4 mt-2 bg-brand-black text-white rounded-2xl font-bold shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:bg-black/80 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all text-base">
                            Create Account
                        </button>
                    </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 text-center text-sm text-brand-grey font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-black font-black hover:text-brand-red transition-colors">
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
