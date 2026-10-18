const KEY = 'abc_admin_token';
export const getToken = () => sessionStorage.getItem(KEY);
export const setToken = (t) => sessionStorage.setItem(KEY, t);
export const clearToken = () => sessionStorage.removeItem(KEY);

export async function api(path, opts = {}) {
  const res = await fetch('/api' + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: 'Bearer ' + getToken() } : {}),
      ...(opts.headers || {}),
    },
  });
  if (res.status === 401 && getToken()) {
    clearToken();
    window.location.href = '/login?expired=1';
    throw new Error('Session expired');
  }
  const text = await res.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    /* ignore */
  }
  if (!res.ok) throw new Error(data.message || 'Error ' + res.status);
  return data;
}

export const submitForm = (type, body) =>
  api('/forms/' + type, { method: 'POST', body: JSON.stringify(body) });