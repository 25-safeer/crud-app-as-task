
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

const STORAGE_KEY = "crud-interview-users";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getUsers(): User[] {
  if (!isBrowser()) return [];

  try {
    const storedUsers = localStorage.getItem(STORAGE_KEY);

    if (!storedUsers) return [];

    const parsed: unknown = JSON.parse(storedUsers);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (user): user is User =>
        typeof user.id === "string" &&
        typeof user.name === "string" &&
        typeof user.email === "string" &&
        typeof user.phone === "string"
    );
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Unable to save users:", error);
  }
}

export function addUser(user: User): void {
  const users = getUsers();
  saveUsers([...users, user]);
}

export function updateUser(updatedUser: User): void {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  saveUsers(updatedUsers);
}

export function deleteUser(id: string): void {
  const users = getUsers();

  const updatedUsers = users.filter((user) => user.id !== id);

  saveUsers(updatedUsers);
}
