import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserManagement from '../../Management/UserManagement';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('UserManagement', () => {
  const mockUsers = [
    { id: 1, username: 'user1', email: 'user1@example.com', is_staff: false, is_active: true, date_joined: '2023-01-01' },
    { id: 2, username: 'user2', email: 'user2@example.com', is_staff: true, is_active: true, date_joined: '2023-01-02' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchUsers as jest.Mock).mockResolvedValue({ results: mockUsers, next: null });
  });

  it('renders without crashing', () => {
    render(<UserManagement />);
    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  it('fetches and displays users', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });

  it('creates a new user', async () => {
    const newUser = { id: 3, username: 'newuser', email: 'newuser@example.com', is_staff: false, is_active: true, date_joined: '2023-01-03' };
    (api.createUser as jest.Mock).mockResolvedValue(newUser);

    render(<UserManagement />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Create User'));

    await waitFor(() => {
      expect(api.createUser).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      });
      expect(screen.getByText('newuser')).toBeInTheDocument();
    });
  });

  it('updates a user', async () => {
    const updatedUser = { ...mockUsers[0], username: 'updateduser1' };
    (api.updateUser as jest.Mock).mockResolvedValue(updatedUser);

    render(<UserManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Edit')[0]);
    });

    fireEvent.change(screen.getByDisplayValue('user1'), { target: { value: 'updateduser1' } });
    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(api.updateUser).toHaveBeenCalledWith(1, { username: 'updateduser1', email: 'user1@example.com' });
      expect(screen.getByText('updateduser1')).toBeInTheDocument();
    });
  });

  it('deletes a user', async () => {
    (api.deleteUser as jest.Mock).mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    render(<UserManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0]);
    });

    await waitFor(() => {
      expect(api.deleteUser).toHaveBeenCalledWith(1);
      expect(screen.queryByText('user1')).not.toBeInTheDocument();
    });
  });

  it('searches users', async () => {
    const searchedUsers = [mockUsers[0]];
    (api.fetchUsers as jest.Mock).mockResolvedValue({ results: searchedUsers, next: null });

    render(<UserManagement />);

    fireEvent.change(screen.getByPlaceholderText('Search users...'), { target: { value: 'user1' } });

    await waitFor(() => {
      expect(api.fetchUsers).toHaveBeenCalledWith(1, 'user1', expect.anything());
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.queryByText('user2')).not.toBeInTheDocument();
    });
  });

  it('filters users', async () => {
    const filteredUsers = [mockUsers[1]];
    (api.fetchUsers as jest.Mock).mockResolvedValue({ results: filteredUsers, next: null });

    render(<UserManagement />);

    fireEvent.change(screen.getByText('All Staff'), { target: { value: 'true' } });

    await waitFor(() => {
      expect(api.fetchUsers).toHaveBeenCalledWith(1, '', { is_staff: true, is_active: undefined });
      expect(screen.queryByText('user1')).not.toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });
});