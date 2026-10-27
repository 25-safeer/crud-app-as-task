
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import UserForm from "../../component/userForm";
import {
  getUsers,
  updateUser,
  type User,
} from "../../library/users";

export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const id = params.id;

  useEffect(() => {
    const users = getUsers();
    const foundUser = users.find((item) => item.id === id);

    setUser(foundUser ?? null);
    setIsLoaded(true);
  }, [id]);

  function handleUpdate(data: Omit<User, "id">) {
    if (!user) return;

    updateUser({
      id: user.id,
      ...data,
    });

    router.push("/users");
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gray-50 p-10">
        Loading user...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            User Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            No user matches this ID. Return to the users list and
            select Edit beside an existing user.
          </p>

          <Link
            href="/users"
            className="mt-6 inline-block font-medium text-blue-600"
          >
            Back to Users
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Edit User
        </h1>

        <p className="mb-8 text-gray-600">
          Update the details for {user.name}.
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <UserForm
            key={user.id}
            initialData={user}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"/>
        </div>

        <Link
          href="/users"
          className="mt-5 inline-block text-sm font-medium text-blue-600">
          Cancel and return to Users
        </Link>
      </div>
    </main>
  );
}
