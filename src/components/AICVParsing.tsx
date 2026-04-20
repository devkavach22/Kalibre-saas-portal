import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Sparkles, Loader2, X, BrainCircuit, Scan, Cpu } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cvParsingSchema, type CVParsingValues } from '../lib/validations';
import Button from './ui/Button';
import Input from './ui/Input';
import { useToast } from '../context/ToastContext';

interface AICVParsingProps {
  onComplete?: (data: CVParsingValues) => void;
  onClose?: () => void;
}

const AICVParsing: React.FC<AICVParsingProps> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState<'upload' | 'parsing' | 'form'>('upload');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CVParsingValues>({
    resolver: zodResolver(cvParsingSchema),
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      startParsing();
    }
  };

  const startParsing = () => {
    setStep('parsing');
    // Simulate AI parsing
    setTimeout(() => {
      // Mock data extracted from "CV"
      const mockData: CVParsingValues = {
        fullName: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 (555) 123-4567",
        skills: ["React", "TypeScript", "Node.js", "Framer Motion", "Tailwind CSS"],
        experienceYears: "5",
        currentRole: "Senior Frontend Engineer",
        summary: "Passionate frontend developer with 5+ years of experience building high-performance web applications using modern JavaScript frameworks.",
      };

      Object.entries(mockData).forEach(([key, value]) => {
        setValue(key as keyof CVParsingValues, value);
      });

      setStep('form');
      showToast("AI Parsing Complete!", "success");
    }, 4000);
  };

  const onSubmit = async (data: CVParsingValues) => {
    setIsSubmitting(true);
    // Simulate final save
    setTimeout(() => {
        console.log("Final Data:", data);
        showToast("Profile updated successfully", "success");
        setIsSubmitting(false);
        onComplete?.(data);
        onClose?.();
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/10 mb-4">
                <BrainCircuit className="text-brand-red w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-brand-black tracking-tight">AI CV Parser</h2>
              <p className="text-brand-grey font-medium mt-2">Upload your resume and let our AI handle the rest.</p>
            </div>

            <label className="group relative block cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
              <div className="border-2 border-dashed border-black/10 group-hover:border-brand-red/30 rounded-3xl p-16 transition-all duration-500 bg-white/50 group-hover:bg-brand-red/[0.02] flex flex-col items-center justify-center">
                <div className="relative">
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-red to-red-600 flex items-center justify-center shadow-2xl shadow-brand-red/30"
                    >
                        <Upload className="text-white w-10 h-10" />
                    </motion.div>
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl border-2 border-brand-red"
                    />
                </div>
                <div className="mt-8 text-center">
                  <span className="text-xl font-bold text-brand-black block">Drop your CV here</span>
                  <span className="text-sm text-brand-grey font-medium mt-1">PDF, DOCX up to 10MB</span>
                </div>
                
                {/* Visual Flair */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <div className="h-1 w-8 bg-brand-red/20 rounded-full" />
                    <div className="h-1 w-4 bg-brand-red/10 rounded-full" />
                </div>
              </div>
            </label>
            
            <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                    { icon: Sparkles, text: "Instant Autofill" },
                    { icon: Scan, text: "Deep Skill Extraction" },
                    { icon: Cpu, text: "Neural Mapping" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-black/[0.02] border border-black/5">
                        <item.icon size={18} className="text-brand-red" />
                        <span className="text-xs font-bold text-brand-black">{item.text}</span>
                    </div>
                ))}
            </div>
          </motion.div>
        )}

        {step === 'parsing' && (
          <motion.div
            key="parsing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="p-16 flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="relative w-48 h-64 bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden">
                {/* Scanning Laser */}
                <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent z-10 shadow-[0_0_15px_rgba(193,39,45,0.8)]"
                />
                
                {/* Content Simulation */}
                <div className="p-6 space-y-4">
                    <div className="h-4 w-3/4 bg-black/5 rounded" />
                    <div className="h-2 w-full bg-black/5 rounded" />
                    <div className="h-2 w-5/6 bg-black/5 rounded" />
                    <div className="space-y-2 pt-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0.2 }}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                                className="h-1.5 w-full bg-brand-red/10 rounded" 
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <h3 className="text-2xl font-black text-brand-black">AI is analyzing {fileName}</h3>
                    <p className="text-brand-grey font-medium mt-2">Extracting skills, experience, and key metrics...</p>
                </motion.div>
                
                <div className="mt-8 flex gap-4 justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/5 border border-brand-red/10">
                        <Loader2 size={14} className="animate-spin text-brand-red" />
                        <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">Processing</span>
                    </div>
                </div>
            </div>
            
            {/* Background floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-brand-red/20 rounded-full"
                        animate={{
                            x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                            y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                        style={{ left: '50%', top: '50%' }}
                    />
                ))}
            </div>
          </motion.div>
        )}

        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/5">
                <div>
                  <h3 className="text-2xl font-black text-brand-black tracking-tight">AI Extracted Data</h3>
                  <p className="text-sm font-medium text-brand-grey">Verify and refine your professional details</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <CheckCircle2 size={18} />
                    <span className="text-xs font-bold">98% Confidence</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <Input 
                    label="Full Name" 
                    {...register("fullName")} 
                    error={errors.fullName?.message} 
                  />
                  <Input 
                    label="Email Address" 
                    {...register("email")} 
                    error={errors.email?.message} 
                  />
                  <Input 
                    label="Phone Number" 
                    {...register("phone")} 
                    error={errors.phone?.message} 
                  />
                </div>
                <div className="space-y-6">
                  <Input 
                    label="Current Role" 
                    {...register("currentRole")} 
                    error={errors.currentRole?.message} 
                  />
                  <Input 
                    label="Years of Experience" 
                    {...register("experienceYears")} 
                    error={errors.experienceYears?.message} 
                  />
                  <div>
                    <label className="block text-sm font-bold text-brand-black mb-2 px-1">Top Skills</label>
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-black/[0.02] border border-black/5">
                        {["React", "TypeScript", "Node.js", "Framer Motion", "Tailwind"].map((skill, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg bg-white border border-black/5 text-xs font-bold text-brand-black flex items-center gap-2">
                                {skill}
                                <X size={12} className="text-brand-grey transition-colors cursor-pointer" />
                            </span>
                        ))}
                        <button type="button" className="px-3 py-1 rounded-lg border border-dashed border-brand-red/30 text-xs font-black text-brand-red hover:bg-brand-red/5 transition-colors">
                            + Add Skill
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-bold text-brand-black mb-2 px-1">Professional Summary</label>
                <textarea 
                  {...register("summary")}
                  className="w-full h-32 px-5 py-4 rounded-2xl bg-black/[0.02] border border-black/5 focus:border-brand-red focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 rounded-2xl"
                    onClick={() => setStep('upload')}
                >
                    Re-upload CV
                </Button>
                <Button 
                    type="submit" 
                    variant="primary" 
                    className="flex-2 rounded-2xl shadow-lg shadow-brand-red/20"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Confirm & Update Profile"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AICVParsing;
