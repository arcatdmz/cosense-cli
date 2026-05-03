const NOW_MS = Date.now();
const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
const cache = new Map<number, string>();

const pad = (n: number): string => String(n).padStart(2, '0');

const formatAbsolute = (date: Date): string => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const offsetMin = -date.getTimezoneOffset();
  const sign = offsetMin >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  const oh = pad(Math.floor(abs / 60));
  const om = pad(abs % 60);
  return `${year}-${month}-${day}T${hour}:${minute}${sign}${oh}:${om}`;
};

const formatRelative = (deltaSec: number): string => {
  const abs = Math.abs(deltaSec);
  if (abs < 60) return rtf.format(Math.round(deltaSec), 'second');
  if (abs < 3600) return rtf.format(Math.round(deltaSec / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(deltaSec / 3600), 'hour');
  if (abs < 86400 * 7) return rtf.format(Math.round(deltaSec / 86400), 'day');
  if (abs < 86400 * 30)
    return rtf.format(Math.round(deltaSec / (86400 * 7)), 'week');
  if (abs < 86400 * 365)
    return rtf.format(Math.round(deltaSec / (86400 * 30)), 'month');
  return rtf.format(Math.round(deltaSec / (86400 * 365)), 'year');
};

export const formatTimestamp = (unixtimeSec: unknown): string | undefined => {
  if (
    typeof unixtimeSec !== 'number' ||
    !Number.isFinite(unixtimeSec) ||
    unixtimeSec === 0
  ) {
    return undefined;
  }
  const cached = cache.get(unixtimeSec);
  if (cached) return cached;

  const ms = unixtimeSec * 1000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return undefined;

  const absolute = formatAbsolute(date);
  const deltaSec = Math.floor((ms - NOW_MS) / 1000);
  const relative = formatRelative(deltaSec);
  const result = `${absolute} (${relative})`;
  cache.set(unixtimeSec, result);
  return result;
};
