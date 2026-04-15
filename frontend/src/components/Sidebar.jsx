import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, CalendarCheck, GraduationCap, BarChart3 } from 'lucide-react';

const Sidebar = () => {
  const getNavClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? 'bg-primary text-white shadow-lg shadow-primary/30'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`;

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-slate-800 h-screen sticky top-0 flex gap-1 flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Student DBMS
        </h1>
        <p className="text-xs text-slate-500 mt-1">Management System</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <NavLink to="/students" className={getNavClass}>
          <Users size={20} />
          <span className="font-medium">Students</span>
        </NavLink>
        <NavLink to="/attendance" className={getNavClass}>
          <CalendarCheck size={20} />
          <span className="font-medium">Attendance</span>
        </NavLink>
        <NavLink to="/grades" className={getNavClass}>
          <GraduationCap size={20} />
          <span className="font-medium">Grades</span>
        </NavLink>
        <NavLink to="/reports" className={getNavClass}>
          <BarChart3 size={20} />
          <span className="font-medium">Reports</span>
        </NavLink>
      </nav>
      
      <div className="p-4 m-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <div className="text-sm text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs">Database Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
