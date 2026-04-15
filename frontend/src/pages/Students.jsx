import React, { useState } from 'react';

const Students = () => {
  // Mock data for UI development before actual DB connection
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', roll_number: 'CS-001' },
    { id: 2, name: 'Jane Smith', roll_number: 'CS-002' },
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-slate-100">Students Management</h2>
        <p className="text-slate-400 mt-2">Manage student records (INSERT and SELECT operations)</p>
      </header>

      {/* Add Student Form */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4 text-blue-400 border-l-4 border-blue-500 pl-3">Add New Student</h3>
        <form className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
            <label className="text-sm text-slate-400 font-medium">Full Name</label>
            <input 
              type="text" 
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
            <label className="text-sm text-slate-400 font-medium">Roll Number</label>
            <input 
              type="text" 
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="e.g. 101"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95">
            Execute INSERT
          </button>
        </form>
      </div>

      {/* Students Table */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/20">
          <h3 className="text-xl font-semibold text-slate-200">Database View: `students` table</h3>
          <span className="text-xs font-mono bg-slate-900 text-blue-400 px-3 py-1 rounded-full border border-slate-700">SELECT * FROM students</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">ID (PK)</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Roll Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-mono text-sm">{student.id}</td>
                  <td className="px-6 py-4 text-slate-200 font-medium">{student.name}</td>
                  <td className="px-6 py-4 text-slate-400">{student.roll_number}</td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-slate-500 italic">No records found. Setup database to load data.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
