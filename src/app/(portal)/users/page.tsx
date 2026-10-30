'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCurrentUser } from '@/features/auth/hooks';
import {
  useUsers,
  useCreateUser,
  useResetPassword,
  useUnlockUser,
  useRevokeSessions,
} from '@/features/users/hooks';
import type { User, UserRole, UserStatus } from '@/types/models';

export default function UsersPage() {
  const { data: me, isPending: mePending } = useCurrentUser();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState(1);

  // Modals state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [tempPasswordModal, setTempPasswordModal] = useState<{
    isOpen: boolean;
    name: string;
    email: string;
    password: string;
  }>({ isOpen: false, name: '', email: '', password: '' });

  // Users query
  const { data: usersData, isPending: usersPending } = useUsers({
    q: search || undefined,
    role: (roleFilter as UserRole) || undefined,
    status: (statusFilter as UserStatus) || undefined,
    page,
    limit: 10,
  });

  // Action mutations
  const createUser = useCreateUser();
  const resetPassword = useResetPassword();
  const unlockUser = useUnlockUser();
  const revokeSessions = useRevokeSessions();

  // Role guard
  if (!mePending && me && me.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="size-12 rounded-full bg-rose-50 grid place-items-center text-rose-600 mb-4">
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-ink">Admins Only</h1>
        <p className="mt-1 text-sm text-muted max-w-sm">
          User management is restricted to system administrators.
        </p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex h-9 items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as UserRole;

    try {
      const res = await createUser.mutateAsync({ name, email, role });
      setIsAddUserOpen(false);
      setTempPasswordModal({
        isOpen: true,
        name: res.user.name,
        email: res.user.email,
        password: res.temporaryPassword,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPassword = async (user: User) => {
    if (!confirm(`Reset password for ${user.name}? This will generate a temporary password.`)) return;
    try {
      const res = await resetPassword.mutateAsync({ id: user.id });
      setTempPasswordModal({
        isOpen: true,
        name: user.name,
        email: user.email,
        password: res.temporaryPassword,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const usersList = usersData?.data ?? [];
  const totalPages = usersData?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">User Management</h1>
          <p className="mt-1 text-sm text-muted">
            Manage administrative staff and clinical portal accounts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddUserOpen(true)}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 cursor-pointer"
        >
          + Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email..."
          className="block h-9 flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:outline-none"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,24,22,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-canvas/60 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Sign-In</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {usersPending ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    Loading users...
                  </td>
                </tr>
              ) : usersList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    No users found matching criteria.
                  </td>
                </tr>
              ) : (
                usersList.map((user) => {
                  const isSelf = me?.id === user.id;
                  const isLocked = user.lockedUntil && new Date(user.lockedUntil) > new Date();

                  return (
                    <tr key={user.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-ink">
                          {user.name} {isSelf && <span className="text-xs text-muted font-normal">(You)</span>}
                        </div>
                        <div className="text-xs text-muted">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20'
                              : 'bg-zinc-50 text-zinc-700 ring-1 ring-inset ring-zinc-600/20'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isLocked ? (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
                            Locked
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                              user.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                                : 'bg-zinc-50 text-zinc-600 ring-zinc-500/20'
                            }`}
                          >
                            {user.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-muted">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-xs">
                          {isLocked && (
                            <button
                              type="button"
                              onClick={() => unlockUser.mutate({ id: user.id })}
                              className="text-amber-700 hover:underline"
                            >
                              Unlock
                            </button>
                          )}
                          {!isSelf && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleResetPassword(user)}
                                className="text-brand-600 hover:underline"
                              >
                                Reset Password
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Revoke all sessions for ${user.name}?`)) {
                                    revokeSessions.mutate({ id: user.id });
                                  }
                                }}
                                className="text-rose-600 hover:underline"
                              >
                                Revoke Sessions
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-line px-6 py-3 text-xs text-muted">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="rounded px-2.5 py-1 border border-line hover:bg-canvas disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="rounded px-2.5 py-1 border border-line hover:bg-canvas disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-ink">Add User</h3>
            <p className="text-xs text-muted">A temporary password will be generated automatically.</p>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Full Name</label>
                <input
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="user@hospital.org"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1">Role</label>
                <select
                  name="role"
                  defaultValue="staff"
                  className="w-full h-9 rounded-lg border border-line px-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="staff">Staff (Standard)</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="rounded-lg border border-line px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createUser.isPending}
                  className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  {createUser.isPending ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Temporary Password Modal */}
      {tempPasswordModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-2xl">
            <div className="size-10 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center mb-3">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-ink">Temporary Password Generated</h3>
            <p className="text-xs text-muted mt-1">
              Share this password with <span className="font-medium text-ink">{tempPasswordModal.name}</span> ({tempPasswordModal.email}). This is the only time it will be shown.
            </p>

            <div className="mt-4 rounded-xl border border-line bg-canvas p-3 font-mono text-sm text-ink flex items-center justify-between">
              <span>{tempPasswordModal.password}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(tempPasswordModal.password);
                  alert('Password copied to clipboard!');
                }}
                className="text-xs font-sans text-brand-600 font-semibold hover:underline"
              >
                Copy
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setTempPasswordModal({ isOpen: false, name: '', email: '', password: '' })}
                className="rounded-lg bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

