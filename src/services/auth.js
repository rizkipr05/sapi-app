import { getJSON, remove, setJSON } from './storage';

const K_USERS = 'app_users_v1';
const K_SESSION = 'app_session_v1';

function delay(ms = 300) {
  return new Promise(r => setTimeout(r, ms));
}

async function getUsers() {
  return (await getJSON(K_USERS, [])) ?? [];
}
async function saveUsers(users) {
  await setJSON(K_USERS, users);
}
async function getSession() {
  return await getJSON(K_SESSION, null);
}

/* ==========================================================
   REGISTER
========================================================== */
export async function register({ username, password, email = '', phone = '' }) {
  await delay();
  const users = await getUsers();

  const exists = users.find(
    u => u.username.toLowerCase() === username.toLowerCase()
  );
  if (exists) {
    const err = new Error('Username sudah digunakan');
    err.code = 'USERNAME_EXISTS';
    throw err;
  }

  if (!username || username.length < 3) {
    const err = new Error('Username minimal 3 karakter');
    err.code = 'USERNAME_SHORT';
    throw err;
  }

  if (!password || password.length < 4) {
    const err = new Error('Sandi minimal 4 karakter');
    err.code = 'PASSWORD_SHORT';
    throw err;
  }

  const user = {
    id: Date.now().toString(36),
    username,
    password, // ⚠️ demo lokal: plaintext
    email,
    phone,
    avatar: null,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await saveUsers(users);

  const token = `token-${user.id}-${Date.now()}`;
  await setJSON(K_SESSION, { userId: user.id, token });

  return { token, user: publicUser(user) };
}

/* ==========================================================
   LOGIN
========================================================== */
export async function login({ username, password }) {
  await delay();
  const users = await getUsers();
  const found = users.find(
    u => u.username.toLowerCase() === username.toLowerCase()
  );

  if (!found || found.password !== password) {
    const err = new Error('Username atau sandi salah');
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }

  const token = `token-${found.id}-${Date.now()}`;
  await setJSON(K_SESSION, { userId: found.id, token });

  return { token, user: publicUser(found) };
}

/* ==========================================================
   LOGOUT
========================================================== */
export async function logout() {
  await delay(100);
  await remove(K_SESSION);
}

/* ==========================================================
   GET CURRENT USER
========================================================== */
export async function getCurrentUser() {
  const s = await getSession();
  if (!s) return null;

  const users = await getUsers();
  const u = users.find(x => x.id === s.userId);

  return u ? publicUser(u) : null;
}

/* ==========================================================
   UPDATE PROFILE
========================================================== */
export async function updateProfile({ username, email, phone, avatar = null }) {
  await delay();
  const s = await getSession();
  if (!s) throw new Error('Tidak ada sesi');

  const users = await getUsers();
  const idx = users.findIndex(u => u.id === s.userId);
  if (idx < 0) throw new Error('User tidak ditemukan');

  const current = users[idx];

  // cek username baru tidak tabrakan
  if (username && username.trim()) {
    const exists = users.find(
      u =>
        u.username.toLowerCase() === username.trim().toLowerCase() &&
        u.id !== current.id
    );
    if (exists) throw new Error('Username sudah digunakan');

    current.username = username.trim();
  }

  if (typeof email === 'string') current.email = email.trim();
  if (typeof phone === 'string') current.phone = phone.trim();
  if (avatar !== undefined) current.avatar = avatar;

  await saveUsers(users);

  return publicUser(current);
}

/* ==========================================================
   CHANGE PASSWORD
========================================================== */
export async function changePassword({ oldPassword, newPassword }) {
  await delay();

  if (!newPassword || newPassword.length < 4) {
    const err = new Error('Sandi baru minimal 4 karakter');
    err.code = 'PASSWORD_SHORT';
    throw err;
  }

  const s = await getSession();
  if (!s) throw new Error('Tidak ada sesi');

  const users = await getUsers();
  const idx = users.findIndex(u => u.id === s.userId);
  if (idx < 0) throw new Error('User tidak ditemukan');

  if (users[idx].password !== oldPassword) {
    const err = new Error('Sandi lama salah');
    err.code = 'WRONG_OLD_PASSWORD';
    throw err;
  }

  users[idx].password = newPassword;
  await saveUsers(users);

  return true;
}

/* ==========================================================
   HELPER: public user (tanpa password)
========================================================== */
function publicUser(u) {
  return {
    id: u.id,
    username: u.username,
    email: u.email || '',
    phone: u.phone || '',
    avatar: u.avatar || null,
  };
}
