export const SITE_URL = 'https://kata-note.vercel.app';
export const DEFAULT_DESCRIPTION = 'KataNote adalah aplikasi catatan ringan untuk menulis, mencari, mengarsipkan, dan mengelola ide harian dengan UI yang rapi dan responsif.';

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector);
  if (element && value) {
    element.setAttribute(attribute, value);
  }
};

export const toAbsoluteUrl = (path = '/') => {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const updateSeo = ({
  title = 'KataNote - Aplikasi Catatan Ringan',
  description = DEFAULT_DESCRIPTION,
  path = '/',
  robots = 'index,follow',
} = {}) => {
  const canonical = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl('/images/katanote-og.png');

  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[name="robots"]', 'content', robots);
  setMeta('link[rel="canonical"]', 'href', canonical);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonical);
  setMeta('meta[property="og:image"]', 'content', imageUrl);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', imageUrl);
};
