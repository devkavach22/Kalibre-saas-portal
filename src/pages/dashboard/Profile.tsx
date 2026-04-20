import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Mail, Phone, MapPin, Globe, Edit3, Plus, FileText, Award, BookOpen, Sparkles, CircleUser as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-red/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[2px] rounded-full">Candidate Identity</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-brand-black leading-tight">Professional Profile</h1>
                    <p className="text-sm md:text-base font-medium text-brand-grey mt-2 max-w-lg">
                        Manage your professional persona, documents, and private credentials in one secure location.
                    </p>
                </div>

                <Button variant="primary" className="rounded-xl px-8 bg-brand-black text-white gap-2 font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10">
                    <Edit3 size={16} />
                    Edit Profile
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Essential Info */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className="p-8 relative overflow-hidden group border-black/5 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-brand-red to-red-800 flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-brand-red/30 relative z-10">
                                    {user?.name?.[0] || 'U'}
                                </div>
                                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-red/20 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                            <h2 className="text-3xl font-black text-brand-black tracking-tight mb-1">{user?.name || 'User'}</h2>
                            <p className="text-sm font-bold text-brand-red uppercase tracking-widest mb-6 underline decoration-brand-red/20 underline-offset-4">Senior Frontend Architect</p>

                            <div className="w-full space-y-4 pt-6 border-t border-black/[0.03]">
                                <div className="flex items-center gap-3 text-brand-grey">
                                    <Mail size={16} />
                                    <span className="text-xs font-bold">{user?.email || 'user@example.com'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-brand-grey">
                                    <Phone size={16} />
                                    <span className="text-xs font-bold">+91 99098 69997</span>
                                </div>
                                <div className="flex items-center gap-3 text-brand-grey">
                                    <MapPin size={16} />
                                    <span className="text-xs font-bold">Ahmedabad, India</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                {[FaGithub, FaLinkedin, FaTwitter, Globe].map((Icon, i) => (
                                    <button key={i} className="w-10 h-10 rounded-xl bg-black/[0.02] border border-black/5 flex items-center justify-center text-brand-grey hover:text-brand-red hover:bg-brand-red/5 transition-all">
                                        <Icon size={18} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 bg-brand-black text-white border-none shadow-2xl shadow-black/20">
                        <h3 className="text-xs font-black uppercase tracking-[3px] text-white/40 mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                            <Button variant="ghost" className="w-full justify-between text-white hover:bg-white/5 border border-white/5 py-3 rounded-xl">
                                <span className="text-[10px] font-black tracking-widest uppercase">Download Resume</span>
                                <FileText size={16} className="text-brand-red" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between text-white hover:bg-white/5 border border-white/5 py-3 rounded-xl">
                                <span className="text-[10px] font-black tracking-widest uppercase">Generate Portfolio</span>
                                <Globe size={16} className="text-brand-red" />
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Detailed Context */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Bento Box 1: Experience & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="p-8 bg-white border-black/5 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <Award size={20} className="text-brand-red" />
                                    <h3 className="font-black text-lg text-brand-black tracking-tight uppercase">Experience</h3>
                                </div>
                                <button className="text-brand-red hover:scale-110 transition-transform"><Plus size={20} /></button>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { title: "Staff Engineer", company: "Google", duration: "2021 - Present" },
                                    { title: "Senior Developer", company: "Meta", duration: "2018 - 2021" }
                                ].map((exp, i) => (
                                    <div key={i} className="relative pl-6 border-l-2 border-black/5 group hover:border-brand-red transition-colors">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-black/5 group-hover:border-brand-red transition-colors" />
                                        <h4 className="font-black text-brand-black text-base leading-none">{exp.title}</h4>
                                        <p className="text-xs font-bold text-brand-grey mt-2">{exp.company} • {exp.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-8 bg-white border-black/5 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <BookOpen size={20} className="text-brand-red" />
                                    <h3 className="font-black text-lg text-brand-black tracking-tight uppercase">Education</h3>
                                </div>
                                <button className="text-brand-red hover:scale-110 transition-transform"><Plus size={20} /></button>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { title: "MS in Computer Science", school: "Stanford University", duration: "2016 - 2018" },
                                    { title: "BS in IT", school: "DAIICT", duration: "2012 - 2016" }
                                ].map((edu, i) => (
                                    <div key={i} className="relative pl-6 border-l-2 border-black/5 group hover:border-brand-red transition-colors">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-black/5 group-hover:border-brand-red transition-colors" />
                                        <h4 className="font-black text-brand-black text-base leading-none">{edu.title}</h4>
                                        <p className="text-xs font-bold text-brand-grey mt-2">{edu.school} • {edu.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Bento Box 2: Skills Node */}
                    <Card className="p-8 bg-white border-black/5 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 blur-3xl rounded-full" />
                        <h3 className="font-black text-lg text-brand-black tracking-tight uppercase mb-8 flex items-center gap-3">
                            <Sparkles size={20} className="text-brand-red" />
                            Skill Archetype
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {["React", "TypeScript", "Node.js", "AWS", "GraphQL", "Figma", "Docker", "Python", "Kubernetes", "Next.js", "TailwindCSS"].map((skill, i) => (
                                <span key={i} className="px-5 py-2.5 bg-black/[0.02] border border-black/[0.05] rounded-xl text-[10px] font-black text-brand-black uppercase tracking-widest hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-default underline decoration-brand-red/20">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
