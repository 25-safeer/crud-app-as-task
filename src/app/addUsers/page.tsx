
"use client";

import { useRouter } from "next/navigation";
import UserForm from "../component/userForm";
import { addUser, type User } from "../library/users";

export default function AddUserPage() {
  const router = useRouter();

  function handleCreate(data: Omit<User, "id">) {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...data,
    };
    addUser(newUser);
    router.push("/users");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add New User
          </h1>

          <p className="mt-2 text-gray-600">
            Fill in the details below to create a new user.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <UserForm onSubmit={handleCreate} />
        </div>

        <button
          type="button"
          onClick={() => router.push("/users")}
          className="mt-5 text-sm font-medium text-blue-600 hover:text-blue-800">
          View all users
        </button>
      </div>
    </main>
  );
}