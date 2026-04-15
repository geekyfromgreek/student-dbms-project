import React, { useState } from 'react';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, student_id: 1, name: 'John Doe', date: '2026-04-15', status: 'Present' },
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-slate-100">Attendance Management</h2>
        <p className="text-slate-400 mt-2">Mark daily attendance and list records (JOIN query demo)</p>
      </header>

      {/* Mark Attendance Form */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4 text-emerald-400 border-l-4 border-emerald-500 pl-3">Record Attendance</h3>
        <form className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
            <label className="text-sm text-slate-400 font-medium">Student ID</label>
            <input 
              type="number" 
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-600"
              placeholder="e.g. 1"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
             <label className="text-sm text-slate-400 font-medium">Date</label>
            <input 
              type="date" 
              defaultValue={new Date().toISOString().split('T')[0]}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
             <label className="text-sm text-slate-400 font-medium">Status</label>
            <select className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all">
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95">
            Execute INSERT
          </button>
        </form>
      </div>

      {/* Attendance Table */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/20">
          <h3 className="text-xl font-semibold text-slate-200">Database View: `attendance` JOIN `students`</h3>
          <span className="hidden md:inline-block text-xs font-mono bg-slate-900 text-emerald-400 px-3 py-1 rounded-full border border-slate-700 overflow-hidden text-ellipsis whitespace-nowrap">SELECT a.id, s.name, a.date, a.status FROM attendance a JOIN students s</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Record ID (PK)</th>
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-mono text-sm">{record.id}</td>
                  <td className="px-6 py-4 text-slate-200 font-medium">{record.name} <span className="text-xs text-slate-500 ml-1">(ID: {record.student_id})</span></td>
                  <td className="px-6 py-4 text-slate-400">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-md font-medium border ${record.status === 'Present' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
