import React, { useState, useEffect } from 'react';
import Button from "../../Common/Components/Button";
import Card from "../../Common/Components/Card";
import { Input } from "../../Common/Components/Input";
import { Label } from "../../Common/Components/label";
import Checkbox from "../../Common/Components/Checkbox";
import { fetchMockOrals, approveMockOral, rejectMockOral, deleteMockOral, createMockOral, updateMockOral } from '../../Admin/services/api';
import { MockOralSession } from '../../Admin/types';
import * as yup from 'yup';

const mockOralSchema = yup.object().shape({
  examiner_name: yup.string().required('Examiner name is required'),
  score: yup.number().nullable().min(0, 'Score must be at least 0').max(100, 'Score must be at most 100'),
  status: yup.string().oneOf(['pending', 'approved', 'rejected'], 'Invalid status'),
});

const MockOralManagement: React.FC = () => {
  const [mockOrals, setMockOrals] = useState<MockOralSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [newMockOral, setNewMockOral] = useState<Partial<MockOralSession>>({ examiner_name: '', score: null, status: 'pending' });
  const [editingMockOral, setEditingMockOral] = useState<MockOralSession | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    loadMockOrals();
  }, [page, search, statusFilter]);

  const loadMockOrals = async () => {
    try {
      setLoading(true);
      const response = await fetchMockOrals(page, search, { status: statusFilter });
      if (page === 1) {
        setMockOrals(response.results);
      } else {
        setMockOrals(prevMockOrals => [...prevMockOrals, ...response.results]);
      }
      setHasMore(!!response.next);
      setError(null);
    } catch (err) {
      setError('Failed to load mock oral sessions. Please try again.');
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

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handleApproveMockOral = async (id: number) => {
    try {
      await approveMockOral(id);
      setMockOrals(mockOrals.map(mo => mo.id === id ? { ...mo, status: 'approved' } : mo));
    } catch (err) {
      setError('Failed to approve mock oral session. Please try again.');
    }
  };

  const handleRejectMockOral = async (id: number) => {
    try {
      await rejectMockOral(id);
      setMockOrals(mockOrals.map(mo => mo.id === id ? { ...mo, status: 'rejected' } : mo));
    } catch (err) {
      setError('Failed to reject mock oral session. Please try again.');
    }
  };

  const handleDeleteMockOral = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this mock oral session?')) return;
    try {
      await deleteMockOral(id);
      setMockOrals(mockOrals.filter(mo => mo.id !== id));
    } catch (err) {
      setError('Failed to delete mock oral session. Please try again.');
    }
  };

  const handleCreateMockOral = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mockOralSchema.validate(newMockOral, { abortEarly: false });
      const createdMockOral = await createMockOral(newMockOral);
      if (createdMockOral !== undefined) { // Check for undefined explicitly
        setMockOrals([...mockOrals, createdMockOral]);
        setNewMockOral({ examiner_name: '', score: null, status: 'pending' });
        setFormErrors({});
      } else {
        // Handle the case where createMockOral returns void
        console.error('Failed to create mock oral session');
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setError('Failed to create mock oral. Please try again.');
      }
    }
  };

  const handleUpdateMockOral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMockOral) return;
    try {
      await mockOralSchema.validate(editingMockOral, { abortEarly: false });
      const updatedMockOral = await updateMockOral(editingMockOral.id, editingMockOral);
      if (updatedMockOral !== undefined) { // Check for undefined explicitly
        setMockOrals(mockOrals.map(mo => mo.id === (updatedMockOral as { id: number }).id ? updatedMockOral : mo));
      }
      setEditingMockOral(null);
      setFormErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setError('Failed to update mock oral. Please try again.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mock Oral Management</h2>
      
      {/* Search and Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search mock orals..."
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded mr-2"
        />
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Create Mock Oral Form */}
      <form onSubmit={handleCreateMockOral} className="mb-8">
        <input
          type="text"
          placeholder="Examiner Name"
          value={newMockOral.examiner_name}
          onChange={(e) => setNewMockOral({...newMockOral, examiner_name: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.examiner_name ? 'border-red-500' : ''}`}
        />
        {formErrors.examiner_name && <p className="text-red-500 text-sm">{formErrors.examiner_name}</p>}
        <input
          type="number"
          placeholder="Score"
          value={newMockOral.score || ''}
          onChange={(e) => setNewMockOral({...newMockOral, score: e.target.value ? Number(e.target.value) : null})}
          className={`mr-2 p-2 border rounded ${formErrors.score ? 'border-red-500' : ''}`}
        />
        {formErrors.score && <p className="text-red-500 text-sm">{formErrors.score}</p>}
        <select
          value={newMockOral.status || ''}
          onChange={(e) => setNewMockOral({...newMockOral, status: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.status ? 'border-red-500' : ''}`}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        {formErrors.status && <p className="text-red-500 text-sm">{formErrors.status}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Mock Oral</button>
      </form>

      {/* Mock Oral List */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Examiner</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Score</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockOrals.map((mockOral) => (
            <tr key={mockOral.id}>
              <td className="py-2 px-4 border-b">{mockOral.examiner_name}</td>
              <td className="py-2 px-4 border-b">{new Date(mockOral.created_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{mockOral.score || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{mockOral.status || 'Pending'}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleApproveMockOral(mockOral.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Approve</button>
                <button onClick={() => handleRejectMockOral(mockOral.id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Reject</button>
                <button onClick={() => handleDeleteMockOral(mockOral.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
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
    </div>
  );
};

export default MockOralManagement;