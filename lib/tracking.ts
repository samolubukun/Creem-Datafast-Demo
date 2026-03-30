export function getDataFastTracking(): {
  visitorId: string | null;
  sessionId: string | null;
} {
  if (typeof document === 'undefined') {
    return { visitorId: null, sessionId: null };
  }

  const cookies = document.cookie.split(';');
  let visitorId: string | null = null;
  let sessionId: string | null = null;

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split('=');
    if (name === 'datafast_visitor_id') {
      visitorId = valueParts.join('=') || null;
    }
    if (name === 'datafast_session_id') {
      sessionId = valueParts.join('=') || null;
    }
  }

  return { visitorId, sessionId };
}

export function appendDataFastTracking(
  url: string,
  tracking?: { visitorId: string | null; sessionId: string | null }
): string {
  const { visitorId, sessionId } = tracking ?? getDataFastTracking();
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');

  if (visitorId) {
    urlObj.searchParams.set('datafast_visitor_id', visitorId);
  }
  if (sessionId) {
    urlObj.searchParams.set('datafast_session_id', sessionId);
  }

  if (url.startsWith('/')) {
    return urlObj.pathname + (urlObj.search ? urlObj.search : '');
  }
  return urlObj.toString();
}