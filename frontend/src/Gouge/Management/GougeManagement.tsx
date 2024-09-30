import React, { useState, useEffect } from 'react';
import { fetchGouges, createGouge, updateGouge, deleteGouge, Gouge } from '../../Admin/services/api';
import * as yup from 'yup';

const gougeSchema = yup.object().shape({
  examiner_name: yup.string().required('Examiner name is required'),
  date: yup.date().required('Date is required'),
  outcome: yup.string().oneOf(['pass', 'fail'], 'Invalid outcome'),
  text: yup.string().required('Gouge text is required'),
});

const GougeManagement: React.FC = () => {
  const [gouges, setGouges] = useState<Gouge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingGouge, setEditingGouge] = useState<Gouge | null>(null);
  const [newGouge, setNewGouge] = useState<Partial<Gouge>>({ examiner_name: '', date: '', outcome: '', text: '' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ outcome: '', start_date: '', end_date: '' });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    loadGouges();
  }, [page, search, filters]);

  const loadGouges = async () => {
    try {
      setLoading(true);
      const response = await fetchGouges(page, search, filters);
      if (page === 1) {
        setGouges(response.results);
      } else {
        setGouges(prevGouges => [...prevGouges, ...response.results]);
      }
      setHasMore(!!response.next);
      setError(null);
    } catch (err) {
      setError('Failed to load gouges. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (key: 'outcome' | 'start_date' | 'end_date', value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    setPage(1);
  };

  const handleCreateGouge = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await gougeSchema.validate(newGouge, { abortEarly: false });
      const createdGouge = await createGouge(newGouge);
      setGouges([...gouges, createdGouge]);
      setNewGouge({ examiner_name: '', date: '', outcome: '', text: '' });
      setFormErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setError('Failed to create gouge. Please try again.');
      }
    }
  };

  const handleUpdateGouge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGouge) return;
    try {
      await gougeSchema.validate(editingGouge, { abortEarly: false });
      const updatedGouge = await updateGouge(editingGouge.id, editingGouge);
      setGouges(gouges.map(gouge => gouge.id === updatedGouge.id ? updatedGouge : gouge));
      setEditingGouge(null);
      setFormErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setError('Failed to update gouge. Please try again.');
      }
    }
  };

  const handleDeleteGouge = async (gougeId: number) => {
    if (!window.confirm('Are you sure you want to delete this gouge?')) return;
    try {
      await deleteGouge(gougeId);
      setGouges(gouges.filter(gouge => gouge.id !== gougeId));
    } catch (err) {
      setError('Failed to delete gouge. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gouge Management</h2>
      
      {/* Search and Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search gouges..."
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded mr-2"
        />
        <select
          value={filters.outcome}
          onChange={(e) => handleFilterChange('outcome', e.target.value)}
          className="p-2 border rounded mr-2"
        >
          <option value="">All Outcomes</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
        <input
          type="date"
          value={filters.start_date}
          onChange={(e) => handleFilterChange('start_date', e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="date"
          value={filters.end_date}
          onChange={(e) => handleFilterChange('end_date', e.target.value)}
          className="p-2 border rounded mr-2"
        />
      </div>

      {/* Create Gouge Form */}
      <form onSubmit={handleCreateGouge} className="mb-8">
        <input
          type="text"
          placeholder="Examiner Name"
          value={newGouge.examiner_name}
          onChange={(e) => setNewGouge({...newGouge, examiner_name: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.examiner_name ? 'border-red-500' : ''}`}
        />
        {formErrors.examiner_name && <p className="text-red-500 text-sm">{formErrors.examiner_name}</p>}
        <input
          type="date"
          value={newGouge.date}
          onChange={(e) => setNewGouge({...newGouge, date: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.date ? 'border-red-500' : ''}`}
        />
        {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
        <select
          value={newGouge.outcome}
          onChange={(e) => setNewGouge({...newGouge, outcome: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.outcome ? 'border-red-500' : ''}`}
        >
          <option value="">Select Outcome</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
        {formErrors.outcome && <p className="text-red-500 text-sm">{formErrors.outcome}</p>}
        <textarea
          placeholder="Gouge Text"
          value={newGouge.text}
          onChange={(e) => setNewGouge({...newGouge, text: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.text ? 'border-red-500' : ''}`}
        />
        {formErrors.text && <p className="text-red-500 text-sm">{formErrors.text}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Gouge</button>
      </form>

      {/* Gouge List */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Examiner</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Outcome</th>
            <th className="py-2 px-4 border-b">Text</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {gouges.map((gouge) => (
            <tr key={gouge.id}>
              <td className="py-2 px-4 border-b">{gouge.examiner_name}</td>
              <td className="py-2 px-4 border-b">{new Date(gouge.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{gouge.outcome}</td>
              <td className="py-2 px-4 border-b">{gouge.text.substring(0, 100)}...</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => setEditingGouge(gouge)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDeleteGouge(gouge.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}

      {/* Edit Gouge Modal */}
      {editingGouge && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Edit Gouge</h3>
            <form onSubmit={handleUpdateGouge}>
              <input
                type="text"
                value={editingGouge.examiner_name}
                onChange={(e) => setEditingGouge({...editingGouge, examiner_name: e.target.value})}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="date"
                value={editingGouge.date}
                onChange={(e) => setEditingGouge({...editingGouge, date: e.target.value})}
                className="w-full p-2 mb-2 border rounded"
              />
              <select
                value={editingGouge.outcome}
                onChange={(e) => setEditingGouge({...editingGouge, outcome: e.target.value})}
                className="w-full p-2 mb-2 border rounded"
              >
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
              </select>
              <textarea
                value={editingGouge.text}
                onChange={(e) => setEditingGouge({...editingGouge, text: e.target.value})}
                className="w-full p-2 mb-2 border rounded"
              />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                <button onClick={() => setEditingGouge(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GougeManagement;