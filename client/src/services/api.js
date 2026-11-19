const productionApiUrl = import.meta.env.PROD
  ? 'https://zayan-portfolio-mern.onrender.com'
  : '';
const apiBaseUrl = (import.meta.env.VITE_API_URL || productionApiUrl).replace(/\/$/, '');

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
