import React, { useState } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([
    { student_id: 1, name: 'John Doe', roll_number: 'CS-001', attendance_percentage: 100, avg_marks: 85 }
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-slate-100">Performance Reports</h2>
        <p className="text-slate-400 mt-2">Displaying aggregation queries (AVG, GROUP BY)</p>
      </header>

      {/* Top Cards for summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 p-6 rounded-2xl flex items-center justify-between">
          <div>
             <p className="text-indigo-300 font-medium text-sm mb-1">Total Students</p>
             <h4 className="text-3xl font-bold text-white">100</h4>
             <p className="text-xs text-slate-400 mt-2 font-mono">SELECT COUNT(*) FROM students</p>
          </div>
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/50">
             <span className="text-indigo-400 text-2xl font-bold">#</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/50 to-slate-900 border border-amber-500/30 p-6 rounded-2xl flex items-center justify-between">
          <div>
             <p className="text-amber-300 font-medium text-sm mb-1">Top Performer</p>
             <h4 className="text-2xl font-bold text-white">John Doe</h4>
             <p className="text-xs text-slate-400 mt-2 font-mono text-ellipsis overflow-hidden">ORDER BY avg_marks DESC LIMIT 1</p>
          </div>
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/50">
             <span className="text-amber-400 text-2xl font-bold">★</span>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-slate-700/50 flex justify-between flex-col md:flex-row gap-3 items-start md:items-center bg-slate-800/20">
          <h3 className="text-xl font-semibold text-slate-200">Combined Query Results</h3>
          <span className="text-[10px] sm:text-xs font-mono bg-slate-900 text-amber-400 px-3 py-1 rounded-full border border-slate-700">SELECT s.name, AVG(g.marks) as avg_marks ... GROUP BY s.id</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Student (Rolll No)</th>
                <th className="px-6 py-4 font-medium">Attendance %</th>
                <th className="px-6 py-4 font-medium">Avg Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {reports.map((report, index) => (
                <tr key={report.student_id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-bold">#{index + 1}</td>
                  <td className="px-6 py-4 text-slate-200 font-medium">
                    {report.name} <span className="text-slate-500 text-xs ml-1">({report.roll_number})</span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        <div className="w-full max-w-[100px] bg-slate-700 rounded-full h-2">
                           <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${report.attendance_percentage}%`}}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-300">{report.attendance_percentage}%</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-amber-400 font-bold">{report.avg_marks.toFixed(1)}</span>
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

export default Reports;
