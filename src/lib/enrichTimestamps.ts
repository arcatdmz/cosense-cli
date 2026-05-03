import { formatTimestamp } from './formatTimestamp.ts';

const DEFAULT_FIELDS = [
  'created',
  'updated',
  'accessed',
  'lastAccessed'
] as const;

export const enrichTimestampsOf = (
  obj: Record<string, unknown> | null | undefined,
  fields: readonly string[] = DEFAULT_FIELDS
): void => {
  if (!obj) return;
  for (const field of fields) {
    const formatted = formatTimestamp(obj[field]);
    if (formatted !== undefined) {
      obj[field] = formatted;
    }
  }
};
