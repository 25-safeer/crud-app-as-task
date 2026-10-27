
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteUser, getUsers, type User } from "../library/users";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUsers(getUsers());
    setIsLoaded(true);
  }, []);

  function handleDelete(user: User) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) return;

    deleteUser(user.id);
    setUsers((currentUsers) =>
      currentUsers.filter((item) => item.id !== user.id)
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Users
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your saved user records.
            </p>
          </div>

          <Link
            href="/addUsers"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add User
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Phone</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {!isLoaded ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-gray-500">
                    No users found. Add your first user to get started.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {user.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {user.phone}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/editUsers/${user.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800">
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          className="font-medium text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          {isLoaded
            ? `${users.length} ${users.length === 1 ? "user" : "users"} found`
            : "Loading user count..."}
        </p>
      </div>
    </main>
  );
}