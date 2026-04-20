import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Briefcase,
  BookOpen,
  User,
  ArrowRight,
  Plus,
  Trash2,
  Sparkles,
  Presentation,
  Award,
  Globe,
  FileText,
  BadgeCheck,
  Building2,
  Layers,
  Search,
  ChevronRight,
  TrendingUp,
  Layout
} from 'lucide-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import MultiSelect from '../../components/ui/MultiSelect';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { cn } from "../../lib/utils";

// --- VALIDATION SCHEMA ---
const schema = z.object({
  partner_name: z.string().min(2, "Name is required"),
  resume_file: z.any().optional(),
  partner_phone: z.string().regex(/^\d+$/, "Must be a valid number"),
  alternative_phone: z.string().optional(),
  candidate_email: z.string().email("Invalid email address"),
  current_country: z.string().min(1, "Required"),
  site_state: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  preferred_country: z.string().optional(),
  preferred_state: z.string().optional(),
  preferred_city: z.string().optional(),
  hometown: z.string().optional(),
  course: z.string().optional(),
  specialization: z.string().optional(),
  graduation_year_passing: z.string().optional(),
  pg: z.string().optional(),
  pg_specialization: z.string().optional(),
  pg_year_passing: z.string().optional(),
  gender: z.string().min(1, "Required"),
  dob: z.string().min(1, "Required"),
  age: z.string().optional(),
  department_ids: z.string().optional(),
  role_ids: z.string().optional(),
  industry_ids: z.string().optional(),
  categ_ids: z.array(z.string()).optional(),
  current_company: z.string().optional(),
  current_designation: z.string().optional(),
  duration: z.string().optional(),
  reporting_to: z.string().optional(),
  team_size: z.string().optional(),
  total_experience: z.string().optional(),
  relevant_experience: z.string().optional(),
  reason_for_change: z.string().optional(),
  worked_for_companies: z.string().optional(),
  family_background: z.string().optional(),
  current_ctc: z.string().optional(),
  expected_ctc: z.string().optional(),
  hike_percentage: z.string().optional(),
  notice_period_in_days: z.string().optional(),
  status: z.string().optional(),
  remarks: z.string().optional(),
  employment: z.array(z.any()).optional(),
  education: z.array(z.any()).optional(),
  projects: z.array(z.any()).optional(),
  online_profile: z.array(z.any()).optional(),
  work_sample: z.array(z.any()).optional(),
  white_paper: z.array(z.any()).optional(),
  presentation: z.array(z.any()).optional(),
  patents: z.array(z.any()).optional(),
  certifications: z.array(z.any()).optional(),
  career_profile: z.array(z.any()).optional(),
});

type OnboardingFormData = z.infer<typeof schema>;

const steps = [
  { id: 'master', title: 'Core Identity', description: 'Essential identity markers', icon: User },
  { id: 'professional', title: 'Career Syntax', description: 'Professional synthesis', icon: Briefcase },
  { id: 'background', title: 'Asset Genome', description: 'Deep recursive profile', icon: Layout },
];

const tabs = [
  { id: 'employment', label: 'Employment', icon: Building2 },
  { id: 'education', label: 'Education', icon: BookOpen },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'online_profile', label: 'Social', icon: Globe },
  { id: 'work_sample', label: 'Samples', icon: FileText },
  { id: 'white_paper', label: 'Papers', icon: FileText },
  { id: 'presentation', label: 'Slides', icon: Presentation },
  { id: 'patents', label: 'Patents', icon: BadgeCheck },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'career_profile', label: 'Career', icon: User },
];

const dummyOptions = [
  { label: 'India', value: 'IN' },
  { label: 'USA', value: 'US' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Engineering', value: 'eng' },
  { label: 'Management', value: 'mgmt' },
  { label: 'Product', value: 'prod' },
];

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('employment');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      categ_ids: [],
      employment: [{}],
      education: [{}],
      projects: [],
      online_profile: [],
      work_sample: [],
      white_paper: [],
      presentation: [],
      patents: [],
      certifications: [],
      career_profile: [],
    }
  });

  const fieldArrays = {
    employment: useFieldArray({ control, name: "employment" }),
    education: useFieldArray({ control, name: "education" }),
    projects: useFieldArray({ control, name: "projects" }),
    online_profile: useFieldArray({ control, name: "online_profile" }),
    work_sample: useFieldArray({ control, name: "work_sample" }),
    white_paper: useFieldArray({ control, name: "white_paper" }),
    presentation: useFieldArray({ control, name: "presentation" }),
    patents: useFieldArray({ control, name: "patents" }),
    certifications: useFieldArray({ control, name: "certifications" }),
    career_profile: useFieldArray({ control, name: "career_profile" }),
  };

  const dob = watch('dob');
  const currentCtc = watch('current_ctc');
  const expectedCtc = watch('expected_ctc');

  useEffect(() => {
    if (dob) {
      const age = new Date().getFullYear() - new Date(dob).getFullYear();
      setValue('age', age.toString());
    }
  }, [dob, setValue]);

  useEffect(() => {
    if (currentCtc && expectedCtc) {
      const hike = ((parseFloat(expectedCtc) - parseFloat(currentCtc)) / parseFloat(currentCtc)) * 100;
      setValue('hike_percentage', isNaN(hike) ? "0%" : hike.toFixed(2) + "%");
    }
  }, [currentCtc, expectedCtc, setValue]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast("Neural sync complete. Optimizing dashboard...", "success");
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-10 lg:px-20 bg-[#fafafa]">
      <div className="flex flex-col lg:flex-row gap-16 max-w-[1600px] mx-auto">

        {/* 1. ELITE VERTICAL STEPPER (LEFT) */}
        <div className="lg:w-80 shrink-0">
          <div className="sticky top-20 space-y-12">
            <div className="mb-10">
              <h1 className="text-2xl font-black tracking-tighter text-black uppercase">Onboarding <span className="text-brand-red">Protocol</span></h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Sequence version 2.4.0</p>
            </div>

            {steps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isActive = idx === currentStep;
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative flex gap-6 group cursor-pointer" onClick={() => idx < currentStep && setCurrentStep(idx)}>
                  {idx !== steps.length - 1 && (
                    <div className="absolute left-[23px] top-12 bottom-[-48px] w-[2px] bg-zinc-100 overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: isCompleted ? "100%" : "0%" }}
                        className="w-full bg-brand-red"
                      />
                    </div>
                  )}

                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        backgroundColor: isCompleted ? "#c1272d" : isActive ? "#000" : "#fff",
                        borderColor: isCompleted ? "#c1272d" : isActive ? "#000" : "#e5e5e5"
                      }}
                      className="w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shadow-sm"
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={18} className="text-white" />
                      ) : (
                        <Icon size={18} className={isActive ? "text-white" : "text-zinc-400"} />
                      )}
                    </motion.div>
                  </div>

                  <div className={`flex flex-col gap-0.5 transition-all duration-500 ${isActive ? "translate-x-2" : ""}`}>
                    <span className={`text-xs font-black uppercase tracking-widest ${isActive ? "text-black" : "text-zinc-400"}`}>
                      {step.title}
                    </span>
                    <span className={`text-[9px] font-bold ${isActive ? "text-brand-red" : "text-zinc-300"} uppercase tracking-widest`}>
                      {step.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. DYNAMIC FORM CANVAS (CENTER) */}
        <div className="flex-1 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="p-10 lg:p-16 bg-white border-0 shadow-[0_40px_100px_rgba(0,0,0,0.03)] rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/[0.01] blur-[120px] rounded-full pointer-events-none" />

                <div className="mb-14">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-[2px] bg-brand-red" />
                    <span className="text-[10px] font-black uppercase tracking-[4px] text-brand-red">Section 0{currentStep + 1}</span>
                  </div>
                  <h2 className="text-5xl font-black text-black tracking-tightest mb-4">
                    {steps[currentStep].title} <span className="text-brand-red italic">.</span>
                  </h2>
                  <p className="text-zinc-400 font-medium text-sm max-w-xl leading-relaxed">
                    {currentStep === 0 && "Initializing your core professional identity within the Kalibre neural ecosystem. Please ensure high data fidelity."}
                    {currentStep === 1 && "Synthesizing your professional timeline, performance metrics, and career trajectory indicators."}
                    {currentStep === 2 && "Compiling your deep asset genome including educational artifacts and intellectual properties."}
                  </p>
                </div>

                <div className="space-y-12">
                  {/* STEP 1: IDENTITY */}
                  {currentStep === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <Input label="Identity Name" {...register('partner_name')} placeholder="Alex Rivera" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Neural Resume</label>
                        <div className="relative group">
                          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          <div className="w-full bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-2xl py-4 px-6 flex items-center justify-between group-hover:border-brand-red/30 transition-colors">
                            <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Upload PDF/DOCX</span>
                            <FileText size={16} className="text-zinc-300 group-hover:text-brand-red transition-colors" />
                          </div>
                        </div>
                      </div>
                      <Input label="Contact Sequence" {...register('partner_phone')} placeholder="+91 000-000-0000" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Input label="Alternative Link" {...register('alternative_phone')} placeholder="+91 000-000-0000" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Input label="Universal Mail" {...register('candidate_email')} placeholder="alex@kalibre.ai" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <div className="grid grid-cols-2 gap-6">
                        <Input label="Birth Cycle" type="date" {...register('dob')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Input label="Age Metric" {...register('age')} disabled className="bg-zinc-100 border-transparent cursor-not-allowed opacity-60" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Gender Identification</label>
                        <div className="flex gap-3">
                          {['Male', 'Female', 'X'].map(g => (
                            <button key={g} type="button" onClick={() => setValue('gender', g)} className={cn(
                              "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
                              watch('gender') === g ? "bg-black text-white border-black" : "bg-zinc-50 text-zinc-400 border-transparent hover:border-zinc-200"
                            )}>
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Select label="Priority Department" options={dummyOptions} {...register('department_ids')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Select label="Professional Role" options={dummyOptions} {...register('role_ids')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Select label="Target Industry" options={dummyOptions} {...register('industry_ids')} className="bg-zinc-50/50 border-transparent focus:bg-white" />

                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-zinc-50 my-4">
                        <Select label="Current Country" options={dummyOptions} {...register('current_country')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Select label="Current State" options={dummyOptions} {...register('site_state')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Select label="Current City" options={dummyOptions} {...register('city')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      </div>

                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Select label="Preferred Location" options={dummyOptions} {...register('preferred_country')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Select label="Preferred City" options={dummyOptions} {...register('preferred_city')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Select label="Origin Home Town" options={dummyOptions} {...register('hometown')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      </div>

                      <div className="md:col-span-2 space-y-8 pt-6">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black uppercase tracking-[3px] text-brand-red">Degree Synthesis</span>
                          <div className="h-[1px] flex-1 bg-zinc-50" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
                          <Select label="Graduation" options={dummyOptions} {...register('course')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                          <Select label="Spec." options={dummyOptions} {...register('specialization')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                          <Input label="Passing Year" type="number" {...register('graduation_year_passing')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                          <Select label="Post Grad" options={dummyOptions} {...register('pg')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                          <Select label="PG Spec." options={dummyOptions} {...register('pg_specialization')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                          <Input label="PG Passing" type="number" {...register('pg_year_passing')} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PROFESSIONAL */}
                  {currentStep === 1 && (
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <Input label="Active Organization" {...register('current_company')} placeholder="e.g. Stripe" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Input label="Current Title" {...register('current_designation')} placeholder="Director of Engineering" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Input label="Tenure Duration" {...register('duration')} placeholder="3.5 Years" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Input label="Reporting Vector" {...register('reporting_to')} placeholder="Chief Technology Officer" className="bg-zinc-50/50 border-transparent focus:bg-white" />

                        <div className="grid grid-cols-2 gap-6">
                          <Input label="Team Magnitude" type="number" {...register('team_size')} placeholder="24" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                          <Input label="Notice (Days)" type="number" {...register('notice_period_in_days')} placeholder="60" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <Input label="Total EXP" type="number" step="0.01" {...register('total_experience')} placeholder="8.50" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                          <Input label="Relevant EXP" type="number" step="0.01" {...register('relevant_experience')} placeholder="6.00" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        </div>
                      </div>

                      <div className="bg-zinc-50/50 p-8 rounded-[2.5rem] space-y-8">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-[3px] text-black">Financial Metrics</span>
                          <TrendingUp size={16} className="text-brand-red" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <Input label="Current CTC (LPA)" type="number" {...register('current_ctc')} placeholder="24" className="bg-white border-transparent focus:ring-brand-red/10" />
                          <Input label="Expected CTC (LPA)" type="number" {...register('expected_ctc')} placeholder="32" className="bg-white border-transparent focus:ring-brand-red/10" />
                          <Input label="Calculated Hike" {...register('hike_percentage')} disabled className="bg-white border-transparent opacity-60 font-bold text-brand-red" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Controller
                          name="categ_ids"
                          control={control}
                          render={({ field }) => (
                            <MultiSelect
                              label="Neural Keywords (Skills)"
                              options={dummyOptions}
                              value={field.value || []}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Departure Narrative</label>
                          <textarea {...register('reason_for_change')} className="w-full bg-zinc-50/50 border-transparent rounded-[2rem] p-6 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-brand-red/5 min-h-[160px] leading-relaxed transition-all" placeholder="Why are you initiating a new sequence?" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Synthesis Remarks</label>
                          <textarea {...register('remarks')} className="w-full bg-zinc-50/50 border-transparent rounded-[2rem] p-6 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-brand-red/5 min-h-[160px] leading-relaxed transition-all" placeholder="Any additional signal data..." />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: ASSETS */}
                  {currentStep === 2 && (
                    <div className="space-y-10">
                      <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar -mx-2 px-2">
                        {tabs.map(tab => {
                          const TabIcon = tab.icon;
                          const isActive = activeTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setActiveTab(tab.id)}
                              className={cn(
                                "flex items-center gap-3 px-8 py-4 rounded-2xl shrink-0 transition-all duration-500",
                                isActive
                                  ? "bg-black text-white shadow-xl shadow-black/20 scale-105"
                                  : "bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
                              )}
                            >
                              <TabIcon size={16} />
                              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="min-h-[500px] bg-zinc-50/30 rounded-[3rem] p-4 lg:p-10 border border-zinc-50">
                        {renderTabContent(activeTab, fieldArrays, register, watch)}
                      </div>
                    </div>
                  )}
                </div>

                {/* FOOTER CONTROLS */}
                <div className="mt-20 pt-10 border-t border-zinc-50 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="text-[10px] font-black uppercase tracking-[3px] text-zinc-400 hover:text-black disabled:opacity-0 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight size={14} className="rotate-180" />
                      Backtrack
                    </div>
                  </Button>

                  <Button
                    variant="primary"
                    type="button"
                    onClick={nextStep}
                    className="bg-black hover:bg-brand-red text-white py-5 px-14 rounded-3xl group shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-brand-red/20 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black uppercase tracking-[3px]">
                        {currentStep === steps.length - 1 ? "Complete Deployment" : "Validate & Sync"}
                      </span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Support Legal */}
          <div className="mt-12 flex flex-col items-center gap-4 opacity-30 group hover:opacity-100 transition-opacity">
            <div className="flex gap-10 text-[9px] font-black uppercase tracking-[4px]">
              <span className="hover:text-brand-red cursor-pointer transition-colors">Neural Policy</span>
              <span className="hover:text-brand-red cursor-pointer transition-colors">Security Protocol</span>
              <span className="hover:text-brand-red cursor-pointer transition-colors">Data Sovereign</span>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[2px]">Kalibre Intelligent Recruitment Nexus © 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TAB CONTENT RENDERING (Spaced & Visible) ---
const renderTabContent = (tabId: string, f: any, register: any, watch: any) => {
  const { fields, append, remove } = f[tabId];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 bg-brand-red rounded-full" />
          <h3 className="text-2xl font-black text-black uppercase tracking-tightest">{tabId.replace('_', ' ')} <span className="text-zinc-300 italic text-lg ml-2">Sequence</span></h3>
        </div>
        <Button onClick={() => append({})} type="button" variant="secondary" className="flex items-center gap-3 hover:bg-brand-red rounded-2xl px-8 py-3 transition-all duration-500 shadow-xl shadow-black/10">
          <Plus size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Append Data</span>
        </Button>
      </div>

      <div className="space-y-8">
        {fields.map((field: any, index: number) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            key={field.id}
            className="p-10 bg-white rounded-[2.5rem] border border-zinc-100 relative group shadow-[0_20px_40px_rgba(0,0,0,0.02)]"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute -top-4 -right-4 p-4 bg-white border border-zinc-100 shadow-xl rounded-2xl text-zinc-300 hover:text-brand-red hover:border-brand-red transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {tabId === 'employment' && (
                <>
                  <Select label="Active Current" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} {...register(`employment.${index}.current_employment`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Select label="Contract Type" options={[{ label: 'Full Time', value: 'full_time' }, { label: 'Contract', value: 'contract' }]} {...register(`employment.${index}.employment_type`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Corporation Name" {...register(`employment.${index}.current_company_name`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Compensation (LPA)" type="number" {...register(`employment.${index}.c_salary`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Designation" {...register(`employment.${index}.job_title`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Induction Date" type="date" {...register(`employment.${index}.joining_date_form`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Skill Cluster Utilized</label>
                      <textarea {...register(`employment.${index}.skills_used`)} className="w-full bg-zinc-50/50 border-transparent rounded-2xl p-5 text-sm min-h-[120px] focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Functional Job Profile</label>
                      <textarea {...register(`employment.${index}.job_profile`)} className="w-full bg-zinc-50/50 border-transparent rounded-2xl p-5 text-sm min-h-[120px] focus:bg-white transition-all" />
                    </div>
                  </div>
                </>
              )}

              {tabId === 'education' && (
                <>
                  <Select
                    label="Qualification Depth"
                    options={[{ label: '10th Secondary', value: '10' }, { label: '12th Senior Secondary', value: '12' }, { label: 'Graduate Protocol', value: 'grad' }, { label: 'Post Grad Protocol', value: 'pg' }]}
                    {...register(`education.${index}.type_id`)}
                    className="bg-zinc-50/50 border-transparent focus:bg-white"
                  />
                  {['10', '12'].includes(watch(`education.${index}.type_id`)) ? (
                    <>
                      <Select label="Board Authority" options={[{ label: 'CBSE', value: 'cbse' }, { label: 'ICSE', value: 'icse' }]} {...register(`education.${index}.board`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Input label="Pass Year" type="number" {...register(`education.${index}.passing_year`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Select label="Instruction Medium" options={[{ label: 'English', value: 'english' }, { label: 'Hindi', value: 'hindi' }]} {...register(`education.${index}.school_medium`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Input label="Agg. Mark %" {...register(`education.${index}.marks`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="English Score" {...register(`education.${index}.english_marks`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                        <Input label="Math Score" {...register(`education.${index}.maths_marks`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Select label="Institute / University" options={dummyOptions} {...register(`education.${index}.university_institute`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Select label="Degree Course" options={dummyOptions} {...register(`education.${index}.course`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Select label="Core Specialization" options={dummyOptions} {...register(`education.${index}.specialization`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Input label="Grading Index" {...register(`education.${index}.g_system`)} placeholder="GPA / CGPA" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                      <Input label="Passing Target" type="number" {...register(`education.${index}.passing_year`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                    </>
                  )}
                </>
              )}

              {tabId === 'projects' && (
                <>
                  <Input label="Project Headline" {...register(`projects.${index}.project_title`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Select label="Asset Tag" options={dummyOptions} {...register(`projects.${index}.tag_this_project`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Client Entity" {...register(`projects.${index}.client`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Select label="Current Status" options={[{ label: 'Ongoing', value: 'ongoing' }, { label: 'Archived', value: 'completed' }]} {...register(`projects.${index}.project_status`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Start Cycle" type="number" {...register(`projects.${index}.worked_from`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                    <Select label="Month" options={dummyOptions} {...register(`projects.${index}.select_month`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  </div>
                  <div className="lg:col-span-3 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Technical Deep Dive</label>
                    <textarea {...register(`projects.${index}.details_of_project`)} className="w-full bg-zinc-50/50 border-transparent rounded-2xl p-5 text-sm min-h-[140px] focus:bg-white transition-all" placeholder="Architecture, technologies used, and your specific impact..." />
                  </div>
                </>
              )}

              {tabId === 'online_profile' && (
                <>
                  <Input label="Network Identity" {...register(`online_profile.${index}.social_profile`)} placeholder="GitHub / LinkedIn" className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Resource URL" {...register(`online_profile.${index}.url`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <div className="lg:col-span-1 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Profile Summary</label>
                    <textarea {...register(`online_profile.${index}.profile_description`)} className="w-full bg-zinc-50/50 border-transparent rounded-2xl p-4 text-sm min-h-[80px] focus:bg-white transition-all" />
                  </div>
                </>
              )}

              {tabId === 'work_sample' && (
                <>
                  <Input label="Artifact Title" {...register(`work_sample.${index}.work_title`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Resource URL" {...register(`work_sample.${index}.work_url`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select label="Years From" options={dummyOptions} {...register(`work_sample.${index}.duration_from`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                    <Select label="Months" options={dummyOptions} {...register(`work_sample.${index}.duration_month`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  </div>
                  <Input label="Cycle Duration" {...register(`work_sample.${index}.work_sample_duration`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <label className="flex items-center gap-4 cursor-pointer select-none py-4 px-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-brand-red transition-all">
                    <input type="checkbox" {...register(`work_sample.${index}.currently_working`)} className="w-6 h-6 rounded-lg border-zinc-300 text-brand-red focus:ring-brand-red transition-all" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Sequence</span>
                  </label>
                </>
              )}

              {tabId === 'white_paper' && (
                <>
                  <Input label="Paper Title" {...register(`white_paper.${index}.white_paper_title`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Publication URL" {...register(`white_paper.${index}.white_paper_url`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select label="Release Year" options={dummyOptions} {...register(`white_paper.${index}.white_paper_duration_from`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                    <Select label="Month" options={dummyOptions} {...register(`white_paper.${index}.white_paper_duration_month`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  </div>
                  <div className="lg:col-span-3 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Abstract / Description</label>
                    <textarea {...register(`white_paper.${index}.white_paper_description`)} className="w-full bg-zinc-50/50 border-transparent rounded-2xl p-6 text-sm min-h-[120px] focus:bg-white transition-all" />
                  </div>
                </>
              )}

              {tabId === 'presentation' && (
                <>
                  <Input label="Presentation Title" {...register(`presentation.${index}.presentation_title`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Deck URL" {...register(`presentation.${index}.presentation_url`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <div className="lg:col-span-1 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">Contextual Description</label>
                    <textarea {...register(`presentation.${index}.presentation_description`)} className="w-full bg-zinc-50/50 border-transparent rounded-2xl p-6 text-sm min-h-[120px] focus:bg-white transition-all" />
                  </div>
                </>
              )}

              {tabId === 'patents' && (
                <>
                  <Input label="Patent Title" {...register(`patents.${index}.patent_title`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Registry URL" {...register(`patents.${index}.patent_url`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Application ID" {...register(`patents.${index}.application_number`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select label="Issue Cycle" options={dummyOptions} {...register(`patents.${index}.issue_date`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                    <Select label="Month" options={dummyOptions} {...register(`patents.${index}.patent_month`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  </div>
                  <div className="flex gap-4 items-center h-full pt-4">
                    <label className="flex-1 flex items-center gap-3 px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-green-500/30 transition-all cursor-pointer">
                      <input type="checkbox" {...register(`patents.${index}.patent_issued`)} className="w-5 h-5 rounded-lg text-green-500 focus:ring-green-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Issued</span>
                    </label>
                    <label className="flex-1 flex items-center gap-3 px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-amber-500/30 transition-all cursor-pointer">
                      <input type="checkbox" {...register(`patents.${index}.patent_pending`)} className="w-5 h-5 rounded-lg text-amber-500 focus:ring-amber-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Pending</span>
                    </label>
                  </div>
                  <div className="lg:col-span-3 space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 pl-1">IP Specification</label>
                    <textarea {...register(`patents.${index}.patent_description`)} className="w-full bg-zinc-50/50 border-transparent rounded-2xl p-6 text-sm min-h-[120px] focus:bg-white transition-all" />
                  </div>
                </>
              )}

              {tabId === 'certifications' && (
                <>
                  <Input label="Certification Name" {...register(`certifications.${index}.certifications_name`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Credential ID" {...register(`certifications.${index}.certifications_completion_id`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Validation URL" {...register(`certifications.${index}.certifications_url`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select label="Month From" options={dummyOptions} {...register(`certifications.${index}.certifications_month_form`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                    <Select label="Year From" options={dummyOptions} {...register(`certifications.${index}.certifications_year_from`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Select label="Month To" options={dummyOptions} {...register(`certifications.${index}.certifications_month_to`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                    <Select label="Year To" options={dummyOptions} {...register(`certifications.${index}.certifications_year_to`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  </div>
                  <label className="flex items-center gap-4 cursor-pointer select-none py-4 px-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-brand-red transition-all lg:translate-y-2">
                    <input type="checkbox" {...register(`certifications.${index}.certifications_expiry`)} className="w-6 h-6 rounded-lg text-brand-red transition-all" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Lifetime Credential</span>
                  </label>
                </>
              )}

              {tabId === 'career_profile' && (
                <>
                  <Select label="Target Industry" options={dummyOptions} {...register(`career_profile.${index}.current_industry_id`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Select label="Priority Dept." options={dummyOptions} {...register(`career_profile.${index}.department`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Select label="Job Role Focus" options={dummyOptions} {...register(`career_profile.${index}.job_role`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Select label="Shift Preference" options={[{ label: 'Day', value: 'day' }, { label: 'Night', value: 'night' }, { label: 'Flexible', value: 'flex' }]} {...register(`career_profile.${index}.preferred_shift`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Select label="Work Location" options={dummyOptions} {...register(`career_profile.${index}.preferred_work_location`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />
                  <Input label="Expected Remuneration" type="number" {...register(`career_profile.${index}.ex_salary`)} className="bg-zinc-50/50 border-transparent focus:bg-white" />

                  <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4 py-8 px-10 bg-zinc-50/50 rounded-[2.5rem] border border-zinc-100">
                    {[
                      { id: 'desired_job_type_permanent', label: 'Permanent' },
                      { id: 'desired_job_type_contractual', label: 'Contract' },
                      { id: 'desired_employment_type_full_time', label: 'Full-Time' },
                      { id: 'desired_employment_type_part_time', label: 'Part-Time' }
                    ].map(check => (
                      <label key={check.id} className="flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-transform">
                        <input type="checkbox" {...register(`career_profile.${index}.${check.id}`)} className="w-5 h-5 rounded-lg border-zinc-300 text-brand-red focus:ring-brand-red" />
                        <span className="text-[10px] font-black uppercase tracking-tight text-zinc-600">{check.label}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}

        {fields.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center border-4 border-dashed border-white/50 rounded-[4rem] bg-zinc-100/30">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6">
              <Plus size={32} className="text-zinc-200" />
            </div>
            <h4 className="text-sm font-black uppercase tracking-[4px] text-zinc-400">Void Detected</h4>
            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mt-2">Initialize your {tabId} artifacts</p>
            <Button onClick={() => append({})} type="button" variant="secondary" className="mt-8 hover:bg-brand-red px-10 py-4 rounded-2xl shadow-xl transition-all duration-500">
                Initialize Sequence
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
