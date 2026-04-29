import React, { useState } from 'react';
import api from '../utils/api';
import { Play, AlertCircle, Database, CheckCircle2 } from 'lucide-react';

const CustomQuery = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const executeQuery = async () => {
    if (!query.trim()) {
      setError('Please enter a SQL query.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    setResults(null);
    setColumns([]);

    try {
      const response = await api.post('/query', { query });
      const data = response.data;

      // Handle different types of responses
      if (Array.isArray(data)) {
        if (data.length > 0) {
          // It's a SELECT query with results
          setColumns(Object.keys(data[0]));
          setResults(data);
          setSuccess(`Query executed successfully. ${data.length} row(s) returned.`);
        } else {
          // Empty result set from SELECT
          setResults([]);
          setSuccess('Query executed successfully. 0 rows returned.');
        }
      } else if (data && typeof data === 'object') {
        // It's likely an INSERT/UPDATE/DELETE query
        if (data.affectedRows !== undefined) {
          setSuccess(`Query executed successfully. ${data.affectedRows} row(s) affected.`);
        } else {
           setSuccess('Query executed successfully.');
        }
        // Just show the raw object if it's not an array
        setResults([data]);
        setColumns(Object.keys(data));
      } else {
        setSuccess('Query executed successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred while executing the query.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full animate-fade-in pb-10">
      {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-3">
              <Database size={32} className="text-pink-500" />
              Custom SQL Query
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Execute custom database queries directly.</p>
          </div>
        </div>

        {/* Query Input Area */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
              Enter SQL Query
            </label>
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., SELECT * FROM students WHERE grade = 'A'"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-slate-200 font-mono text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all placeholder:text-slate-600 min-h-[150px] resize-y"
                spellCheck={false}
              />
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={executeQuery}
                disabled={loading}
                className="btn-primary bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Play size={18} className="fill-current" />
                )}
                {loading ? 'Executing...' : 'Execute Query'}
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl flex items-start gap-3 backdrop-blur-md animate-fade-in">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-sm">Query Error</h4>
              <p className="text-sm mt-1 opacity-90 font-mono">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-xl flex items-center gap-3 backdrop-blur-md animate-fade-in">
            <CheckCircle2 className="shrink-0" size={20} />
            <p className="font-bold text-sm">{success}</p>
          </div>
        )}

        {/* Results Area */}
        {results && (
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col animate-fade-in">
             <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Database size={16} className="text-pink-400" />
                  Results
                </h3>
             </div>
             
             <div className="p-0 overflow-x-auto">
               {results.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        {columns.map((col, index) => (
                          <th key={index} className="px-6 py-4 border-b border-white/5 text-xs font-black text-slate-400 uppercase tracking-wider bg-black/20 whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {results.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-white/[0.02] transition-colors group">
                          {columns.map((col, colIndex) => (
                            <td key={colIndex} className="px-6 py-4 text-sm text-slate-300 whitespace-nowrap">
                              {row[col] === null ? (
                                <span className="text-slate-600 italic">NULL</span>
                              ) : typeof row[col] === 'object' ? (
                                JSON.stringify(row[col])
                              ) : (
                                String(row[col])
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
               ) : (
                 <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center">
                    <Database size={48} className="mb-4 opacity-20" />
                    <p>No results to display.</p>
                 </div>
               )}
             </div>
          </div>
        )}
      </div>
  );
};

export default CustomQuery;
