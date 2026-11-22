const productionApiUrl = import.meta.env.PROD
  ? 'https://zayan-portfolio-0e4g.onrender.com'
  : '';
export const apiBaseUrl = (import.meta.env.VITE_API_URL || productionApiUrl).replace(/\/$/, '');

export async function wakeBackend() {
  if (!apiBaseUrl) return;

  try {
    await fetch(`${apiBaseUrl}/api/health`, {
      method: 'GET',
      cache: 'no-store',
    });
  } catch {
    // The contact request will still retry the API after the frontend loads.
  }
}

export async function submitContactForm(formData) {
  const response = await fetch(`${apiBaseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Your message could not be sent right now. Please try again.');
  }

  return payload;
}
