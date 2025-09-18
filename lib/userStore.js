// lib/userStore.js

let users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin",
    permissions: ["companies", "employees", "reports"],
  },
];

// ---- Existing exports ----
export function listUsers() {
  return users;
}

export function createUser(username, password, role, permissions = []) {
  const newUser = {
    id: users.length + 1,
    username,
    password,
    role,
    permissions,
  };
  users.push(newUser);
  return newUser;
}

export function findUser(username, password) {
  return users.find(
    (u) => u.username === username && u.password === password
  );
}

// ---- ✅ Add these functions ----
export function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index === -1) return null;

  users[index] = { ...users[index], ...data };
  return users[index];
}

export function deleteUser(id) {
  const index = users.findIndex((u) => u.id === parseInt(id));
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}
