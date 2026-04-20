import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SubMenu from '../../components/ui/SubMenu';
import { Plus, MoreHorizontal, Filter, Search } from 'lucide-react';

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Pipeline");

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pt-4 overflow-hidden">
      
      {/* Header & SubMenu Logic */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-10 shrink-0">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-brand-black mb-6">Talent Pipeline</h1>
          <SubMenu 
            tabs={["Overview", "Pipeline", "Interviews", "Analytics", "Team"]} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-64">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey" />
            <input 
              type="text" 
              placeholder="Search applicants..." 
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-black/5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-red/5 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-white border-black/5 text-brand-black hover:bg-black/5 shadow-sm rounded-2xl">
            <Filter size={16} /> Filters
          </Button>
          <Button variant="primary" className="gap-2 rounded-2xl">
            <Plus size={16} /> New Job
          </Button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-black/10 px-1 -mx-1 snap-x">
        {[
          { title: "Sourced", count: 124, theme: "brand-black" },
          { title: "In Review", count: 32, theme: "blue-500" },
          { title: "Technical Interview", count: 8, theme: "amber-500" },
          { title: "Offer Extended", count: 2, theme: "brand-red" },
          { title: "Hired", count: 0, theme: "green-500" }
        ].map((column, idx) => (
          <div key={idx} className="min-w-[340px] w-[340px] flex flex-col gap-4 snap-start shrink-0">
            {/* Column Header */}
            <div className="flex items-center justify-between px-2 bg-white/40 p-3 rounded-2xl border border-black/[0.03]">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${column.theme} shadow-sm`} />
                <h3 className="font-extrabold text-xs tracking-widest text-brand-black uppercase">{column.title}</h3>
              </div>
              <span className="text-xs font-bold text-brand-grey bg-white px-2.5 py-1 rounded-lg border border-black/5 shadow-sm">{column.count}</span>
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-4 pt-2 overflow-y-auto scrollbar-hide px-1">
              {[1, 2, 3].map((i) => (
                <Card key={i} noPadding className="hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all cursor-grab active:cursor-grabbing border flex flex-col group p-0 relative">
                  
                  {/* Decorative color indicator block */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1 bg-${column.theme} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="p-5 pl-6">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F7F9FC] to-white border border-black/5 shadow-inner flex shrink-0 flex-col items-center justify-center">
                           <span className="text-[12px] font-black text-brand-black">94<span className="text-brand-red">%</span></span>
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-brand-black leading-tight">Sarah Jenkins</h4>
                          <span className="text-[9px] font-bold text-brand-grey uppercase tracking-[2px] block mt-1">Sr. React Dev</span>
                        </div>
                      </div>
                      <button className="text-brand-grey/40 hover:text-brand-black transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F7F9FC] px-3 py-2 rounded-xl border border-black/[0.03] flex justify-between items-center">
                        <span className="text-[9px] text-brand-grey uppercase font-bold tracking-[2px]">Exp</span>
                        <span className="text-xs font-black text-brand-black">6 Yrs</span>
                      </div>
                      <div className="bg-[#F7F9FC] px-3 py-2 rounded-xl border border-black/[0.03] flex justify-between items-center">
                        <span className="text-[9px] text-brand-grey uppercase font-bold tracking-[2px]">Req</span>
                        <span className="text-xs font-black text-brand-black">$140k</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Add Candidate Button */}
              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-3xl border-2 border-dashed border-black/5 text-brand-grey hover:text-brand-black hover:bg-black/[0.02] hover:border-black/10 transition-all text-xs font-bold uppercase tracking-widest mt-2">
                <Plus size={14} /> Add Candidate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
