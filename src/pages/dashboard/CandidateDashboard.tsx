import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SubMenu from '../../components/ui/SubMenu';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp, Sparkles, Loader2, BrainCircuit, Zap, BarChart3, Rocket, Settings, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileOptimizationSchema, type ProfileOptimizationValues } from '../../lib/validations';
import { useToast } from '../../context/ToastContext';
import AICVParsing from '../../components/AICVParsing';


const CandidateDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParsingOpen, setIsParsingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileOptimizationValues>({
    resolver: zodResolver(profileOptimizationSchema),
    mode: "onChange",
  });

  const onSubmit = async (_values: ProfileOptimizationValues) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        showToast("Profile Optimized Successfully!", "success");
        setIsModalOpen(false);
        reset();
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      
      {/* --- ELITE MODAL FORM --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Optimize Application Profile">
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-brand-red/5 p-5 rounded-2xl border border-brand-red/10 mb-6 flex gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 blur-2xl rounded-full" />
              <Sparkles className="text-brand-red shrink-0 relative z-10" />
              <p className="text-sm font-bold text-brand-black relative z-10 leading-relaxed font-sans">Improve your visibility. Adding target salary and years of experience helps our AI place you in higher bracket roles.</p>
            </div>
            
            <Input 
                label="Current Job Title" 
                {...register("currentJobTitle")} 
                error={errors.currentJobTitle?.message} 
                placeholder="e.g. Senior Frontend Engineer" 
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Select 
                 label="Experience Level" 
                 {...register("experienceLevel")}
                 error={errors.experienceLevel?.message}
                 options={[
                   { label: "1-3 Years", value: "junior" },
                   { label: "4-6 Years", value: "mid" },
                   { label: "7+ Years", value: "senior" }
                 ]} 
              />
              <Input 
                label="Target Salary (USD)" 
                {...register("targetSalary")}
                error={errors.targetSalary?.message}
                placeholder="$150,000" 
                type="text" 
              />
            </div>

            <Button type="submit" variant="primary" className="w-full mt-6 py-4 rounded-2xl shadow-xl shadow-brand-red/20 font-black tracking-widest uppercase transition-all hover:scale-[1.02]" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Deploy Changes"}
            </Button>
         </form>
      </Modal>

      {/* --- AI CV PARSING MODAL --- */}
      <Modal 
        isOpen={isParsingOpen} 
        onClose={() => setIsParsingOpen(false)} 
        title="AI Neural Resume Analysis"
        width="max-w-4xl"
      >
        <AICVParsing onClose={() => setIsParsingOpen(false)} />
      </Modal>

      {/* --- DASHBOARD HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
            <div className="flex items-center gap-2 mb-1.5">
                <div className="px-2.5 py-1 rounded-full bg-brand-red/10 text-brand-red text-[9px] font-black uppercase tracking-[2px] border border-brand-red/10">Active Session</div>
                <span className="text-[9px] font-bold text-brand-grey uppercase tracking-[3px]">Rank: Top 4%</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-[-0.04em] text-brand-black leading-none uppercase">
                Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-800">Operational</span>
            </h1>
        </div>
        
        <div className="flex items-center gap-2 bg-white/60 p-1.5 rounded-xl border border-black/5 shadow-sm shrink-0">
           <SubMenu 
              tabs={["Overview", "Matches", "Analytics"]} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
           />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-5">
            {/* PROFILE STRENGTH CARD */}
            <Card className="relative overflow-hidden group border-white/40 bg-white/40 backdrop-blur-2xl hover:border-brand-red/20 transition-all duration-700 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.04)] p-6 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-[80px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
                
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-red to-red-800 flex items-center justify-center mb-5 shadow-lg shadow-brand-red/30 transform group-hover:rotate-6 transition-transform">
                        <Rocket className="text-white" size={22} />
                    </div>
                    <h3 className="text-2xl font-black text-brand-black tracking-tighter leading-none mb-4">
                        PROFILE INTEGRITY
                    </h3>
                    
                    <div className="flex items-end gap-1 mb-3 select-none">
                        <span className="text-6xl font-black text-brand-black tracking-tighter leading-none">94</span>
                        <span className="text-2xl font-black text-brand-red mb-1.5">%</span>
                    </div>
                    
                    <div className="h-5 w-full bg-black/[0.04] rounded-full overflow-hidden mt-6 shadow-inner relative border border-white/20">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "94%" }} 
                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-gradient-to-r from-brand-red via-red-600 to-amber-500 rounded-full relative" 
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                    </div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                    <Button 
                        variant="primary" 
                        className="w-full rounded-xl bg-brand-black hover:bg-brand-red text-white shadow-lg shadow-black/10 group h-10 transition-all duration-500 text-xs font-black tracking-widest uppercase"
                        onClick={() => setIsParsingOpen(true)}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <BrainCircuit size={15} className="group-hover:scale-110 transition-transform" />
                            <span>AI Neural Sync</span>
                        </div>
                    </Button>
                </div>
            </Card>

            {/* PERFORMANCE METRICS */}
            <Card className="bg-white border-black/5 p-5 shadow-sm">
                <h4 className="text-[9px] font-black text-brand-grey uppercase tracking-[3px] mb-4">Performance Index</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-2xl font-black text-brand-black tracking-tighter block">1.2k</span>
                        <span className="text-[9px] font-bold text-brand-grey uppercase tracking-widest">Profile Views</span>
                    </div>
                    <div>
                        <span className="text-2xl font-black text-brand-red tracking-tighter block">42</span>
                        <span className="text-[9px] font-bold text-brand-grey uppercase tracking-widest">Interviews</span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between text-emerald-600 font-bold text-[9px] uppercase tracking-widest">
                    <span>Active Momentum</span>
                    <TrendingUp size={13} />
                </div>
            </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* MARKET INSIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card className="bg-[#09090b] text-white border-none p-6 relative overflow-hidden flex flex-col group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 blur-[40px] rounded-full pointer-events-none" />
                    {/* Header */}
                    <div className="relative z-10 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <BarChart3 size={15} className="text-brand-red" />
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[3px]">Market Value</span>
                        </div>
                        <h2 className="text-3xl font-black  text-brand-red tracking-tighter leading-none"><span className='text-black'>$</span> 162,000</h2>
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <TrendingUp size={11} className="text-emerald-400" />
                            <span className="text-[10px] font-bold text-emerald-400">+14.2% YoY</span>
                        </div>
                    </div>
                    {/* Bar Chart — High Contrast Visibility */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="relative w-full" style={{ height: '64px' }}>
                            <div className="absolute inset-x-0 bottom-0 flex items-end gap-[4px] h-full">
                                {[20, 35, 25, 50, 45, 70, 60, 90, 80, 100].map((val, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        transition={{ 
                                            delay: i * 0.05, 
                                            duration: 0.8, 
                                            ease: "circOut" 
                                        }}
                                        className="flex-1 rounded-t-sm bg-brand-red shadow-[0_0_10px_rgba(193,39,45,0.3)] hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all cursor-pointer relative group/bar"
                                    >
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-brand-black text-[7px] px-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity font-black">
                                            {val}%
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        {/* X-axis labels */}
                        <div className="flex justify-between mt-3">
                            {['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT'].map((m, i) => (
                                <span key={i} className="flex-1 text-center text-[7px] font-black text-white/20 tracking-tighter uppercase">{m}</span>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card className="bg-white border-black/5 p-6 relative overflow-hidden flex flex-col justify-between group">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Zap size={15} className="text-brand-red" />
                            <span className="text-[9px] font-black text-brand-grey uppercase tracking-[3px]">Match Velocity</span>
                        </div>
                        <h2 className="text-3xl font-black text-brand-black tracking-[-0.06em] leading-none">8.2<span className="text-lg text-brand-grey/30">x</span></h2>
                        <p className="text-[10px] font-bold text-brand-grey mt-2 leading-relaxed">Trending 8.2x faster than sector average.</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1,2,3,4].map(i => <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-black/5" />)}
                        </div>
                        <span className="text-[9px] font-black text-brand-grey uppercase tracking-widest pl-1">+12 Active Recruiters</span>
                    </div>
                </Card>
            </div>

            {/* ACTION ITEMS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { icon: Sparkles, label: "Optimize", color: "text-brand-red", action: () => setIsModalOpen(true) },
                    { icon: FileText, label: "Update CV", color: "text-blue-500", action: () => setIsParsingOpen(true) },
                    { icon: BarChart3, label: "Salary Audit", color: "text-emerald-500", action: () => {} },
                    { icon: Settings, label: "Settings", color: "text-zinc-500", action: () => {} }
                ].map((item, i) => (
                    <button 
                        key={i} 
                        onClick={item.action}
                        className="flex flex-col items-center justify-center p-4 bg-white border border-black/5 rounded-xl hover:bg-brand-black hover:text-white transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <item.icon size={18} className={`${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* PIPELINE */}
            <Card className="bg-white border-black/5 rounded-2xl overflow-hidden p-0">
                <div className="px-5 py-4 border-b border-black/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-brand-black flex items-center justify-center text-white">
                            <Zap size={14} />
                        </div>
                        <div>
                            <h3 className="font-black text-sm text-brand-black tracking-tight">Active Offer Streams</h3>
                            <p className="text-[9px] font-bold text-brand-grey uppercase tracking-[2px]">Pipeline Monitor</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-brand-red hover:bg-brand-red/5 font-black text-[9px] uppercase tracking-[2px] text-xs">See All</Button>
                </div>
                
                <div className="p-4 space-y-2">
                    {[
                        { title: "Staff React Engineer", company: "Stripe", status: "INTERVIEW", color: "text-blue-600", bg: "bg-blue-50", icon: "S" },
                        { title: "Lead Frontend Dev", company: "Vercel", status: "IN REVIEW", color: "text-amber-600", bg: "bg-amber-50", icon: "V" },
                        { title: "UI/UX Developer", company: "Linear", status: "OFFER", color: "text-emerald-600", bg: "bg-emerald-50", icon: "L" }
                    ].map((job, i) => (
                        <div key={i} className="group p-3 rounded-xl border border-black/[0.04] bg-zinc-50/50 hover:bg-white hover:shadow-md hover:border-black/[0.07] transition-all duration-300 cursor-pointer flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white border border-black/5 shadow-sm flex items-center justify-center font-black text-sm text-brand-black group-hover:bg-brand-black group-hover:text-white transition-all duration-300">
                                    {job.icon}
                                </div>
                                <div>
                                    <h4 className="font-black text-xs text-brand-black group-hover:text-brand-red transition-colors">{job.title}</h4>
                                    <p className="text-[9px] font-bold text-brand-grey uppercase tracking-widest">{job.company}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase ${job.bg} ${job.color}`}>
                                    {job.status}
                                </div>
                                <ChevronRight size={13} className="text-brand-grey/30 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
