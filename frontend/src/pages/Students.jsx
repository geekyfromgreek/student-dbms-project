import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SpotlightCard from '../components/SpotlightCard';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', roll_number: '' });
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.roll_number) return;
    
    try {
      await api.post('/students', formData);
      setFormData({ name: '', roll_number: '' });
      fetchStudents(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add student');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <header>
        <h2 className="text-4xl font-black text-white tracking-tight">STUDENTS</h2>
        <div className="flex items-center gap-3 mt-2">
          <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
          <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Manage student records (INSERT and SELECT)</p>
        </div>
      </header>

      {/* Add Student Form */}
      <SpotlightCard color="rgba(59, 130, 246, 0.2)" className="rounded-3xl overflow-hidden border border-white/5">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
            Add New Student
          </h3>
          <form className="flex flex-wrap gap-6 items-end" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 flex-1 min-w-[240px]">
              <label className="text-xs text-slate-500 font-bold uppercase tracking-wider ml-1">Full Name</label>
              <input 
                type="text" 
                className="bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-slate-200 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-600 backdrop-blur-md"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-[240px]">
              <label className="text-xs text-slate-500 font-bold uppercase tracking-wider ml-1">Roll Number</label>
              <input 
                type="text" 
                className="bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-slate-200 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-600 backdrop-blur-md"
                placeholder="e.g. 101"
                value={formData.roll_number}
                onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all duration-500 shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2">
              <span>Execute INSERT</span>
            </button>
          </form>
        </div>
      </SpotlightCard>

      {/* Students Table */}
      <SpotlightCard color="rgba(59, 130, 246, 0.1)" className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="glass-card">
          <div className="p-8 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-white/[0.02]">
            <div>
              <h3 className="text-xl font-bold text-slate-100 italic tracking-tight">Database View: <span className="text-blue-400">students</span></h3>
              <p className="text-slate-500 text-xs mt-1 font-mono">Real-time table representation</p>
            </div>
            <span className="text-[10px] font-black font-mono bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20 uppercase tracking-widest shadow-inner">
              SELECT * FROM students
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/[0.02] text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-5">ID (PK)</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5 text-right">Roll Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan="3" className="px-8 py-12 text-center text-slate-500 animate-pulse">Loading data...</td></tr>
                ) : students.map((student) => (
                  <tr key={student.id} className="hover:bg-white/[0.05] transition-all duration-300 group">
                    <td className="px-8 py-5 text-blue-400 font-mono text-sm font-black tracking-tighter">{student.id.toString().padStart(3, '0')}</td>
                    <td className="px-8 py-5 text-slate-200 font-bold group-hover:pl-10 transition-all duration-500">{student.name}</td>
                    <td className="px-8 py-5 text-slate-400 font-mono text-right font-bold">{student.roll_number}</td>
                  </tr>
                ))}
                {!loading && students.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-8 py-12 text-center text-slate-500 italic font-medium">The database table is currently empty.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default Students;
