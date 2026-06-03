const USER_KEY = 'katanote_user';
const SESSION_KEY = 'katanote_session';

export const getRegisteredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch (error) {
    return null;
  }
};

const hashPassword = (value) => {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) + hash) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(16);
};

export const registerUser = ({ email, password }) => {
  const user = {
    email,
    passwordDigest: hashPassword(password),
    name: email.split('@')[0],
    registeredAt: new Date().toISOString(),
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const loginUser = (identifier, password) => {
  const user = getRegisteredUser();
  const matchesIdentifier = user && (user.email === identifier || user.name === identifier);
  const matchesPassword = user && user.passwordDigest === hashPassword(password);

  if (!matchesIdentifier || !matchesPassword) {
    return null;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify({
    email: user.email,
    name: user.name,
    loginAt: new Date().toISOString(),
  }));
  window.dispatchEvent(new CustomEvent('auth-changed'));
  return user;
};

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getSession());

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent('auth-changed'));
};
