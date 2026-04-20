import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Search, Filter, MapPin, Briefcase, DollarSign, Sparkles, ChevronRight, Bookmark, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Jobs: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    
    const jobs = [
        {
            id: 1,
            title: "Senior Product Designer",
            company: "Figma",
            location: "San Francisco / Remote",
            salary: "$160k - $220k",
            type: "Full-time",
            match: 98,
            tags: ["UI/UX", "Product Systems", "Figma"],
            logo: "F",
            featured: true
        },
        {
            id: 2,
            title: "Frontend Engineer (React)",
            company: "Vercel",
            location: "Remote",
            salary: "$140k - $190k",
            type: "Full-time",
            match: 94,
            tags: ["Next.js", "React", "TypeScript"],
            logo: "V",
            featured: true
        },
        {
            id: 3,
            title: "Design Systems Lead",
            company: "Linear",
            location: "SF / Remote",
            salary: "$170k - $230k",
            type: "Full-time",
            match: 89,
            tags: ["Systems", "Architecture", "CSS"],
            logo: "L",
            featured: false
        },
        {
            id: 4,
            title: "iOS Engineer",
            company: "CashApp",
            location: "Remote",
            salary: "Competitive",
            type: "Contract",
            match: 76,
            tags: ["Swift", "Mobile", "Fintech"],
            logo: "C",
            featured: false
        }
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-red/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="flex items-center gap-2 mb-2">
                         <span className="px-3 py-1 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[2px] rounded-full">Discovery Market</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-brand-black leading-tight">Job Intelligence</h1>
                    <p className="text-sm md:text-base font-medium text-brand-grey mt-2 max-w-lg">
                        AI-curated opportunities tailored to your professional profile and career velocity.
                    </p>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 flex items-center gap-2">
                        <Star size={14} className="fill-emerald-600" />
                        <span className="text-xs font-black tracking-widest uppercase">12 New Matches</span>
                    </div>
                </div>
            </div>

            {/* Smart Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search size={18} className="text-brand-grey group-focus-within:text-brand-red transition-colors" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search roles, companies, or keywords..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-black/5 rounded-[1.5rem] py-5 pl-14 pr-6 text-sm font-bold text-brand-black shadow-sm focus:bg-white focus:border-brand-red outline-none transition-all placeholder:text-brand-grey/40"
                    />
                    <div className="absolute right-5 inset-y-0 flex items-center">
                        <div className="px-2 py-1 bg-black/5 rounded text-[10px] font-black text-brand-grey border border-black/5 uppercase tracking-tighter">Enter</div>
                    </div>
                </div>
                <Button variant="outline" className="h-full rounded-[1.5rem] px-8 bg-white border-black/5 font-black text-xs uppercase tracking-widest gap-2">
                    <Filter size={16} />
                    Filters
                </Button>
            </div>

            {/* Jobs List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence>
                    {jobs.map((job, i) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={`relative p-8 overflow-hidden group transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${job.featured ? 'border-brand-red/20 ring-1 ring-brand-red/5' : 'border-black/5'}`}>
                                {job.featured && (
                                    <div className="absolute top-0 right-0">
                                        <div className="bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-8 py-1.5 rotate-45 translate-x-3 translate-y-3 shadow-sm">
                                            Elite
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex justify-between items-start mb-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-tr from-[#fafafa] to-white border border-black/[0.04] shadow-inner flex items-center justify-center font-black text-3xl text-brand-black group-hover:scale-105 transition-transform">
                                            {job.logo}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-brand-black tracking-tight group-hover:text-brand-red transition-colors leading-none">{job.title}</h3>
                                            <p className="text-sm font-bold text-brand-grey mt-2 flex items-center gap-1.5 leading-none">
                                                {job.company} <span className="text-black/10">•</span> {job.location}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-black/[0.03] hover:bg-brand-red/10 text-brand-grey hover:text-brand-red rounded-xl transition-all border border-transparent hover:border-brand-red/10">
                                        <Bookmark size={18} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                    <div className="flex items-center gap-2 text-brand-grey group-hover:text-brand-black transition-colors">
                                        <Briefcase size={14} />
                                        <span className="text-[11px] font-black uppercase tracking-widest leading-none">{job.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-brand-grey group-hover:text-brand-black transition-colors">
                                        <DollarSign size={14} />
                                        <span className="text-[11px] font-black uppercase tracking-widest leading-none">{job.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 text-emerald-600">
                                            <Sparkles size={14} />
                                            <span className="text-[11px] font-black uppercase tracking-widest leading-none">{job.match}% Match</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-black/[0.02] border border-black/5 rounded-lg text-[10px] font-black text-brand-grey uppercase tracking-widest group-hover:bg-white transition-colors uppercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-black/[0.03] mt-auto">
                                    <p className="text-[10px] font-black text-brand-grey/40 uppercase tracking-[2px]">Posted 12h ago</p>
                                    <Button variant="ghost" className="p-0 text-brand-black hover:text-brand-red font-black text-xs uppercase tracking-widest gap-1 group/btn">
                                        Apply Opportunity
                                        <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Jobs;
