import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [reportsRes, studentsRes] = await Promise.all([
        api.get('/reports'),
        api.get('/students')
      ]);
      // Sort by avg marks descending for ranking
      const sorted = reportsRes.data.sort((a, b) => (b.avg_marks || 0) - (a.avg_marks || 0));
      setReports(sorted);
      setStudents(studentsRes.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const topPerformer = reports.length > 0 ? reports[0] : null;

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-slate-100">Performance Reports</h2>
        <p className="text-slate-400 mt-2">Displaying aggregation queries (AVG, COUNT, GROUP BY, JOIN)</p>
      </header>

      {/* Top Cards for summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 p-6 rounded-2xl flex items-center justify-between">
          <div>
             <p className="text-indigo-300 font-medium text-sm mb-1">Total Students</p>
             <h4 className="text-3xl font-bold text-white">{students.length}</h4>
             <p className="text-xs text-slate-400 mt-2 font-mono">SELECT COUNT(*) FROM students</p>
          </div>
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/50">
             <span className="text-indigo-400 text-2xl font-bold">#</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/50 to-slate-900 border border-amber-500/30 p-6 rounded-2xl flex items-center justify-between">
          <div>
             <p className="text-amber-300 font-medium text-sm mb-1">Top Performer</p>
             <h4 className="text-2xl font-bold text-white">{topPerformer ? topPerformer.name : '—'}</h4>
             <p className="text-xs text-slate-400 mt-2 font-mono text-ellipsis overflow-hidden">ORDER BY avg_marks DESC LIMIT 1</p>
          </div>
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/50">
             <span className="text-amber-400 text-2xl font-bold">★</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/50 to-slate-900 border border-emerald-500/30 p-6 rounded-2xl flex items-center justify-between">
          <div>
             <p className="text-emerald-300 font-medium text-sm mb-1">Avg Attendance</p>
             <h4 className="text-3xl font-bold text-white">
              {reports.length > 0 
                ? (reports.reduce((sum, r) => sum + (parseFloat(r.attendance_percentage) || 0), 0) / reports.length).toFixed(1) + '%'
                : '—'
              }
             </h4>
             <p className="text-xs text-slate-400 mt-2 font-mono">AVG(attendance_percentage)</p>
          </div>
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50">
             <span className="text-emerald-400 text-2xl font-bold">✓</span>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-slate-700/50 flex justify-between flex-col md:flex-row gap-3 items-start md:items-center bg-slate-800/20">
          <h3 className="text-xl font-semibold text-slate-200">Combined Query Results</h3>
          <span className="text-[10px] sm:text-xs font-mono bg-slate-900 text-amber-400 px-3 py-1 rounded-full border border-slate-700">SELECT s.name, AVG(g.marks), attendance % ... GROUP BY s.id</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Student (Roll No)</th>
                <th className="px-6 py-4 font-medium">Attendance %</th>
                <th className="px-6 py-4 font-medium">Avg Marks</th>
                <th className="px-6 py-4 font-medium">Subjects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
              ) : reports.map((report, index) => (
                <tr key={report.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-bold">#{index + 1}</td>
                  <td className="px-6 py-4 text-slate-200 font-medium">
                    {report.name} <span className="text-slate-500 text-xs ml-1">({report.roll_number})</span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        <div className="w-full max-w-[100px] bg-slate-700 rounded-full h-2">
                           <div 
                             className={`h-2 rounded-full transition-all duration-500 ${
                               parseFloat(report.attendance_percentage) >= 75 ? 'bg-emerald-500' 
                               : parseFloat(report.attendance_percentage) >= 50 ? 'bg-amber-500' 
                               : 'bg-rose-500'
                             }`}
                             style={{ width: `${report.attendance_percentage || 0}%`}}
                           ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-300">
                          {report.attendance_percentage != null ? parseFloat(report.attendance_percentage).toFixed(1) : '0.0'}%
                        </span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-amber-400 font-bold">
                      {report.avg_marks != null ? parseFloat(report.avg_marks).toFixed(1) : '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-sm">{report.subjects_count || 0}</td>
                </tr>
              ))}
              {!loading && reports.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500 italic">No data yet. Add students, attendance, and grades first.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
