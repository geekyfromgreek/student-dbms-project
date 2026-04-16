import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Grades = () => {
  const [gradesRecords, setGradesRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ student_id: '', subject: '', marks: '' });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [gradesRes, studentsRes] = await Promise.all([
        api.get('/grades'),
        api.get('/students')
      ]);
      setGradesRecords(gradesRes.data);
      setStudents(studentsRes.data);
    } catch (error) {
      console.error('Error fetching grades data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.subject || formData.marks === '') return;

    try {
      await api.post('/grades', {
        student_id: parseInt(formData.student_id),
        subject: formData.subject,
        marks: parseInt(formData.marks),
      });
      setFormData({ student_id: '', subject: '', marks: '' });
      fetchData(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add grade');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-slate-100">Grades Entry</h2>
        <p className="text-slate-400 mt-2">Record marks and list grades (JOIN query demo)</p>
      </header>

      {/* Enter Marks Form */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4 text-purple-400 border-l-4 border-purple-500 pl-3">Enter Subject Marks</h3>
        <form className="flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
            <label className="text-sm text-slate-400 font-medium">Select Student</label>
            <select 
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              value={formData.student_id}
              onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
            >
              <option value="">-- Choose Student --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.roll_number})</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
             <label className="text-sm text-slate-400 font-medium">Subject</label>
            <input 
              type="text" 
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
              placeholder="e.g. DBMS"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
             <label className="text-sm text-slate-400 font-medium">Marks Obtained</label>
            <input 
              type="number" 
              min="0"
              max="100"
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
              placeholder="0 - 100"
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
            />
          </div>
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/20 active:scale-95">
            Execute INSERT
          </button>
        </form>
      </div>

      {/* Grades Table */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/20">
          <h3 className="text-xl font-semibold text-slate-200">Database View: `grades` JOIN `students`</h3>
          <span className="hidden md:inline-block text-xs font-mono bg-slate-900 text-purple-400 px-3 py-1 rounded-full border border-slate-700">SELECT g.id, s.name, g.subject, g.marks FROM grades g JOIN students s</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Record ID (PK)</th>
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Subject Name</th>
                <th className="px-6 py-4 font-medium">Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
              ) : gradesRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-mono text-sm">{record.id}</td>
                  <td className="px-6 py-4 text-slate-200 font-medium">{record.name} <span className="text-xs text-slate-500 ml-1">(Roll: {record.roll_number})</span></td>
                  <td className="px-6 py-4 text-slate-400">{record.subject}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-200">{record.marks}</span>
                    <span className="text-slate-500 font-medium text-xs ml-1">/ 100</span>
                  </td>
                </tr>
              ))}
              {!loading && gradesRecords.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500 italic">No records found. Add students first, then enter their grades.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Grades;
