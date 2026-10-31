const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function token() { return localStorage.getItem('hosteldesk_token') }

async function api(path, options = {}) {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...options.headers,
    },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.detail || 'Something went wrong. Please try again.')
  return data
}

export const authApi = {
  signUp: (body) => api('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  signIn: (body) => api('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => api('/auth/me'),
}

export const complaintApi = {
  create: (body) => api('/complaints', { method: 'POST', body: JSON.stringify(body) }),
  checkSimilar: (body) => api('/check-similar', { method: 'POST', body: JSON.stringify(body) }),
  list: (mine = false) => api(mine ? '/complaints?mode=mine' : '/complaints'),
  listPublic: () => api('/public'),
  toggleUpvote: (id) => api(`/complaints/${id}/upvote`, { method: 'POST' }),
  updateStatus: (id, status) => api(`/complaints/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
}

export const announcementApi = {
  list: () => api('/announcements'),
  create: (body) => api('/announcements', { method: 'POST', body: JSON.stringify(body) }),
}
