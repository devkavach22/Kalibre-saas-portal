import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Briefcase, FileText, Settings, LogOut, Bell, Menu, X, Search, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import KalibreLogo from '../assets/logo.png';

const DashboardLayout: React.FC = () => {
  const { user, role, logout, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth Guard
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-brand-bg">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 relative"
        >
          <div className="absolute inset-0 border-4 border-brand-red rounded-full opacity-20" />
          <div className="absolute inset-0 border-4 border-brand-red border-t-transparent rounded-full" />
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const getNavItems = () => {
    const common = [
      { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    ];
    switch (role) {
      case 'Candidate':
        return [
          ...common,
          { name: 'Job Matches', path: '/dashboard/jobs', icon: Briefcase },
          { name: 'My Profile', path: '/dashboard/profile', icon: FileText },
          { name: 'Setup Profile', path: '/dashboard/onboarding', icon: Sparkles },
          { name: 'Settings', path: '/dashboard/settings', icon: Settings },
        ];
      case 'Employer':
      case 'Recruiter':
        return [
          ...common,
          { name: 'Talent Pipeline', path: '/dashboard/pipeline', icon: FileText },
          { name: 'Job Postings', path: '/dashboard/jobs', icon: Briefcase },
          { name: 'Settings', path: '/dashboard/settings', icon: Settings },
        ];
      default:
        return common;
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="h-16 flex items-center px-5 shrink-0 border-b border-white/5">
        <Link to="/" className="w-full group">
          <div className="w-full bg-white px-3 py-2 rounded-lg flex items-center justify-center transition-all duration-500 shadow-sm">
            <img src={KalibreLogo} alt="Kalibre" className="h-6 w-auto max-w-full object-contain" />
          </div>
        </Link>
        <button className="lg:hidden ml-auto text-zinc-400 p-1" onClick={() => setIsMobileMenuOpen(false)}>
          <X size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/8 rounded-lg text-zinc-500 text-xs cursor-text hover:bg-white/8 transition-all">
          <Search size={12} />
          <span className="text-[11px]">Search...</span>
          <div className="ml-auto flex gap-0.5">
            <kbd className="bg-white/10 px-1 py-0.5 rounded text-[9px] font-mono">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-hide">
        <div className="px-2 pb-2 text-[9px] font-black text-zinc-600 uppercase tracking-[2px]">Navigation</div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all relative group ${
                isActive
                  ? 'text-white bg-white/8 shadow-[inset_0_0_0_1px_rgba(193,39,45,0.25)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/4'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-red rounded-full shadow-[0_0_8px_rgba(193,39,45,0.9)]"
                />
              )}
              <item.icon
                size={15}
                className={`shrink-0 transition-colors ${isActive ? 'text-brand-red' : 'text-zinc-500 group-hover:text-zinc-300'}`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}

        {/* AI Teaser */}
        <div className="pt-4">
          <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[2px] px-2 pb-2">AI Assistant</div>
          <div className="border border-brand-red/15 bg-brand-red/5 p-3 rounded-xl relative overflow-hidden cursor-pointer hover:bg-brand-red/8 transition-colors group">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={11} className="text-brand-red" />
              <span className="text-[9px] font-black uppercase text-brand-red tracking-widest">Kalibre AI</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed italic">"Analysing your matches…"</p>
          </div>
        </div>
      </nav>

      {/* User Footer */}
      <div className="shrink-0 p-3 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group"
        >
          <div className="relative shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-red to-red-600 flex items-center justify-center text-[11px] font-black text-white">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#09090b]" />
          </div>
          <div className="flex flex-col items-start leading-none min-w-0">
            <span className="text-[11px] font-black text-zinc-200 capitalize truncate max-w-[120px]">{user?.name || 'User'}</span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-wider">{role}</span>
          </div>
          <LogOut size={13} className="ml-auto text-zinc-600 group-hover:text-brand-red transition-colors shrink-0" />
        </button>
      </div>
    </>
  );

  return (
    /* Root: full viewport, no overflow at root level */
    <div className="flex h-screen w-screen overflow-hidden bg-[#fafafa] text-brand-black font-sans selection:bg-brand-red selection:text-white">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-brand-red/4 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-8%] w-[35%] h-[35%] rounded-full bg-orange-400/4 blur-[100px]" />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ── fixed width, no internal scroll bleed */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[220px] flex flex-col
          bg-[#09090b] text-zinc-100 border-r border-white/5
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:shrink-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* ── MAIN ── fills remainder, clips its own overflow */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="shrink-0 h-14 flex items-center justify-between px-5 lg:px-8 border-b border-black/4 bg-white/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 bg-white border border-black/5 rounded-lg text-brand-black hover:bg-black/5 transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={16} />
            </button>
            <div>
              <div className="text-[9px] font-black text-brand-grey/60 uppercase tracking-widest leading-none mb-0.5">
                Main Workspace / Dashboard
              </div>
              <h1 className="text-sm font-black text-brand-black tracking-tight leading-none">Command Center</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase">Online</span>
            </div>
            <button className="relative p-2 text-brand-grey/60 hover:text-brand-red hover:bg-brand-red/5 rounded-lg transition-all">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-red rounded-full" />
            </button>
          </div>
        </header>

        {/* Scrollable content area — ONLY this scrolls */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-[1400px] mx-auto px-5 lg:px-8 py-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
